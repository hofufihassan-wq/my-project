#!/usr/bin/env bash
set -euo pipefail
# Run in the checkout root. Reports redact secret values and never upload source.
security_out="${RUNNER_TEMP:-/tmp}/vlex-security"
mkdir -p "$security_out/bin" "$security_out/tracked"
curl -fsSL --retry 2 --max-time 90 https://github.com/gitleaks/gitleaks/releases/download/v8.30.0/gitleaks_8.30.0_linux_x64.tar.gz -o "$security_out/gitleaks.tar.gz"
printf '%s  %s\n' '79a3ab579b53f71efd634f3aaf7e04a0fa0cf206b7ed434638d1547a2470a66e' "$security_out/gitleaks.tar.gz" | sha256sum --check --status
tar -xzf "$security_out/gitleaks.tar.gz" -C "$security_out/bin" gitleaks LICENSE
git archive --format=tar HEAD | tar -xf - -C "$security_out/tracked"
"$security_out/bin/gitleaks" git . --log-opts='--all --full-history' --ignore-gitleaks-allow --redact=100 --no-banner --max-decode-depth 5 --max-archive-depth 3 --report-format json --report-path "$security_out/history.json" > "$security_out/history.log" 2>&1
"$security_out/bin/gitleaks" dir "$security_out/tracked" --ignore-gitleaks-allow --redact=100 --no-banner --max-decode-depth 5 --max-archive-depth 3 --report-format json --report-path "$security_out/tracked.json" > "$security_out/tracked.log" 2>&1

python3 scripts/audit-public-history.py --output "$security_out/blob-audit" --gitleaks "$security_out/bin/gitleaks"
