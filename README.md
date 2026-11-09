# माझा गाव, माझा अभिमान — दर्डेवाडी

A responsive Marathi community-foundation website with an integrated birthday contribution poster studio. Built with plain HTML, CSS and JavaScript for static hosting (GitHub Pages).

## Project structure

```text
maza-gav-maza-abhiman/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
└── README.md
```

## Run locally

Open `index.html` in a browser, or run a simple local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create or open your GitHub repository.
2. Upload the contents of this folder (keep `index.html` at the repository root).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select your branch (usually `main`) and folder `/ (root)`, then Save.
6. Wait for GitHub Pages to publish the site.

## Birthday poster studio

- Marathi-only poster content and labels.
- 12 templates: traditional Marathi and modern premium styles.
- Live 1080 × 1080 canvas preview.
- Name, date, contribution amount, title, message, font and accent customization.
- Optional photo upload (processed locally in the browser).
- PNG export.
- WhatsApp sharing: supported browsers can share the generated image file; otherwise the site opens WhatsApp with a message and asks the user to attach the downloaded poster.

## Important details to verify before publishing

- Confirm that `mazagav@upi` is the correct active UPI ID and that the recipient name shown in the payment app is correct.
- Confirm the contact number `+91 83908 05474` and email `connect@mazagavabhiman.org`.
- The impact figures (100+ youth, 50+ volunteers, 10+ events, 5+ years) are placeholders based on the supplied draft. Replace them with verified figures.
- The birthday contribution wall intentionally starts with an empty state. Add real contributors only after consent and after confirming the contribution; this version does not connect to a database.
- Replace the sample Unsplash photos with actual Dardewadi event and village photos before launch if available.

## Static-site limitations

This project has no backend, database, admin panel, payment verification or automatic contributor registration. The UPI button opens a payment app where supported; the website cannot confirm a payment. To publish verified birthday-wall entries automatically, a backend or a suitable form/database integration would be required.

## External resources

- Google Fonts: Mukta, Tiro Devanagari Marathi, Khand, DM Sans.
- Gallery/about images: Unsplash (remote images require an internet connection).
