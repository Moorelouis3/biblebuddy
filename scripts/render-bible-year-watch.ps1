# Render Bible in One Year audio as soon as the day writer agent pushes a script.
#
# The agent runs in the cloud, where there is no OPENAI_API_KEY, so it can only
# write and push. This closes the loop from Louis's machine: pull, then render
# anything whose script is newer than its audio.
#
# Registered as the scheduled task "BibleBuddy-RenderBibleYear" and run hourly.
# The agent writes roughly two days every four hours, so an hourly check means
# audio follows a script by well under an hour.
#
# Safe to run any time: the renderer only touches days that are actually stale,
# so a run with nothing new costs one git pull and exits.

$ErrorActionPreference = "Stop"
$repo = "C:\Users\Moore\Desktop\biblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e"
$logDir = Join-Path $repo "tmp\bible-year-watch"
$log = Join-Path $logDir ("run-" + (Get-Date -Format "yyyy-MM-dd") + ".log")

if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force -Path $logDir | Out-Null }

function Write-Log($message) {
    $line = "[" + (Get-Date -Format "yyyy-MM-dd HH:mm:ss") + "] $message"
    Add-Content -Path $log -Value $line -Encoding utf8
}

Set-Location $repo
Write-Log "--- watch run starting ---"

# Native exes get their exit code checked rather than being wrapped in
# try/catch: git and npx both write ordinary progress to stderr, which
# PowerShell would otherwise treat as a terminating error.
$ErrorActionPreference = "Continue"

# A stuck rebase or merge from an earlier failure blocks every future pull -
# exactly this jammed the task for hours on 2026-09-01 over a
# MARCUS_HANDOFF.md conflict. Aborting is safe: it returns to the pre-pull
# state, and the renderer needs a clean tree, not that conflicted file.
& git rebase --abort 2>$null
& git merge --abort 2>$null

# Autostash so a dirty working tree never blocks the pull.
$pull = (& git pull --rebase --autostash origin main) | Out-String
if ($LASTEXITCODE -ne 0) {
    # One retry after clearing any conflict the pull itself just created:
    # MARCUS_HANDOFF.md ping-pongs between Life Buddy clearing it and cloud
    # agents appending, so take origin's side of that one file and move on.
    Write-Log ("git pull failed once, clearing and retrying: " + $pull.Trim())
    & git rebase --abort 2>$null
    & git checkout origin/main -- MARCUS_HANDOFF.md 2>$null
    & git add MARCUS_HANDOFF.md 2>$null
    $pull = (& git pull --rebase --autostash origin main) | Out-String
    if ($LASTEXITCODE -ne 0) {
        Write-Log ("git pull FAILED after retry (exit " + $LASTEXITCODE + "): " + $pull.Trim())
        exit 1
    }
}
Write-Log ("git pull: " + $pull.Trim())

$output = (& npx tsx scripts/render-pending-bible-year-days.ts) | Out-String
Write-Log $output.Trim()
if ($LASTEXITCODE -ne 0) {
    # Do not exit hard: the renderer returns non-zero when a single day fails,
    # and the rest of the batch still published. Next hour tries the stragglers.
    Write-Log ("render reported failures (exit " + $LASTEXITCODE + ")")
}

Write-Log "--- watch run done ---"
