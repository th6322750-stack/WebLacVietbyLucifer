# Git-self-contained implementation artifact protocol

The implementation handoff is self-contained in Git. Google Drive is review/backup only and is **not** an implementation dependency.

Before coding, from a fresh checkout of `chatgpt/gd3-git-self-contained-v1`, run:

```bash
python scripts/reconstruct-git-self-contained.py
python scripts/validate-gd3-git-self-contained.py --require-ready
```

Both commands must PASS. The supreme visible UI authority is the exact Lucifer-approved PDF stored at `.webby/visual-master/gd1-v1/LacVietMedia_GD1_UI_Approved_v1.pdf`, SHA-256 `f015b20da10eb50862eec6bc9acc7668c02cd2746e31f29bdd73596319b60c4f`. Route masters are in `.webby/visual-master/gd1-v1/pages/`; production assets are in `assets/production/`.

Do not download substitute assets, redraw the logo, redesign the approved UI, or use Drive to fill perceived gaps. If a Git-resident authority file or binary fails validation, stop implementation and report the exact failing path/hash.
