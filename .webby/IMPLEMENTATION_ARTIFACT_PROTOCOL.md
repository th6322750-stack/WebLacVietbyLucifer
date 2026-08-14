# Binary artifact protocol

Git is the versioned control plane. Large binary master/asset packs live on Google Drive and are identified in Git by immutable file ID/name/byte-size/SHA-256.

Before implementation, download both authority ZIP files and run:

`python scripts/verify-webby-artifacts.py --root . --master <master.zip> --assets <assets.zip> --extract`

Both SHA checks must PASS. If a Drive file cannot be accessed, create a blocking `.webby/requests/` request and do not substitute files. The latest Lucifer-approved PDF/Drive preview remains supreme for visible UI.
