# ALIENTO — Women’s Fitness & Wellness Centre

A modern, premium, fully responsive static multi-page website built with HTML5, CSS3, and Vanilla JavaScript. Designed for direct deployment on any standard cPanel or shared hosting environment without build steps, while also fully compatible with Node.js/Vite development workflows.

---

## 1. How to Run Locally

### Option A: Direct Static (No Node.js Required)
Because this website uses pure HTML5, CSS3, and Vanilla JavaScript with no frameworks:
- Double-click `index.html` to open it in any modern browser (Chrome, Safari, Edge, Firefox).
- Or use VS Code's "Live Server" extension: right-click `index.html` and click **"Open with Live Server"**.

### Option B: Local Development Server (Vite)
If you prefer running a Node development server:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. File & Folder Structure

```
/
├── index.html                   # Homepage / Landing Page (all 12 sections)
├── about.html                   # About Aliento (16+ years story & approach)
├── services.html                # Complete Services Overview
├── shapemaster.html             # Shapemaster Pilates (all 8 machines)
├── vacushape.html               # VacuShape (vacuum walking therapy)
├── whole-body-vibration.html    # Whole Body Vibration
├── vibrosaun.html               # Vibrosaun (dry heat & vibration therapy)
├── massage-chair.html           # Therapeutic Massage Chair
├── fitness-awareness.html       # Blog & Social Content Hub (with category filters)
├── offers.html                  # Current Offers & Promotions (WhatsApp claim buttons)
├── free-trial.html              # Dedicated Free Trial Landing Page
├── shop.html                    # Fitness & Wellness Shop (interactive WhatsApp enquiry cart)
├── downloads.html               # Brochure & Flyer Centre (PDF downloads)
├── contact.html                 # Contact Us & Google Business Profile Card with Directions
├── booking.html                 # Booking / Enquiry Page (with WhatsApp message generator)
├── privacy.html                 # Privacy Policy (Australian Privacy Principles compliant)
├── terms.html                   # Terms & Conditions (studio guidelines & safety policies)
├── 404.html                     # Custom Branded 404 Page
│
├── css/
│   └── style.css                # Master stylesheet (palette, typography, layout, animations)
│
├── js/
│   ├── main.js                  # Navigation, sticky header, scroll reveal, accordions, cookie notice
│   ├── awareness.js             # Data array and category filtering for awareness posts
│   ├── offers.js                # Data array and dynamic rendering for promotional offers
│   └── shop.js                  # Product catalogue and WhatsApp multi-item enquiry cart
│
├── assets/
│   ├── images/                  # Studio photographs and equipment images
│   ├── icons/                   # Vector icons
│   └── downloads/               # PDF brochures, machine guides, and printable trial flyers
│
└── README.md                    # Documentation & maintenance guide
```

---

## 3. Brand & Studio Information

- **Business Name:** Aliento
- **Type:** Women’s Fitness & Wellness Centre
- **Tagline:** “Feel Good. Move Better. Live Well.”
- **Location:** Level 1, 7A Darryl Street, Scoresby, Victoria 3179, Australia
- **Telephone:** `(03) 9764 1110` (`tel:0397641110`)
- **WhatsApp:** `0397641110` (`https://wa.me/61397641110`)
- **Email:** `info@aliento.com.au`
- **Facebook:** `https://web.facebook.com/alientoWellbeing`
- **Instagram:** `https://www.instagram.com/alientowellbeing`

---

## 4. How to Replace Images

All image files reside inside the `assets/images/` directory:
- `hero.jpg`: Main homepage banner photo showing women exercising comfortably.
- `shapemaster.jpg`: Shapemaster circuit machines and studio setup.
- `vacushape.jpg`: VacuShape vacuum walking treadmill cabin.
- `vibrosaun.jpg`: Vibrosaun therapy room.
- `massage-chair.jpg`: Ergonomic therapeutic massage chair lounge.
- `vibration.jpg`: Whole Body Vibration platform.

To replace an image, simply overwrite any of these files with an optimized JPG or PNG file bearing the same filename, or edit the `src` attribute in the respective HTML file.

---

## 5. How to Add or Edit Awareness Posts

Open `js/awareness.js`. You will find the `awarenessPosts` array:

```javascript
const awarenessPosts = [
  {
    id: 'post-7',
    title: 'Your Article Title Here',
    category: 'Fitness Tips', // Choose: Fitness Tips, Women’s Wellness, Workout Ideas, Healthy Habits, Lifestyle, Aliento Updates
    date: '26 September 2026',
    readTime: '3 min read',
    image: 'assets/images/hero.jpg',
    excerpt: 'A short, engaging two-sentence summary of the post.',
    facebookLink: 'https://web.facebook.com/alientoWellbeing'
  },
  // ...
];
```

The category filter tabs automatically reflect any posts added to this array.

---

## 6. How to Add or Edit Current Offers

Open `js/offers.js`. The `offers` array contains all studio promotional cards:

```javascript
const offers = [
  {
    id: 'offer-5',
    badge: 'Seasonal Special',
    title: 'Your Offer Title',
    description: 'Describe the offer, session combination, or special rate.',
    expiry: 'Valid Until 31 October 2026',
    terms: 'First-time visitors only. Booking required.',
    whatsappMessage: 'Hi Aliento, I would like to claim the [Offer Name].'
  },
  // ...
];
```

The "Claim This Offer" button will automatically encode the `whatsappMessage` and open a chat with Aliento's WhatsApp number.

---

## 7. How to Add or Edit Shop Products

Open `js/shop.js`. The `products` array controls the catalogue:

```javascript
const products = [
  {
    id: 'prod-7',
    name: 'Pilates Resistance Ring',
    category: 'Equipment', // Equipment, Accessories, Recovery, Lifestyle
    price: '$35.00',
    description: 'Dual-padded flexible resistance ring for inner thigh and arm toning.',
    image: 'assets/images/shapemaster.jpg'
  },
  // ...
];
```

When users click **"Add to Enquiry"**, the items accumulate in their sliding drawer. When they tap **"Send Enquiry on WhatsApp"**, a formatted summary of all selected products, quantities, and prices is sent directly to Aliento.

---

## 8. How to Replace Brochure / Flyer PDFs

Downloadable PDF files are placed in `assets/downloads/`:
- `aliento-brochure.pdf`: General welcome brochure.
- `shapemaster-guide.pdf`: Walkthrough of the 8 circuit stations.
- `vacushape-flyer.pdf`: VacuShape details and benefits.
- `vibrosaun-guide.pdf`: Vibrosaun therapy information.

To replace any document, overwrite the PDF file in `assets/downloads/` with your updated PDF.

---

## 9. How WhatsApp Booking Works

All CTAs throughout the website utilize the global helper function:
```javascript
window.openWhatsApp("Your message here");
```
This automatically encodes the message and opens:
`https://wa.me/61397641110?text=<encoded-message>`

On mobile devices, this seamlessly opens the WhatsApp mobile application. On desktop devices, it opens WhatsApp Web.

---

## 10. How to Deploy to cPanel / Shared Hosting

1. Log in to your **cPanel account**.
2. Open **File Manager** and navigate to your domain's root folder (usually `public_html/`).
3. Upload all files and folders directly from this directory:
   - All `.html` files (`index.html`, `about.html`, `services.html`, etc.)
   - The `css/` directory
   - The `js/` directory
   - The `assets/` directory
4. Ensure `index.html` is in the root of `public_html/`.
5. That’s it! The website will immediately be live with fast loading speeds, zero server-side dependencies, and full mobile responsiveness.
