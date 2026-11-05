/**
 * Central business data + feature flags.
 * Rule: never invent data. Optional fields left `null` are simply not shown on the site.
 */

export const PLACEHOLDER = '[INVULLEN]';

export const site = {
  name: 'F&D Schoonmaak',
  url: 'https://www.fdschoonmaakbedrijf.nl', // keep in sync with astro.config.mjs
  locale: 'nl-NL',
  defaultDescription:
    'Schoonmaakbedrijf in Twente voor praktijken, kantoren, VvE’s en particulieren. Snel antwoord, vaste prijs vooraf. Vraag een offerte aan.',

  contact: {
    phoneDisplay: '+31 6 41290420',
    phoneE164: '+31641290420',
    whatsappNumber: '31641290420', // wa.me format, no plus
    whatsappText: 'Hallo F&D Schoonmaak, ik wil graag een offerte voor: ',
    email: 'info@fdschoonmaakbedrijf.nl',
  },

  address: {
    street: 'Het Nardusboer 159',
    postalCode: null as string | null, // [INVULLEN]
    city: 'Oldenzaal',
    region: 'Overijssel',
    country: 'NL',
  },

  legal: {
    kvk: '42140605',
    btw: null as string | null, // [INVULLEN]
  },

  // Trust facts: only fill in when true and verifiable.
  trust: {
    insurance: null as string | null, // e.g. 'AVB verzekerd bij ...' [JA/NEE + naam]
    vog: null as boolean | null,
    keurmerk: null as string | null, // e.g. 'Keurmerk Schoonmaak' / 'VCA' — only if certified
  },

  // "8-5 elke dag" interpreted as 08:00–17:00, Monday through Sunday. Please verify.
  openingHours: {
    label: 'Elke dag van 08:00 tot 17:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '17:00',
  },

  responseTime: 'binnen 1 minuut',

  owner: {
    name: null as string | null, // [INVULLEN]
  },

  social: {
    instagram: null as string | null,
    tiktok: null as string | null,
    facebook: null as string | null,
    linkedin: null as string | null,
  },

  // Privacy-friendly analytics only (no cookie banner needed). Leave provider null for none.
  analytics: {
    provider: null as null | 'plausible' | 'umami',
    plausibleDomain: 'fdschoonmaakbedrijf.nl',
    umamiSrc: '', // e.g. 'https://cloud.umami.is/script.js'
    umamiWebsiteId: '',
  },

  /** Window cleaning (glasbewassing): what we do. Shown on the glasbewassing pages. */
  glasbewassing: {
    zijden: 'Buitenkant: voorkant, achterkant of rondom',
    panden: 'Woningen en bedrijfspanden',
    maxHoogte: 'Alle verdiepingen, ook 3 hoog en hoger',
    methode: 'Osmosewater (streeploos) of traditioneel met ladder',
  },

  flags: {
    showReviews: false, // only true when src/data/reviews.ts holds real reviews
    showCertifications: false, // only true when trust.keurmerk is real
    showClientLogos: false, // only with written permission from clients
    showPrices: true, // prices come from src/data/prijzen.ts
    showVideo: true, // vertical videos from src/data/videos.ts
  },
};

export type Site = typeof site;

export const whatsappUrl = (text: string = site.contact.whatsappText) =>
  `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const telUrl = `tel:${site.contact.phoneE164}`;
export const mailUrl = `mailto:${site.contact.email}`;

/** Render a value or a visible placeholder. */
export const orPlaceholder = (v: string | number | null | undefined) =>
  v === null || v === undefined || v === '' ? PLACEHOLDER : String(v);

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();
