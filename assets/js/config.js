/* ======================================================================
   MY WEDDING INVITATION — CONFIGURATION & DETAILS
   Naveen Shekhar & Madhu Kumari
   ====================================================================== */

const WEDDING = {
  month: "March / April",
  venues: {
    home: {
      name: "Residence (Toera, Jharkhand)",
      map: "https://www.google.com/maps/search/?api=1&query=Toera+Jharkhand"
    },
    akshat: {
      name: "Akshat Banquet Hall (Kuju, Jharkhand)",
      map: "https://www.google.com/maps/search/?api=1&query=Akshat+Banquet+Hall+Kuju+Jharkhand"
    }
  },
  days: [
    { date: "30", label: "March", weekday: "Tuesday" },
    { date: "31", label: "March", weekday: "Wednesday" },
    { date: "01", label: "April", weekday: "Thursday" }
  ],
  events: [
    {
      id: "mandap",
      name: "Mandapachadan & Matkod",
      date: "30",
      month: "March",
      time: "11 AM – 8 PM",
      timeNote: "Auspicious blessings",
      venue: "home",
      img: "assets/images/mandap.webp",
      pos: "50% 50%"
    },
    {
      id: "haldi",
      name: "Haldi & Mehendi",
      date: "31",
      month: "March",
      time: "1 PM onwards",
      timeNote: "Music & Colors",
      venue: "home",
      venueNote: "At Residence, Toera",
      img: "assets/images/haldi.webp",
      pos: "50% 45%",
      dress: [["c-yellow", "Bride side · Yellow"], ["c-sky", "Groom side · Sky blue"]]
    },
    {
      id: "sangeet",
      name: "Sangeet & Engagement",
      date: "31",
      month: "March",
      time: "7 PM onwards",
      timeNote: "Dinner & Dance",
      venue: "home",
      img: "assets/images/sangeet.webp",
      pos: "52% 55%",
      dress: [["c-shimmer", "Shimmery & Festive"]]
    },
    {
      id: "shaadi",
      name: "Shaadi & Reception",
      date: "01",
      month: "April",
      time: "Baraat 7 PM onwards",
      timeNote: "Wedding Vows & Dinner",
      venue: "akshat",
      img: "assets/images/shaadi.webp",
      pos: "58% 50%",
      dress: [["c-avoid", "Royal Traditional Attire"]]
    }
  ],
  gallery: [
    "assets/images/couple-1.jpg",
    "assets/images/couple-2.jpg",
    "assets/images/couple-3.jpg"
  ],
  message: "With hearts full of joy and gratitude, we warmly invite you to celebrate as our beloved son, Naveen, begins a beautiful new journey of love and togetherness with Madhu. We would be truly honoured by your gracious presence and heartfelt blessings on this auspicious occasion to make our happiness complete.",
  signoff: ["With love & warm regards,", "Renuka & Ramnath Mahto", "with", "The Mahto Family"],
  tips: [
    { icon: "dress", title: "Dress code", text: "Haldi & Mehendi: bride side in yellow, groom side in sky blue. Sangeet: shimmery & festive. Shaadi & Reception: royal traditional attire." },
    { icon: "venue", title: "Venues", text: "Mandapachadan, Matkod, Haldi, Mehendi, and Sangeet at Residence, Toera (Jharkhand). Grand Wedding & Reception at Akshat Banquet Hall, Kuju (Jharkhand)." },
    { icon: "clock", title: "Timings", text: "Mandapachadan 11 AM – 8 PM, Haldi 1 PM onwards, Sangeet 7 PM onwards, Baraat & Reception 7:00 PM onwards." },
    { icon: "hash", title: "Wedding Hashtag", text: "#NaveenWedsMadhu" },
    { icon: "cal", title: "RSVP & Contact", text: "Phone: +91 9471555296" }
  ],
  rsvp: {
    phone: "9471555296",
    displayPhone: "+91 9471555296",
    whatsappUrl: "https://wa.me/919471555296?text=Hi%20Naveen,%20congratulations%20on%20your%20wedding!%20Excited%20to%20celebrate%20with%20you."
  },
  hashtag: "#NaveenWedsMadhu",
  countdown: { to: "2027-04-01T19:00:00", label: "until the Grand Wedding & Reception, 1 April 2027, 7:00 PM" }
};

const MELODIES = [
  {
    id: "shehnai",
    title: "Hindi",
    native: "शाही शहनाई",
    tag: "शाही शहनाई · Auspicious Shehnai Instrumental",
    src: "assets/audio/wedding-music.mp3"
  },
  {
    id: "vachindamma",
    title: "Telugu",
    native: "వచ్చిందమ్మా",
    tag: "వచ్చిందమ్మా · Romantic Wedding Song",
    src: "assets/audio/vachindamma.mp3"
  },
  {
    id: "elo-elo",
    title: "Bangla",
    native: "এলো এলো",
    tag: "এলো এলো · Romantic Wedding Melody",
    src: "assets/audio/elo-elo.mp3"
  }
];
