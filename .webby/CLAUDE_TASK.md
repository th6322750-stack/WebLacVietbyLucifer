# CLAUDE TASK — BLOCKED UNTIL GIT SELF-CONTAINED HANDOFF IS COMPLETE

**DO NOT START GĐ4/GĐ5/GĐ6 YET.** Lucifer has approved GĐ1 V1 (`DUYỆT GIAO DIỆN V1`), but ChatGPT reopened GĐ3 because the current repository still requires Google Drive to obtain visual master/asset binaries.

The new mandatory gate is stronger:

```text
FRESH CLONE OF ACTIVE BRANCH
↓
NO GOOGLE DRIVE REQUIRED
↓
Git-resident approved visual master pages
+ Git-resident production assets
+ contracts/maps/locks
↓
clone-only validator PASS
↓
UI_SETUP_COMPLETE=true
↓
Claude may start GĐ4
```

Current state must read:
- `.webby/PROJECT_STATE.yaml` → `implementation.authorized: false`
- `.webby/UI_SETUP_COMPLETE` → `UI_SETUP_COMPLETE=false`
- `.webby/HANDOFF.json` → `BLOCKED_GIT_SELF_CONTAINMENT_IN_PROGRESS`

The user-approved PDF SHA-256 is `f015b20da10eb50862eec6bc9acc7668c02cd2746e31f29bdd73596319b60c4f`.

Google Drive may remain as a human-review mirror/backup, but after final hardening it must not be a required implementation dependency.

Do not merge PR. Do not redesign V1. Wait for ChatGPT to publish a new final authorization state.
