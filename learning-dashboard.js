/* V Lex Pro — local organizer and a compact dashboard. No seeded user data. */
(function (root) {
  'use strict';
  const sections = ['tasks', 'events', 'notes', 'projects'];
  const statusNames = { todo: 'أبدأها', doing: 'أعمل عليها', done: 'مكتملة' };
  const pad = value => String(value).padStart(2, '0');
  function dateKey(date) { return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()); }
  function validDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [y, m, d] = value.split('-').map(Number);
    if (y < 1900 || y > 2200) return false;
    const parsed = new Date(y, m - 1, d);
    return parsed.getFullYear() === y && parsed.getMonth() === m - 1 && parsed.getDate() === d;
  }
  function calendarDays(year, month) {
    const first = new Date(year, month, 1), offset = first.getDay();
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(year, month, 1 - offset + index);
      return { key: dateKey(date), number: date.getDate(), currentMonth: date.getMonth() === month };
    });
  }
  function courseMetrics(course, lessonIds, now = Date.now()) {
    const known = new Set(lessonIds);
    const completed = new Set((Array.isArray(course.completed) ? course.completed : []).filter(id => known.has(id)));
    const due = Object.entries(course.reviews || {}).filter(([id, value]) => known.has(id) && value && typeof value.due === 'string' && Number.isFinite(Date.parse(value.due)) && Date.parse(value.due) <= now).length;
    return { completed: completed.size, due };
  }
  function uuid() {
    if (root.crypto && root.crypto.randomUUID) return root.crypto.randomUUID();
    return 'local-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  }
  function copy(value) { return JSON.parse(JSON.stringify(value)); }
  function sorted(records) { return [...records].sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''))); }
  function validate(section, record) {
    if (!record || typeof record !== 'object' || Array.isArray(record)) return 'السجل غير صالح.';
    if (typeof record.title !== 'string' || !record.title.trim() || record.title.length > 180) return 'اكتب عنوانًا من حرف إلى 180 حرفًا.';
    if (section === 'tasks') {
      if (!Object.hasOwn(statusNames, record.status)) return 'اختر حالة المهمة.';
      if (record.due && !validDate(record.due)) return 'اختر تاريخ مهمة صالحًا بين 1900 و2200.';
    }
    if (section === 'events') {
      if (!validDate(record.date)) return 'اختر تاريخ موعد صالحًا بين 1900 و2200.';
      if (record.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(record.time)) return 'اختر وقتًا صالحًا.';
    }
    for (const key of ['body', 'description', 'notes']) if (record[key] && (typeof record[key] !== 'string' || record[key].length > 12000)) return 'النص طويل جدًا؛ الحد 12000 حرف.';
    return '';
  }
  function useOrganizer() {
    const { ref, computed, onMounted, onUnmounted } = root.Vue;
    const data = ref({ tasks: [], events: [], notes: [], projects: [], course: {} });
    const message = ref(''), storageWarning = ref('');
    const now = ref(new Date());
    const store = root.VLexLearningStore;
    let timer, unsubscribe;
    function refresh() {
      if (!store || typeof store.getSection !== 'function') {
        storageWarning.value = 'الحفظ الدائم غير متاح هنا؛ هذه الجلسة فقط. لا تغلق الصفحة قبل تصدير بياناتك.';
        return;
      }
      const next = {};
      try {
        for (const name of sections) {
          const value = store.getSection(name, []);
          next[name] = Array.isArray(value) ? copy(value) : [];
        }
        next.course = copy(store.getSection('course', {}) || {});
        next.guided = copy(store.getSection('guided', {}) || {});
        data.value = next;
        const status = typeof store.status === 'function' ? store.status() : null;
        if (status && (status === 'protected' || status === 'memory' || status.protected || status.persistent === false || status.writable === false)) storageWarning.value = 'توجد مشكلة في الحفظ الدائم. التغييرات قد تبقى في الجلسة فقط؛ راجع تنبيه البيانات وصدّر نسختك.';
      } catch (_) { storageWarning.value = 'تعذرت قراءة البيانات. لم نغيّر أي سجل محفوظ.'; }
    }
    function persist(section, records) {
      const next = copy(records);
      if (!store || typeof store.setSection !== 'function') {
        data.value = { ...data.value, [section]: next };
        storageWarning.value = 'الحفظ مؤقت لهذه الجلسة فقط؛ أداة التخزين غير متاحة.';
        return false;
      }
      try {
        const result = store.setSection(section, next);
        // Keep current changes visible even if durable writing failed. The store
        // owns original protection and exposes the full in-memory export.
        if (result !== false) { refresh(); storageWarning.value = ''; return true; }
        refresh();
        storageWarning.value = 'تعذر الحفظ الدائم. لا تفترض بقاء التغيير بعد الإغلاق؛ صدّر بيانات الجلسة.';
        return false;
      } catch (_) { storageWarning.value = 'تعذر حفظ التغيير؛ لم نعلن حفظه بنجاح.'; return false; }
    }
    function save(section, draft) {
      const problem = validate(section, draft);
      if (problem) { message.value = problem; return false; }
      const old = data.value[section].find(row => row.id === draft.id);
      const stamp = new Date().toISOString();
      const record = { ...copy(draft), id: old ? old.id : uuid(), title: draft.title.trim(), archived: old ? !!old.archived : false, createdAt: old ? old.createdAt : stamp, updatedAt: stamp };
      const next = old ? data.value[section].map(row => row.id === record.id ? record : row) : [...data.value[section], record];
      const success = persist(section, next);
      message.value = success ? 'تم الحفظ على هذا الجهاز.' : 'راجع حالة الحفظ قبل إغلاق الصفحة.';
      return success;
    }
    function patch(section, id, update) {
      const row = data.value[section].find(item => item.id === id);
      if (!row) return;
      return save(section, { ...row, ...update });
    }
    function archive(section, record) {
      const next = data.value[section].map(row => row.id === record.id ? { ...row, archived: !row.archived, updatedAt: new Date().toISOString() } : row);
      const success = persist(section, next);
      message.value = success ? (record.archived ? 'أُعيد السجل من الأرشيف.' : 'نُقل إلى الأرشيف ويمكن إعادته، لم يُحذف.') : 'راجع حالة الحفظ؛ لم نعلن حفظ الأرشفة.';
    }
    const today = computed(() => dateKey(now.value));
    const activeTasks = computed(() => data.value.tasks.filter(task => !task.archived));
    const todayTasks = computed(() => activeTasks.value.filter(task => !task.due || task.due <= today.value).sort((a, b) => (a.status === 'done') - (b.status === 'done') || String(a.due).localeCompare(String(b.due))));
    const upcoming = computed(() => data.value.events.filter(event => !event.archived && event.date >= today.value).sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || ''))));
    const learningCounts = computed(() => courseMetrics(data.value.course, (root.VLexCourse?.lessons || []).map(lesson => lesson.id), now.value.getTime()));
    const completedLessons = computed(() => learningCounts.value.completed);
    const dueReviews = computed(() => learningCounts.value.due);
    onMounted(() => { refresh(); if (store && typeof store.subscribe === 'function') unsubscribe = store.subscribe(refresh); timer = setInterval(() => { now.value = new Date(); }, 1000); });
    onUnmounted(() => { clearInterval(timer); if (typeof unsubscribe === 'function') unsubscribe(); });
    return { data, message, storageWarning, now, today, activeTasks, todayTasks, upcoming, completedLessons, dueReviews, refresh, save, patch, archive };
  }
  const dashboard = {
    emits: ['navigate', 'learn', 'guided'],
    setup(_, { emit }) {
      const { ref, computed } = root.Vue;
      const state = useOrganizer(), taskTitle = ref('');
      const clock = computed(() => state.now.value.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      const dateLabel = computed(() => state.now.value.toLocaleDateString('ar-SA-u-ca-gregory', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
      function addTask() {
        if (state.save('tasks', { title: taskTitle.value, due: state.today.value, status: 'todo', projectId: '' })) taskTitle.value = '';
      }
      // Read-only presentation metrics; existing persistence and organizer behavior are unchanged.
      const lessons = root.VLexCourse?.lessons || [];
      const lessonCount = lessons.length;
      const guidedUnits = root.VLexGuidedLessons?.units || root.VLexGuidedLessons?.lessons || [];
      const guidedLessonTotal = guidedUnits.filter(l => l.kind !== 'project').length;
      const guidedProjectTotal = guidedUnits.filter(l => l.kind === 'project').length;
      const assessed = computed(() => guidedUnits.filter(l => { const local = state.data.value.guided?.lessons?.[l.id]; return local && root.VLexGuided?.ready(l, local); }));
      const assessedLessons = computed(() => assessed.value.filter(l => l.kind !== 'project').length);
      const assessedProjects = computed(() => assessed.value.filter(l => l.kind === 'project').length);

      const learningTracks = computed(() => {
        const completed = new Set(state.data.value.course.completed || []);
        return [{ id: 'html', label: 'HTML', description: 'هيكل الصفحة' }, { id: 'css', label: 'CSS', description: 'الشكل والتنسيق' },
          { id: 'js', label: 'JavaScript', description: 'المنطق والتفاعل' }, { id: 'vue', label: 'Vue', description: 'واجهات تفاعلية' }].map(track => {
            const items = lessons.filter(lesson => lesson.topic === track.id);
            const count = items.filter(lesson => completed.has(lesson.id)).length;
            return { ...track, total: items.length, completed: count, percent: items.length ? Math.round(count / items.length * 100) : 0 };
          });
      });
      const lessonPercent = computed(() => lessonCount ? Math.round(state.completedLessons.value / lessonCount * 100) : 0);
      return { ...state, guidedLessonTotal, guidedProjectTotal, assessedLessons, assessedProjects, taskTitle, clock, dateLabel, addTask, statusNames, emit, lessonCount, learningTracks, lessonPercent };
    },
    template: `<section class="vlp-organizer vlp-daily-dashboard" aria-label="خطتك اليومية الحقيقية" data-testid="learning-daily-dashboard">
      <div class="vlp-day-heading"><div><span class="vlp-section-kicker">لمحة عن يومك</span><h2>خطتك اليوم</h2><p>{{ dateLabel }}</p></div><div class="vlp-clock-block"><span class="vlp-clock-label"><i aria-hidden="true"></i>وقتك المحلي</span><time class="vlp-local-clock" dir="ltr" aria-label="الوقت المحلي">{{ clock }}</time></div></div>
      <p v-if="storageWarning" role="alert" class="vlp-storage-warning">{{ storageWarning }}</p>
      <section v-if="guidedLessonTotal" class="vlp-record-card vlp-guided-summary" data-testid="guided-summary"><strong>نتائج تعلّمك الموجّه</strong><p>دروس اجتازت الفحوص والأسئلة: {{assessedLessons}} / {{guidedLessonTotal}} · مشاريع اجتازت الفحوص والأسئلة: {{assessedProjects}} / {{guidedProjectTotal}}</p><div class="vlp-action-row"><button type="button" @click="emit('guided')">استكمل دروس الإتقان</button><button type="button" @click="emit('navigate','projects')">المشاريع العملية</button></div><small>تُحتسب نتائج الكود الحالي والأسئلة؛ تبقى مراجعات المسار السابق وإحصاءاته منفصلة أدناه.</small></section>
      <div class="vlp-mini-stats" aria-label="إحصاءات فعلية من بياناتك">
        <article><span class="vlp-stat-icon"><svg><use href="#i-book"/></svg></span><span class="vlp-stat-label">رحلتك في التعلّم</span><strong>{{ completedLessons }}<em> / {{ lessonCount }}</em></strong><small>دروس راجعتها</small><span class="vlp-stat-line"><i :style="{width:lessonPercent+'%'}"></i></span></article>
        <article><span class="vlp-stat-icon"><svg><use href="#i-note"/></svg></span><span class="vlp-stat-label">خطوات أنجزتها</span><strong>{{ activeTasks.filter(t=>t.status==='done').length }}</strong><small>مهام مكتملة من {{ activeTasks.length }}</small><span class="vlp-stat-caption">من قائمة مهامك</span></article>
        <article><span class="vlp-stat-icon"><svg><use href="#i-calendar"/></svg></span><span class="vlp-stat-label">وقت تثبيت الفكرة</span><strong>{{ dueReviews }}</strong><small>مراجعات حان وقتها</small><button class="vlp-stat-action" type="button" @click="emit('learn',{})">افتح دروسك <span aria-hidden="true">←</span></button></article>
        <article><span class="vlp-stat-icon"><svg><use href="#i-folder"/></svg></span><span class="vlp-stat-label">أفكار قيد البناء</span><strong>{{ data.projects.filter(project=>!project.archived).length }}</strong><small>مشاريعك النشطة</small><button class="vlp-stat-action" type="button" @click="emit('navigate','projects')">افتح المشاريع <span aria-hidden="true">←</span></button></article>
      </div>
      <div class="vlp-overview-grid">
        <section class="vlp-overview-panel"><div class="vlp-panel-heading"><div><h3>خطواتك في المسارات</h3><p>كل مفهوم تفهمه، يكمّل الصورة.</p></div><span class="vlp-chart-legend"><i aria-hidden="true"></i>دروس راجعتها</span></div><div class="vlp-progress-bars" aria-label="الدروس التي راجعتها حسب المسار">
          <div class="vlp-progress-column" v-for="track in learningTracks" :key="track.id" :data-track="track.id"><span class="vlp-bar-value" dir="ltr">{{ track.completed }}<small> / {{ track.total }}</small></span><div class="vlp-bar-track" role="img" :aria-label="track.label + ': ' + track.completed + ' من ' + track.total + ' دروس راجعتها'"><span :style="{height:track.percent+'%'}"></span></div><strong dir="ltr">{{ track.label }}</strong><small>{{ track.description }}</small></div>
        </div><div class="vlp-chart-note"><span>تقدّم من بياناتك المحلية</span><span>بحسب الدروس التي علّمتها كمفهومة</span></div></section>
        <section class="vlp-overview-panel vlp-course-summary"><div class="vlp-panel-heading"><div><h3>على مهل، تتقدّم</h3><p>تعلّم يناسب وقتك</p></div><svg><use href="#i-star"/></svg></div><div class="vlp-course-ring" :style="{'--review-progress':lessonPercent+'%'}" role="img" :aria-label="lessonPercent + '% من الدروس راجعتها'"><div><strong>{{ lessonPercent }}<small>%</small></strong><span>من رحلتك الحالية</span></div></div><p><strong>{{ completedLessons }}</strong> من {{ lessonCount }} درسًا راجعتها</p><small>تقييمك لفهمك، وليس درجة اختبار.</small><button class="vlp-continue-button" type="button" @click="emit('learn',{})">خطوتك الجاية <span aria-hidden="true">←</span></button></section>
      </div>
      <div class="vlp-dashboard-columns">
        <section class="vlp-today-panel"><div class="vlp-panel-heading"><div><h3>مساحة للإنجاز</h3><p>مهام اليوم وما تأخر</p></div><button type="button" class="vlp-link-button" @click="emit('navigate','kanban')">كل المهام ←</button></div>
          <form @submit.prevent="addTask" class="vlp-inline-form"><label class="vlp-field">مهمة صغيرة لليوم<input data-testid="dashboard-task-title" v-model="taskTitle" maxlength="180" required placeholder="وش الخطوة اللي بتبدأ فيها؟"></label><button type="submit" data-testid="dashboard-task-add"><span aria-hidden="true">＋</span> أضف المهمة</button></form>
          <ul class="vlp-record-list"><li v-for="task in todayTasks.slice(0,5)" :key="task.id"><label class="vlp-task-toggle"><input type="checkbox" :checked="task.status==='done'" @change="patch('tasks',task.id,{status:$event.target.checked?'done':'todo'})"><span :class="{'vlp-is-done':task.status==='done'}">{{ task.title }}</span></label><small v-if="task.due">{{ task.due }}</small></li></ul><p v-if="!todayTasks.length" class="vlp-empty">ما عندك مهام لليوم. أضف خطوة بسيطة تبدأ فيها.</p>
        </section>
        <section class="vlp-agenda-panel"><div class="vlp-panel-heading"><div><h3>في تقويمك</h3><p>المواعيد القادمة</p></div><button type="button" class="vlp-link-button" @click="emit('navigate','calendar')">التقويم ←</button></div><ul class="vlp-record-list"><li v-for="event in upcoming.slice(0,3)" :key="event.id"><span class="vlp-event-marker" aria-hidden="true"></span><div><strong>{{ event.title }}</strong><time>{{ event.date }} <span>{{ event.time }}</span></time></div></li></ul><p v-if="!upcoming.length" class="vlp-empty">لا توجد مواعيد محفوظة. أضف وقت مراجعتك من التقويم.</p><div class="vlp-action-row"><button type="button" @click="emit('navigate','calendar')">افتح التقويم <span aria-hidden="true">←</span></button><button type="button" @click="emit('learn',{})">درس ومراجعة</button></div></section>
      </div>
      <p v-if="message" role="status" class="vlp-save-message">{{ message }}</p><p class="vlp-local-note"><svg><use href="#i-note"/></svg> بياناتك على هذا المتصفح. احتفظ بنسخة من إعدادات البيانات.</p>
    </section>`
  };
  const organizer = {
    props: { mode: { type: String, default: 'tasks' } },
    emits: ['learn'],
    setup(props, { emit }) {
      const { ref, computed, watch } = root.Vue;
      const scratch=root.VLexLearningStore?.getSection('organizerDrafts',{})||{};
      const state = useOrganizer(), showArchived = ref(false), editingTask = ref(scratch.tasks?.editingId||''), editingNote = ref(scratch.notes?.editingId||''), editingEvent = ref(scratch.events?.editingId||''), editingProject = ref(scratch.projects?.editingId||'');
      const task = ref(scratch.tasks?.record||{ title: '', due: '', status: 'todo', projectId: '' });
      const note = ref(scratch.notes?.record||{ title: '', body: '' }), project = ref(scratch.projects?.record||{ title: '', description: '' });
      const selectedDate = ref(validDate(scratch.events?.record?.date)?scratch.events.record.date:dateKey(new Date()));
      const [selectedYear,selectedMonth]=selectedDate.value.split('-').map(Number);
      const monthYear = ref({ year: selectedYear, month: selectedMonth-1 });
      const event = ref(scratch.events?.record||{ title: '', date: selectedDate.value, time: '', notes: '' });
      watch([task,note,project,event,editingTask,editingNote,editingProject,editingEvent],()=>{const ok=root.VLexLearningStore?.setSection('organizerDrafts',{tasks:{record:task.value,editingId:editingTask.value},notes:{record:note.value,editingId:editingNote.value},projects:{record:project.value,editingId:editingProject.value},events:{record:event.value,editingId:editingEvent.value}});if(!ok)state.storageWarning.value='تعذر حفظ مسودة النموذج؛ صدّر بيانات التعلم قبل الإغلاق.'},{deep:true,flush:'sync'});
      const selectedProject = ref('');
      const labels = { tasks: 'مهامك اليومية', kanban: 'لوحة المهام', calendar: 'تقويم التعلم', notes: 'ملاحظاتك', projects: 'مشاريعك الشخصية' };
      const activeMode = computed(() => Object.hasOwn(labels, props.mode) ? props.mode : 'tasks');
      const title = computed(() => labels[activeMode.value]);
      const visible = name => sorted(state.data.value[name].filter(row => showArchived.value ? row.archived : !row.archived));
      const tasks = computed(() => visible('tasks').filter(row => !selectedProject.value || row.projectId === selectedProject.value));
      const projects = computed(() => visible('projects')), notes = computed(() => visible('notes'));
      const days = computed(() => calendarDays(monthYear.value.year, monthYear.value.month));
      const monthLabel = computed(() => new Date(monthYear.value.year, monthYear.value.month, 1).toLocaleDateString('ar-SA-u-ca-gregory', { month: 'long', year: 'numeric' }));
      const selectedEvents = computed(() => visible('events').filter(row => row.date === selectedDate.value).sort((a, b) => (a.time || '').localeCompare(b.time || '')));
      const activeProjects = computed(() => state.data.value.projects.filter(row => !row.archived));
      const countEvents = date => state.data.value.events.filter(row => !row.archived && row.date === date).length;
      const projectTitle = id => state.data.value.projects.find(row => row.id === id)?.title || '';
      function changeMonth(delta) {
        const date = new Date(monthYear.value.year, monthYear.value.month + delta, 1);
        if (date.getFullYear() < 1900 || date.getFullYear() > 2200) return;
        monthYear.value = { year: date.getFullYear(), month: date.getMonth() };
      }
      function selectDate(key) {
        if (!validDate(key)) return;
        selectedDate.value = key;
        const [year, month] = key.split('-').map(Number);
        monthYear.value = { year, month: month - 1 };
        if (!editingEvent.value) event.value.date = key;
      }
      function goToday() { selectDate(dateKey(new Date())); }
      function beginTask(row) { task.value = copy(row); editingTask.value = row.id; }
      function cancelTask() { task.value = { title: '', due: '', status: 'todo', projectId: selectedProject.value }; editingTask.value = ''; }
      function saveTask() { if (state.save('tasks', { ...task.value, id: editingTask.value })) cancelTask(); }
      function beginNote(row) { note.value = copy(row); editingNote.value = row.id; }
      function cancelNote() { note.value = { title: '', body: '' }; editingNote.value = ''; }
      function saveNote() { if (state.save('notes', { ...note.value, id: editingNote.value })) cancelNote(); }
      function beginProject(row) { project.value = copy(row); editingProject.value = row.id; }
      function cancelProject() { project.value = { title: '', description: '' }; editingProject.value = ''; }
      function saveProject() { if (state.save('projects', { ...project.value, id: editingProject.value })) cancelProject(); }
      function beginEvent(row) { event.value = copy(row); editingEvent.value = row.id; }
      function cancelEvent() { event.value = { title: '', date: selectedDate.value, time: '', notes: '' }; editingEvent.value = ''; }
      function saveEvent() { if (state.save('events', { ...event.value, id: editingEvent.value })) { selectDate(event.value.date); cancelEvent(); } }
      watch(() => props.mode, () => { showArchived.value = false; selectedProject.value = ''; state.message.value = ''; });
      return { ...state, showArchived, editingTask, editingNote, editingEvent, editingProject, task, note, project, event, selectedDate, selectedProject, title, activeMode, tasks, projects, activeProjects, notes, days, monthLabel, selectedEvents, countEvents, projectTitle, changeMonth, selectDate, goToday, beginTask, cancelTask, saveTask, beginNote, cancelNote, saveNote, beginProject, cancelProject, saveProject, beginEvent, cancelEvent, saveEvent, statusNames, emit };
    },
    template: `<section class="vlp-organizer" :data-mode="activeMode" data-testid="learning-organizer" :aria-label="title">
      <div class="vlp-organizer-heading"><div><h2>{{ title }}</h2><p>أضف شيئًا من شغلك الفعلي. لا توجد بيانات أو إنجازات وهمية.</p></div><label class="vlp-task-toggle"><input data-testid="show-archived" type="checkbox" v-model="showArchived">عرض الأرشيف بدل النشط</label></div>
      <p v-if="storageWarning" role="alert" class="vlp-storage-warning">{{ storageWarning }}</p><p role="status" class="vlp-save-message" data-testid="organizer-message">{{ message }}</p>
      <template v-if="activeMode==='tasks'||activeMode==='kanban'||activeMode==='projects'">
        <template v-if="activeMode==='projects'"><form class="vlp-organizer-form vlp-project-form" @submit.prevent="saveProject"><h3>{{ editingProject?'تعديل المشروع':'أضف مشروعك' }}</h3><label class="vlp-field">اسم المشروع<input data-testid="project-title" v-model="project.title" maxlength="180" required></label><label class="vlp-field">وصف مختصر<textarea data-testid="project-description" v-model="project.description" maxlength="12000" rows="3"></textarea></label><div class="vlp-action-row"><button type="submit" data-testid="project-save">{{ editingProject?'احفظ تعديل المشروع':'أضف المشروع' }}</button><button v-if="editingProject" type="button" @click="cancelProject">إلغاء التعديل</button><button type="button" @click="emit('learn',{id:'task-manager'})">تعلّم بناء مدير مهام</button></div></form>
        <div class="vlp-project-grid"><article v-for="row in projects" :key="row.id" class="vlp-record-card"><h3>{{ row.title }}</h3><p class="vlp-preserve-lines">{{ row.description }}</p><div class="vlp-action-row"><button type="button" @click="selectedProject=selectedProject===row.id?'':row.id;task.projectId=selectedProject" :aria-pressed="selectedProject===row.id">{{ selectedProject===row.id?'عرض كل المهام':'عرض مهام المشروع' }}</button><button type="button" @click="beginProject(row)">تعديل المشروع</button><button type="button" @click="archive('projects',row)">{{ row.archived?'إعادة المشروع':'أرشفة المشروع' }}</button></div></article></div><p v-if="!projects.length" class="vlp-empty">لا توجد مشاريع {{ showArchived?'مؤرشفة':'محفوظة' }}.</p></template>
        <form class="vlp-organizer-form" @submit.prevent="saveTask"><h3>{{ editingTask?'تعديل المهمة':'مهمة جديدة' }}</h3><label class="vlp-field">عنوان المهمة<input data-testid="task-title" v-model="task.title" maxlength="180" required></label><div class="vlp-form-grid"><label class="vlp-field">التاريخ اختياري<input data-testid="task-date" type="date" v-model="task.due" min="1900-01-01" max="2200-12-31"></label><label class="vlp-field">الحالة<select data-testid="task-status" v-model="task.status"><option v-for="(label,id) in statusNames" :value="id">{{ label }}</option></select></label><label class="vlp-field">المشروع<select data-testid="task-project" v-model="task.projectId"><option value="">بدون مشروع</option><option v-for="row in activeProjects" :key="row.id" :value="row.id">{{ row.title }}</option></select></label></div><div class="vlp-action-row"><button type="submit" data-testid="task-save">{{ editingTask?'احفظ تعديل المهمة':'أضف المهمة' }}</button><button v-if="editingTask" type="button" @click="cancelTask">إلغاء التعديل</button></div></form>
        <label class="vlp-field vlp-project-filter">تصفية حسب المشروع<select data-testid="project-filter" v-model="selectedProject"><option value="">جميع المشاريع</option><option v-for="row in activeProjects" :key="row.id" :value="row.id">{{ row.title }}</option></select></label>
        <div :class="activeMode==='kanban'?'vlp-kanban':'vlp-task-columns'"><section v-for="(label,status) in statusNames" :key="status" class="vlp-kanban-column"><h3>{{ label }} <span>{{ tasks.filter(t=>t.status===status).length }}</span></h3><article v-for="row in tasks.filter(t=>t.status===status)" :key="row.id" class="vlp-record-card" :data-task-id="row.id"><h4 :class="{'vlp-is-done':row.status==='done'}">{{ row.title }}</h4><p v-if="row.due"><time>{{ row.due }}</time></p><small v-if="row.projectId">{{ projectTitle(row.projectId) }}</small><label class="vlp-field">نقل المهمة<select :aria-label="'حالة المهمة '+row.title" :value="row.status" @change="patch('tasks',row.id,{status:$event.target.value})"><option v-for="(label,id) in statusNames" :value="id">{{ label }}</option></select></label><div class="vlp-action-row"><button type="button" @click="beginTask(row)">تعديل</button><button type="button" @click="archive('tasks',row)">{{ row.archived?'إعادة المهمة':'أرشفة' }}</button></div></article><p v-if="!tasks.some(t=>t.status===status)" class="vlp-empty">لا توجد مهام هنا.</p></section></div>
      </template>
      <template v-else-if="activeMode==='notes'"><form class="vlp-organizer-form" @submit.prevent="saveNote"><h3>{{ editingNote?'تعديل الملاحظة':'ملاحظة جديدة' }}</h3><label class="vlp-field">العنوان<input data-testid="note-title" v-model="note.title" maxlength="180" required></label><label class="vlp-field">الملاحظة<textarea data-testid="note-body" v-model="note.body" maxlength="12000" rows="6"></textarea></label><div class="vlp-action-row"><button type="submit" data-testid="note-save">{{ editingNote?'احفظ تعديل الملاحظة':'أضف الملاحظة' }}</button><button v-if="editingNote" type="button" @click="cancelNote">إلغاء التعديل</button></div></form><div class="vlp-project-grid"><article v-for="row in notes" :key="row.id" class="vlp-record-card"><h3>{{ row.title }}</h3><p class="vlp-preserve-lines">{{ row.body }}</p><div class="vlp-action-row"><button type="button" @click="beginNote(row)">تعديل الملاحظة</button><button type="button" @click="archive('notes',row)">{{ row.archived?'إعادة الملاحظة':'أرشفة الملاحظة' }}</button></div></article></div><p v-if="!notes.length" class="vlp-empty">لا توجد ملاحظات {{ showArchived?'مؤرشفة':'محفوظة' }}.</p></template>
      <template v-else-if="activeMode==='calendar'"><div class="vlp-calendar-layout"><div><div class="vlp-calendar-nav"><button type="button" data-testid="calendar-prev" @click="changeMonth(-1)" aria-label="الشهر السابق">السابق</button><h3 data-testid="calendar-month">{{ monthLabel }}</h3><button type="button" data-testid="calendar-next" @click="changeMonth(1)" aria-label="الشهر التالي">التالي</button><button type="button" @click="goToday">اليوم</button></div><div class="vlp-calendar-weekdays" aria-hidden="true"><span v-for="day in ['أحد','إثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت']">{{ day }}</span></div><div class="vlp-calendar-grid" aria-label="أيام الشهر"><button type="button" v-for="day in days" :key="day.key" :data-date="day.key" :class="{'is-other-month':!day.currentMonth,'is-today':day.key===today,'is-selected':day.key===selectedDate}" :aria-label="day.key+'، '+countEvents(day.key)+' مواعيد'" :aria-pressed="day.key===selectedDate" @click="selectDate(day.key)"><span>{{ day.number }}</span><small v-if="countEvents(day.key)">{{ countEvents(day.key) }} موعد</small></button></div></div>
        <div><form class="vlp-organizer-form" @submit.prevent="saveEvent"><h3>{{ editingEvent?'تعديل الموعد':'موعد مراجعة أو تعلم' }}</h3><label class="vlp-field">عنوان الموعد<input data-testid="event-title" v-model="event.title" maxlength="180" required></label><div class="vlp-form-grid"><label class="vlp-field">التاريخ<input data-testid="event-date" type="date" v-model="event.date" min="1900-01-01" max="2200-12-31" required></label><label class="vlp-field">الوقت المحلي اختياري<input data-testid="event-time" type="time" v-model="event.time"></label></div><label class="vlp-field">ملاحظات الموعد<textarea data-testid="event-notes" v-model="event.notes" maxlength="12000" rows="2"></textarea></label><div class="vlp-action-row"><button type="submit" data-testid="event-save">{{ editingEvent?'احفظ تعديل الموعد':'أضف الموعد' }}</button><button v-if="editingEvent" type="button" @click="cancelEvent">إلغاء التعديل</button></div></form><h3 class="vlp-selected-date">مواعيد {{ selectedDate }}</h3><article v-for="row in selectedEvents" :key="row.id" class="vlp-record-card"><h4>{{ row.title }}</h4><time>{{ row.time||'بدون وقت محدد' }}</time><p class="vlp-preserve-lines">{{ row.notes }}</p><div class="vlp-action-row"><button type="button" @click="beginEvent(row)">تعديل الموعد</button><button type="button" @click="archive('events',row)">{{ row.archived?'إعادة الموعد':'أرشفة الموعد' }}</button></div></article><p v-if="!selectedEvents.length" class="vlp-empty">لا توجد مواعيد في هذا اليوم.</p></div></div></template>
      <p class="vlp-local-note">الأرشفة قابلة للعكس ولا تحذف بياناتك. التواريخ والأوقات حسب جهازك، بلا مزامنة أو إشعارات خارج الصفحة. صدّر نسخة من بيانات المنصة قبل نقل الجهاز.</p>
    </section>`
  };
  const api = { dateKey, validDate, calendarDays, validate, statusNames, courseMetrics };
  root.VLexOrganizer = api;
  root.VLexPlatformComponents = root.VLexPlatformComponents || [];
  root.VLexPlatformComponents.push({ name: 'vlex-dashboard', component: dashboard }, { name: 'vlex-organizer', component: organizer });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
