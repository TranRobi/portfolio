# Project Images

Drop your project screenshots/photos into this folder.

## How it works

Files placed here are served at the root URL by Vite (and any static host).

For example, a file saved as:
  public/projects/robocup/photo1.jpg

…is referenced in `projects.json` as:
  "/projects/robocup/photo1.jpg"

## Recommended structure

```
public/
└── projects/
    ├── industrial-arm/
    │   ├── slide1.jpg
    │   ├── slide2.jpg
    │   └── slide3.jpg
    ├── robocup/
    │   ├── photo1.jpg
    │   └── photo2.jpg
    └── compressor/
        ├── screenshot1.png
        └── screenshot2.png
```

## Updating projects.json

Replace the placeholder picsum URLs with your own paths:

```json
"images": [
  "/projects/robocup/photo1.jpg",
  "/projects/robocup/photo2.jpg"
]
```

## Tips
- Recommended size: **800×450 px** (16:9) for the carousel to look sharp
- Supported formats: JPG, PNG, WebP (WebP gives the smallest file size)
- Keep filenames lowercase with hyphens, no spaces
