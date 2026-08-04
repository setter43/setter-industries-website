# Setter Industries Website

Official website for **Setter Industries Ltd**.

This repository contains the source code for the public company website, built using HTML, CSS and JavaScript and deployed via GitHub Pages.

Website:
https://setterindustries.co.uk

---

## About

Setter Industries is a UK engineering SME providing specialist support in:

- Software Engineering
- Systems Engineering
- Modelling & Simulation
- Rapid Prototyping
- Technical Consultancy
- AI and Computer Vision

The website is designed to present the company's capabilities, showcase engineering work and provide information for customers, suppliers and procurement teams.

---

## Technology

This project intentionally uses a lightweight technology stack.

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts
- GitHub Pages hosting

No external frameworks are required.

---

## Repository Structure

```
assets/
│
├── css/
├── demos/
├── documents/
├── images/
└── js/

about.html
careers.html
contact.html
index.html
policies.html
security.html
services.html
supplier.html
work.html
```

---

## Configuration

Some information is populated centrally.

Edit:

```
assets/js/site-config.js
```

Configure:

- Company telephone number
- Company number
- Public contact email
- Tender email

---

## Local Development

Open the project folder and run:

```bash
python -m http.server 8000
```

Then browse to:

```
http://localhost:8000
```

---

## Deployment

The website is hosted using **GitHub Pages**.

Typical workflow:

```bash
git pull
git add .
git commit -m "Describe your changes"
git push origin main
```

GitHub automatically publishes the latest version.

---

## Versioning

Major website updates are released using semantic versioning.

Example:

- v2.0.0
- v2.1.0
- v2.2.0

Release notes are maintained in `CHANGELOG.md`.

---

## Intellectual Property

Copyright © 2026 Setter Industries Ltd.

All rights reserved.

Unless otherwise stated, the content of this repository, including source code, graphics, documentation and demonstrations, is the intellectual property of Setter Industries Ltd.

Third-party trademarks, product names and technologies remain the property of their respective owners.

---

## Contact

General enquiries

contact@setterindustries.co.uk

Procurement

tenders@setterindustries.co.uk

Website

https://setterindustries.co.uk
