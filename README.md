# Damilola Fabiyi — Portfolio Site

## 🚀 Deploy to Netlify in 3 Steps

### Option A — Drag & Drop (Fastest)
1. Go to [netlify.com](https://netlify.com) and sign in
2. On your dashboard, find **"Sites"** → drag and drop the **entire project folder** onto the page
3. Your site goes live instantly with a `*.netlify.app` URL
4. (Optional) Add a custom domain under Site Settings → Domain Management

### Option B — GitHub + Auto-Deploy
1. Push this folder to a GitHub repository
2. Go to Netlify → **"Add new site"** → **"Import from Git"**
3. Connect GitHub, select your repo, and hit **Deploy**
4. Every push to `main` will auto-redeploy your site

---

## 📁 File Structure

```
/
├── index.html          ← Main portfolio page
├── css/
│   └── styles.css      ← All custom styles
├── js/
│   └── main.js         ← Interactions, animations, FAQ
├── images/             ← Add any local images here
└── netlify.toml        ← Netlify deploy config
```

---

## ✅ Post-Deploy Checklist

### 1. Set up Contact Form (Formspree)
The contact form currently uses a mailto fallback. To get actual form submissions:
1. Go to [formspree.io](https://formspree.io) → Create a free account
2. Create a new form → Copy your form ID (e.g., `xpzgkvjb`)
3. In `index.html`, find this line:
   ```html
   <form id="contact-form" ... action="https://formspree.io/f/oluwadamilolaadenike33@gmail.com" ...>
   ```
4. Replace the action URL with:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
5. Redeploy — form submissions now go straight to your email ✓

### 2. Add Your Profile Photo Locally (Optional)
The site currently pulls your photo from the Gamma CDN, which may expire.
To future-proof it:
1. Save your photo as `images/damilola.jpg`
2. In `index.html`, find the `<img>` tag in the About section
3. Change `src` to `images/damilola.jpg`

### 3. Update Social Links
All links use your real handles, but double-check:
- LinkedIn: `/in/oluwadamilola~fabiyi`
- Twitter/X: `@iam_dahmi`
- Email: `oluwadamilolaadenike33@gmail.com`
- Calendly: `calendly.com/oluwadamilolaadenike33/30min`

### 4. Add Custom Domain
In Netlify: Site Settings → Domain Management → Add custom domain

---

## 🎨 Customization Tips

### Change Colors
Edit `css/styles.css` root variables:
```css
:root {
  --electric-400: #38BDF8;   /* Blue accent */
  --violet-400: #A78BFA;     /* Purple accent */
  --navy-950: #03070F;       /* Background */
}
```

### Add More Projects
Copy a `.case-study-card` block in `index.html` and update:
- Image src
- Title & description
- Problem / Solution text
- Result metrics
- Tool tags

### Modify Animations
Reveal delays in HTML: `reveal-delay-1` through `reveal-delay-4`
Animation duration/easing in `css/styles.css` under `/* REVEAL ANIMATIONS */`

---

## 📊 Performance Notes
- All images are lazy-loaded
- Fonts loaded via Google Fonts (preconnected)
- Tailwind loaded via CDN (fine for static sites)
- For production upgrade: consider downloading Tailwind locally

---

Built with HTML5 · Tailwind CSS · Vanilla JS · Deployable on Netlify
