# Setter Industries Website v1.0

This is the tidied v1.0 project structure for the Setter Industries website.

## Structure

```text
setter-industries-website/
├── index.html
├── about.html
├── services.html
├── work.html
├── careers.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   ├── si-logo-full.png
│   │   ├── si-logo-icon.png
│   │   ├── sword-at.png
│   │   ├── sword-attack.png
│   │   └── sword-ambush.png
│   └── demos/
│       ├── setter_tis_demo.html
│       └── dcm_demo.html
└── README.md
```

## Deployment notes

Upload all files and folders to GitHub exactly as shown. Netlify should continue to use `index.html` from the repository root.

The logo references now point to transparent PNG files in `assets/images/` rather than embedded Base64 images.

The interactive demos now live in `assets/demos/` and are embedded from the Our Work page.
