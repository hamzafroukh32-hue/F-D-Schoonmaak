/**
 * All prices live here. `null` = not yet set → shows [INVULLEN] on the site.
 * Amounts in euro. State clearly whether incl. or excl. btw via `btwLabel`.
 */

export interface Pakket {
  id: string;
  naam: string;
  doelgroep: 'zakelijk' | 'particulier';
  vanaf: number | null;
  eenheid: string; // e.g. 'per beurt', 'per woning', 'per maand'
  omschrijving: string;
  dienstSlug: string;
}

// All prices on the site are shown incl. 21% btw (controleren voor zakelijke klanten).
export const btwLabel = {
  zakelijk: 'incl. btw',
  particulier: 'incl. btw',
};

// Appartement preset: 6 ramen, voorkant, begane grond → 4 × €3 + 2 × €2,50 (see glasPrijzen below)
const glasPrijsVanaf = 17;

export const pakketten: Pakket[] = [
  {
    id: 'glas-particulier',
    naam: 'Glasbewassing woning',
    doelgroep: 'particulier',
    vanaf: glasPrijsVanaf,
    eenheid: 'per beurt, appartement',
    omschrijving: 'Je ramen streeploos schoon, los of met een abonnement elke 4, 6 of 8 weken.',
    dienstSlug: 'glasbewassing-particulier',
  },
  {
    id: 'glas-zakelijk',
    naam: 'Glasbewassing zakelijk',
    doelgroep: 'zakelijk',
    vanaf: 2,
    eenheid: 'per raam (vanaf 15 ramen)',
    omschrijving: 'Kantoor, praktijk, winkel of VvE. Vaste ronde, vaste prijs per beurt.',
    dienstSlug: 'glasbewassing-zakelijk',
  },
  {
    id: 'praktijk',
    naam: 'Praktijkschoonmaak',
    doelgroep: 'zakelijk',
    vanaf: 35,
    eenheid: 'per uur',
    omschrijving: 'Behandelkamers, wachtruimte, balie en sanitair volgens vaste checklist.',
    dienstSlug: 'praktijkschoonmaak',
  },
  {
    id: 'kantoor',
    naam: 'Kantoorschoonmaak',
    doelgroep: 'zakelijk',
    vanaf: 35,
    eenheid: 'per uur',
    omschrijving: 'Voor kantoren van ongeveer 100 tot 300 m², op een vaste dag en tijd.',
    dienstSlug: 'kantoorschoonmaak',
  },
  {
    id: 'vve',
    naam: 'Trappenhuis / VvE',
    doelgroep: 'zakelijk',
    vanaf: 35,
    eenheid: 'per uur',
    omschrijving: 'Trappen, hal, liftdeuren, brievenbussen en entree.',
    dienstSlug: 'vve-trappenhuis-schoonmaak',
  },
  {
    id: 'eindschoonmaak',
    naam: 'Eindschoonmaak',
    doelgroep: 'particulier',
    vanaf: 50,
    eenheid: 'per uur',
    omschrijving: 'Je huurwoning schoon opleveren na een verhuizing. Vaste prijs vooraf.',
    dienstSlug: 'eindschoonmaak-diepteschoonmaak',
  },
  {
    id: 'diepteschoonmaak',
    naam: 'Diepteschoonmaak',
    doelgroep: 'particulier',
    vanaf: 50,
    eenheid: 'per uur',
    omschrijving: 'Een grondige beurt van keuken, badkamer en alle plekken die je normaal overslaat.',
    dienstSlug: 'eindschoonmaak-diepteschoonmaak',
  },
  {
    id: 'airbnb',
    naam: 'Airbnb-wisselschoonmaak',
    doelgroep: 'particulier',
    vanaf: 35,
    eenheid: 'per uur',
    omschrijving: 'Schoonmaken en klaarzetten tussen twee gasten.',
    dienstSlug: 'airbnb-wisselschoonmaak',
  },
];

/** What drives the price — shown on /prijzen/. Text only, no numbers invented. */
export const prijsfactoren = [
  {
    titel: 'Oppervlakte (m²)',
    tekst: 'Meer vierkante meters betekent meer tijd. Daarom vragen we altijd naar de grootte van de ruimte.',
  },
  {
    titel: 'Frequentie',
    tekst: 'Hoe vaak we komen bepaalt het aantal beurten per maand. Bij een vaste frequentie hoeft er per beurt vaak minder ingehaald te worden.',
  },
  {
    titel: 'Sanitair en keukens',
    tekst: 'Toiletten, douches en pantry’s kosten de meeste tijd. Het aantal ruimtes telt dus mee.',
  },
  {
    titel: 'Vloertype',
    tekst: 'Tapijt, laminaat, tegels of linoleum vragen elk een andere aanpak en ander materiaal.',
  },
  {
    titel: 'Staat van de ruimte',
    tekst: 'Bij een eindschoonmaak of diepteschoonmaak maakt het uit hoe lang er niet grondig is schoongemaakt. Een foto helpt ons om dat vooraf in te schatten.',
  },
];


/* ------------------------------------------------------------------ */
/* Offerte-calculator (/offerte/). Prices are INCLUDING 21% btw.       */
/* ------------------------------------------------------------------ */

export const btwPercentage = 21;

/** Hourly rates for cleaning, incl. btw. */
export const uurtarieven = {
  regulier: 35, // gewone schoonmaak, per uur
  diep: 50, // diepteschoonmaak / eindschoonmaak, per uur
  minUren: 2, // minimum per beurt — controleren
  stapUren: 0.5,
};

/**
 * Window cleaning, priced per window with a sliding scale (staffel), incl. btw.
 * Example: 12 ramen = 4 × €3,00 + 8 × €2,50 = €32,00. Minimum €10 per beurt (before surcharges).
 * Surcharges are fixed amounts per beurt. The method factor multiplies the glass total.
 */
export const glasPrijzen = {
  staffel: [
    { tot: 4, prijs: 3 }, // raam 1 t/m 4
    { tot: 14, prijs: 2.5 }, // raam 5 t/m 14
    { tot: null as number | null, prijs: 2 }, // raam 15 en verder
  ],
  minimum: 10,
  woningtypes: [
    { id: 'appartement', label: 'Appartement', ramen: 6, zijde: 'voor', verdieping: 'bg' },
    { id: 'rijtjeshuis', label: 'Rijtjeshuis', ramen: 12, zijde: 'gehele', verdieping: '1e' },
    { id: 'hoekwoning', label: 'Hoekwoning', ramen: 14, zijde: 'rondom', verdieping: '1e' },
    { id: 'twee-onder-een-kap', label: '2-onder-1-kap', ramen: 16, zijde: 'rondom', verdieping: '1e' },
    { id: 'vrijstaand', label: 'Vrijstaand', ramen: 20, zijde: 'rondom', verdieping: '2e' },
  ],
  bedrijfspand: { ramen: 20, zijde: 'gehele', verdieping: 'bg' },
  methodes: [
    { id: 'osmose', label: 'Osmose (streeploos, standaard)', factor: 1 },
    { id: 'traditioneel', label: 'Traditioneel (ladder en hand)', factor: 1.5 },
  ],
  zijden: [
    { id: 'voor', label: 'Alleen voorkant', toeslag: 0 },
    { id: 'achter', label: 'Alleen achterkant', toeslag: 0 },
    { id: 'gehele', label: 'Voor- en achterkant', toeslag: 3 },
    { id: 'rondom', label: 'Rondom (hoekwoning / vrijstaand)', toeslag: 5 },
  ],
  verdiepingen: [
    { id: 'bg', label: 'Alleen begane grond', toeslag: 0 },
    { id: '1e', label: 'Begane grond + 1e verdieping', toeslag: 1 },
    { id: '2e', label: 'Begane grond + 1e + 2e verdieping', toeslag: 2 },
    { id: '3plus', label: 'Alle verdiepingen (3+)', toeslag: 3.5 },
  ],
  perStuk: [
    { id: 'dakkapelramen', label: 'Dakkapelramen', prijs: 3 },
    { id: 'dakramen', label: 'Velux- of dakramen', prijs: 3 },
  ],
  ladder: { label: 'Ladder nodig (bijv. over een schuur)', toeslag: 2 },
  serre: [
    { id: 'geen', label: 'Geen serre', toeslag: 0 },
    { id: 'buiten', label: 'Buitenkant serre meenemen', toeslag: 4 },
    { id: 'dak', label: 'Serredak reinigen', toeslag: 20 },
  ],
  // Subscription discount (%) on the window-cleaning price per beurt
  frequenties: [
    { id: 'eenmalig', label: 'Eenmalig', weken: null as number | null, korting: 0 as number | null },
    { id: '4-weken', label: 'Elke 4 weken', weken: 4, korting: 10 as number | null },
    { id: '6-weken', label: 'Elke 6 weken', weken: 6, korting: 5 as number | null },
    { id: '8-weken', label: 'Elke 8 weken', weken: 8, korting: 2.5 as number | null },
  ],
};

/** Extra outdoor services, incl. btw. Set `aan: false` for anything you don't offer. */
export const extraDiensten = [
  { id: 'dakkapel', label: 'Dakkapel reinigen', prijs: 55, eenheid: 'per dakkapel', minimum: 55, standaard: 1, aan: true },
  { id: 'zonnepanelen', label: 'Zonnepanelen reinigen', prijs: 6, eenheid: 'per paneel', minimum: 10, standaard: 10, aan: true },
  { id: 'dakgoot', label: 'Dakgoot reinigen', prijs: 4, eenheid: 'per meter', minimum: 20, standaard: 10, aan: true },
];

/** How often cleaning comes back (for the per-month estimate; no discount). */
export const schoonmaakFrequenties = [
  { id: 'eenmalig', label: 'Eenmalig', perMaand: null as number | null },
  { id: 'wekelijks', label: 'Elke week', perMaand: 4.33 },
  { id: '2-weken', label: 'Elke 2 weken', perMaand: 2.17 },
  { id: '4-weken', label: 'Elke 4 weken', perMaand: 1.08 },
];

/** Window-cleaning price for a number of windows (sliding scale + minimum), before surcharges. */
export function glasBasis(ramen: number) {
  let rest = Math.max(0, Math.floor(ramen));
  let vorige = 0;
  let totaal = 0;
  for (const s of glasPrijzen.staffel) {
    const ruimte = s.tot === null ? rest : Math.max(0, Math.min(rest, s.tot - vorige));
    totaal += ruimte * s.prijs;
    rest -= ruimte;
    vorige = s.tot ?? vorige;
    if (rest <= 0) break;
  }
  return ramen > 0 ? Math.max(totaal, glasPrijzen.minimum) : 0;
}

/** Price for one of the home-type presets, without extras or discount (used for "vanaf"). */
export function glasPreset(id: string) {
  const t = glasPrijzen.woningtypes.find((w) => w.id === id)!;
  const z = glasPrijzen.zijden.find((x) => x.id === t.zijde)!.toeslag;
  const v = glasPrijzen.verdiepingen.find((x) => x.id === t.verdieping)!.toeslag;
  return glasBasis(t.ramen) + z + v;
}

export const formatEuro = (n: number, decimals = 0) =>
  new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);
