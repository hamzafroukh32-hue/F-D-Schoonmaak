# F&D Schoonmaak: website

Statische, snelle website voor F&D Schoonmaak, gebouwd met **Astro** en **Tailwind CSS**. De site werkt zonder database en zonder server, en wordt gratis gehost op **Vercel**. Formulieren komen per e-mail binnen via **Web3Forms**.

- 40 pagina's: home, 7 diensten (waaronder glasbewassing particulier en zakelijk), 7 plaatsen + 7 "Glazenwasser [plaats]"-pagina's, prijzen, voor/na (met categorie-filter), contact, vacatures, offerte-calculator, kennisbank (5 artikelen), privacy, voorwaarden, 404
- Lighthouse mobiel (lokaal gemeten op 14 pagina's): 100 op performance, toegankelijkheid, best practices en SEO
- Geen cookies, geen trackers, lettertypes lokaal (geen Google Fonts)

Wat nog ontbreekt staat in [NOG-AAN-TE-LEVEREN.md](NOG-AAN-TE-LEVEREN.md). Ontbrekende gegevens worden op de site gewoon niet getoond.

---

## 1. Lokaal draaien

Je hebt **Node.js 22.23 of nieuwer** nodig (nodejs.org, kies "LTS").

```bash
npm install          # eenmalig
npm run dev          # ontwikkelserver op http://localhost:4321
npm run build        # bouwt de site naar dist/ en controleert titels/descriptions
npm run preview      # bekijk de gebouwde site
npm run lint         # ESLint (incl. toegankelijkheidsregels) + Astro typecheck
```

Lighthouse-check (met `npm run preview` in een tweede venster):

```bash
node scripts/lighthouse.mjs
```

---

## 2. Teksten, prijzen en plaatsen aanpassen

Bijna alles staat in een paar bestanden. Je hoeft geen pagina's te bewerken.

| Wat | Bestand |
| --- | --- |
| Bedrijfsgegevens, telefoon, adres, BTW, openingstijden, reactietijd, socials | `src/config/site.ts` |
| **Aan/uit-knoppen** (reviews, keurmerken, klantlogo's, prijzen, video) | `src/config/site.ts` → `flags` |
| **Glasbewassing: wat jullie doen** (binnen/buiten, woningen/bedrijven, hoogte, methode, extra's, aankondiging, opzeggen) | `src/config/site.ts` → `glasbewassing` |
| **Offerte-calculator** (`/offerte/`): glas per raam (staffel, toeslagen, abonnementskorting), uurtarieven schoonmaak, extra’s | `src/data/prijzen.ts` → `glasPrijzen`, `uurtarieven`, `extraDiensten` |
| **Glazenwasser per plaats** (eigen tekst + FAQ) | `src/data/plaatsen.ts` → `glas` |
| Prijzen ("vanaf"), prijsfactoren, rekenhulp (tarief per m²) | `src/data/prijzen.ts` |
| Diensten: teksten, wat is inbegrepen, checklist, FAQ | `src/data/diensten.ts` |
| Plaatsen: intro, wijken, bedrijventerreinen, FAQ, lokale details | `src/data/plaatsen.ts` |
| FAQ en stappen op de homepage | `src/data/home.ts` |
| Echte reviews | `src/data/reviews.ts` |
| Voor/na-projecten | `src/data/projecten.ts` |
| Blogartikelen | `src/content/kennisbank/*.md` |
| Kleuren, lettertypes, afrondingen, schaduwen | `src/styles/global.css` → `@theme` |

### Placeholders

- `null` in de config wordt op de site getoond als een gele **[INVULLEN]**.
- In teksten kun je `[INVULLEN: uitleg]` laten staan. Die wordt automatisch geel gemarkeerd en weggelaten uit Google-gegevens (schema.org).
- Zoek alles wat nog open staat met: `grep -rn "INVULLEN" src`

### Prijzen invullen

Alle prijzen staan in `src/data/prijzen.ts` en worden getoond **inclusief btw**. Pas daar de vanaf-prijzen (`pakketten`), de uurtarieven en de glasprijzen aan.

De **offerte-calculator** op `/offerte/` rekent alles uit met `src/data/prijzen.ts`: glas per raam met staffel en toeslagen, schoonmaak per uur (`uurtarieven`) en extra’s. De berekening zelf staat in `src/lib/offerte.ts`. Aanvragen komen per e-mail binnen, met de gekozen opties en de prijs in het veld “samenvatting” (zie stap 3).


### Reviews tonen

1. Zet echte reviews (met toestemming, bijv. van je Google-profiel) in `src/data/reviews.ts`.
2. Zet `showReviews: true` in `src/config/site.ts`.

Pas dan verschijnen de reviews op de homepage, en ook de sterren-score (AggregateRating) in Google. **Plaats nooit verzonnen reviews.** Dat is misleidend en kan tot boetes leiden.

### Foto's toevoegen

- Zet foto's in `src/assets/projecten/` (jpg/png; Astro maakt er automatisch AVIF/WebP van in de juiste maten).
- In `src/data/projecten.ts`: `import keukenVoor from '../assets/projecten/keuken-voor.jpg'` en vul `voor: keukenVoor, na: keukenNa` in.
- **Eigenaarsfoto:** vervang `PhotoPlaceholder` op `src/pages/over-ons.astro`.
- **Logo vervangen:** zet het nieuwe bestand op `src/assets/brand/logo-bron.webp` (of .png/.jpg) en draai `node scripts/logo.mjs` en `node scripts/og-image.mjs`. Het script snijdt de witte rand weg, maakt de achtergrond transparant en maakt de favicons.
- **Animaties:** staan in `src/styles/motion.css` en `src/scripts/motion.ts`. Bezoekers met "minder beweging" in hun systeeminstellingen zien alles zonder animatie.
- **OG-afbeelding** (het plaatje bij het delen via WhatsApp/LinkedIn): `public/og-default.png` (1200×630). Opnieuw genereren kan met `node scripts/og-image.mjs`.

### Video

Zet een korte verticale MP4 in `public/video/`, bijvoorbeeld `public/video/intro.mp4`, en ondertitels in `public/video/intro.nl.vtt`. Geef het pad mee aan `<VerticalVideo src="/video/intro.mp4" poster="/video/intro.jpg" />` op de homepage (`src/pages/index.astro`) en op `src/pages/projecten.astro`.

### Nieuwe plaats toevoegen

Voeg een blok toe in `src/data/plaatsen.ts` (kopieer een bestaande). Schrijf **eigen tekst en eigen FAQ's** per plaats: Google waardeert pagina's die alleen de plaatsnaam verwisselen niet. De pagina, het menu in de footer, de sitemap en schema.org worden automatisch bijgewerkt.

### Nieuw blogartikel

Maak een nieuw `.md`-bestand in `src/content/kennisbank/` met dezelfde kop (frontmatter) als de bestaande artikelen. `title` mag maximaal 60 tekens zijn, `description` maximaal 155.

---

## 3. Formulieren (Web3Forms, per e-mail)

Er zijn twee formulieren: de **offerte-calculator** (`/offerte/`) en het **contactformulier** (`/contact/`). Beide sturen de aanvraag via **Web3Forms** naar je e-mail. Er is geen database, en de aanvraag staat dus in je mailbox.

1. Ga naar **web3forms.com**, vul `info@fdschoonmaakbedrijf.nl` in en klik op **Create Access Key**. De sleutel komt per e-mail.
2. Zet de sleutel in Vercel: **Project → Settings → Environment Variables** → naam `PUBLIC_WEB3FORMS_KEY`, waarde = je sleutel (voor Production, Preview en Development).
3. **Redeploy** (Deployments → ⋯ → Redeploy), want de sleutel wordt tijdens het bouwen in de site gezet.
4. Doe een testaanvraag op de live site. Na verzenden kom je op `/bedankt/` en krijg je een mail.

Lokaal testen: kopieer `.env.example` naar `.env` en zet daar de sleutel in.

Wat de formulieren doen:
- **Spamfilter:** een verborgen honeypot-veld (`botcheck`) plus het spamfilter van Web3Forms.
- **Telefoon óf e-mail:** één van de twee is verplicht.
- **Foto’s:** die sturen klanten via WhatsApp (foto-upload kost bij formulierdiensten geld).
- **Bronregistratie:** verborgen velden met `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, de eerste landingspagina en de verwijzer. Gebruik UTM’s in je advertenties en posts, bijvoorbeeld `?utm_source=instagram&utm_campaign=glas`.
- Zonder sleutel zegt het formulier netjes “app of bel ons”.

> Gratis Web3Forms heeft een maandelijkse limiet op het aantal inzendingen (zie hun site). WhatsApp en telefoon blijven altijd werken.

---

## 4. Online zetten op Vercel

De code staat op GitHub: `hamzafroukh32-hue/F-D-Schoonmaak`.

1. Ga naar **vercel.com**, log in met je GitHub-account en klik op **Add New → Project**.
2. Kies de repo **F-D-Schoonmaak** en klik op **Import**. Vercel herkent Astro zelf (instellingen staan in `vercel.json`).
3. Voeg bij **Environment Variables** `PUBLIC_WEB3FORMS_KEY` toe (zie stap 3) en klik op **Deploy**.
4. **Domein koppelen:** Project → Settings → **Domains** → voeg `www.fdschoonmaakbedrijf.nl` en `fdschoonmaakbedrijf.nl` toe. Vercel laat zien welke DNS-records je bij je domeinregistrar moet zetten, en stuurt het kale domein automatisch door naar www. HTTPS gaat vanzelf.
5. **Elke wijziging** die naar GitHub wordt gepusht, zet Vercel binnen een minuut automatisch online. Ging er iets mis? Deployments → kies een eerdere versie → **Promote to Production**.

> Wil je een ander domein? Pas het aan in **twee** plekken: `astro.config.mjs` (`SITE_URL`) en `src/config/site.ts` (`url`), plus de sitemap-regel in `public/robots.txt`.

---

## 5. Analytics aanzetten (optioneel, zonder cookiebanner)

In `src/config/site.ts` → `analytics`:

- **Plausible:** `provider: 'plausible'` en `plausibleDomain: 'fdschoonmaakbedrijf.nl'` (account op plausible.io, betaald).
- **Umami:** `provider: 'umami'`, `umamiSrc` en `umamiWebsiteId` uit je Umami-dashboard (cloud.umami.is heeft een gratis plan).

De privacyverklaring past de tekst over analytics automatisch aan. Gebruik **geen** Google Analytics of Meta Pixel zonder cookiebanner.

---

## 6. Google Business Profile en Search Console

**Google Business Profile** (het belangrijkst voor lokale zoekresultaten en Maps):
1. Ga naar business.google.com en maak een profiel voor "F&D Schoonmaak".
2. Categorie: *Schoonmaakbedrijf* (cleaning service). Voeg je werkgebied toe (de 7 plaatsen). Overweeg om je adres te verbergen als je niet op locatie ontvangt.
3. Vul **exact dezelfde** naam, telefoon en website in als op de site (NAP-consistentie).
4. Voeg eigen foto's toe en vraag tevreden klanten om een review. Zet die reviews daarna (met toestemming) in `src/data/reviews.ts`.

**Google Search Console:**
1. Ga naar search.google.com/search-console → **Domein toevoegen** → `fdschoonmaakbedrijf.nl`, en verifieer via een DNS-record.
2. Ga naar **Sitemaps** en dien `https://www.fdschoonmaakbedrijf.nl/sitemap-index.xml` in.
3. Controleer onder **Verbeteringen** of de gestructureerde gegevens (FAQ, broodkruimels) goed worden gelezen. Je kunt pagina's ook testen op search.google.com/test/rich-results.

---

## 7. Projectstructuur

```
src/
  config/site.ts          bedrijfsgegevens + flags
  data/                   diensten, plaatsen, prijzen, reviews, projecten, home
  content/kennisbank/     blogartikelen (Markdown)
  components/             header, sticky mobiele balk, formulier, slider, rekenhulp, FAQ ...
  layouts/                BaseLayout (SEO, schema.org, header/footer), LegalLayout
  lib/                    schema.org-builders, placeholder-helpers
  pages/                  routes (diensten/[slug], werkgebied/[plaats], kennisbank/[slug] ...)
  styles/global.css       design tokens (@theme)
public/                   favicon, og-default.png, robots.txt, _headers
scripts/                  check-seo.mjs (draait na elke build), lighthouse.mjs, og-image.mjs
```
