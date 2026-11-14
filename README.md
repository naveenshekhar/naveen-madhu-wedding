# My Wedding Invitation — Naveen & Madhu

A royal, interactive Indian wedding invitation website built with high-fidelity animations, 3D room tilt effects, envelope reveal animation, trilingual background music selection (Hindi, Telugu, Bangla), and day-by-day ceremony details.

Customized for **Naveen Shekhar & Madhu Kumari**.

---

## 📁 Project Structure

```
my-wedding-invitation/
├── index.html              # Clean semantic HTML markup & structure
├── package.json            # Project metadata & npm scripts
├── vercel.json             # Vercel deployment configuration
├── README.md               # Documentation & setup guide
└── assets/
    ├── css/
    │   └── style.css       # Full stylesheet (typography, animations, responsive layout)
    ├── js/
    │   ├── config.js       # Wedding details, ceremony itinerary, and playlist data
    │   └── main.js         # Interactive engine (envelope, audio player, modal, carousel, countdown)
    ├── audio/
    │   ├── wedding-music.mp3  # शाही शहनाई (Hindi) - Auspicious Royal Shehnai
    │   ├── vachindamma.mp3    # వచ్చిందమ్మా (Telugu) - Romantic Wedding Melody
    │   └── elo-elo.mp3        # এলো এলো (Bangla) - Festive Wedding Song
    └── images/             # Visual assets, textures, illustrations, and couple photos
```

---

## 🌟 Key Features
* 💌 **Interactive Envelope Opening:** Tap-to-open envelope animation with wax seal and pearl ring glow.
* 🎵 **Trilingual Wedding Melodies:** Interactive floating audio player allowing guests to switch between **Hindi (शाही शहनाई)**, **Telugu (వచ్చిందమ్మా)**, and **Bangla (এলো এলো)** with Google Language indicator (`🌐`).
* 🕉️ **Traditional Auspicious Shloka & Kalash:** *॥ ॐ श्री गणेशाय नमः ॥* and *शुभ विवाह* blessings.
* ⏳ **Live Countdown Timer:** Live Days, Hours, Minutes, and Seconds ticking to **1st April 2027, 7:00 PM**.
* 📜 **Interactive Event Timeline (Celebrations):**
  - **30 March 2027:** Mandapachadan & Matkod (Residence, Toera, Jharkhand)
  - **31 March 2027:** Haldi & Mehendi (1 PM onwards) + Sangeet & Engagement (7 PM onwards) (Residence, Toera, Jharkhand)
  - **01 April 2027:** Shaadi & Reception (Baraat 7 PM onwards) (Akshat Banquet Hall, Kuju, Jharkhand)
* 🗺️ **Venue Directions & Google Maps Sheet:** One-tap navigation sheet directly opening Google Maps for Toera and Akshat Banquet Hall.
* 📸 **Infinite Moments Gallery:** Smooth, endless auto-scrolling photo strip featuring the couple's pre-wedding portraits (pauses automatically on touch or hover).
* 💌 **Heartfelt Message from Parents & Family:** Hosted by Smt. Renuka & Shri Ramnath Mahto (The Mahto Family).
* 📱 **RSVP & Wedding Hashtag:**
  - Phone: `+91 9471555296` (with direct Call & WhatsApp click-to-chat)
  - Hashtag: `#NaveenWedsMadhu`
* 📱 **Tilt & Gyroscope 3D Parallax:** Follows mouse movement, touch scroll, and mobile gyroscope tilt.

---

## 🚀 How to Run Locally

### Option 1: Double Click
Double-click `index.html` in your file explorer to open it in any modern browser (Chrome, Edge, Safari, Firefox).

### Option 2: Local HTTP Server (Recommended for audio & full smoothness)
In terminal / command prompt:
```bash
python -m http.server 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

---

## 🌐 Live Website & Deployment

* **Live GitHub Pages URL:** [https://naveenshekhar.github.io/naveen-madhu-wedding/](https://naveenshekhar.github.io/naveen-madhu-wedding/)
* **Deploy on Vercel:** Import repository `naveenshekhar/naveen-madhu-wedding` on [vercel.com](https://vercel.com) for instant deployment.
