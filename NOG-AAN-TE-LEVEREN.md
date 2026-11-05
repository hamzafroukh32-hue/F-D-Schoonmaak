# Nog aan te leveren / te controleren

De site bevat geen zichtbare `[INVULLEN]`-plekken meer. Ontbrekende gegevens worden nu gewoon niet getoond, en verschijnen vanzelf zodra je ze invult.

## A. Gegevens die je kunt aanleveren (verschijnen dan vanzelf)

| Wat | Waar het komt | Bestand |
| --- | --- | --- |
| Postcode van Het Nardusboer 159 | Footer, contact, privacyverklaring, Google-gegevens | `src/config/site.ts` → `address.postalCode` |
| Btw-nummer | Footer, Over ons, privacyverklaring | `src/config/site.ts` → `legal.btw` |
| Naam van de eigenaar (+ korte tekst over jezelf) | Over ons | `src/config/site.ts` → `owner.name` + `src/pages/over-ons.astro` |
| Aansprakelijkheidsverzekering (naam verzekeraar) | Over ons | `src/config/site.ts` → `trust.insurance` |
| VOG (ja/nee) | Over ons | `src/config/site.ts` → `trust.vog` |
| Keurmerk / VCA (alleen als behaald) | Over ons | `src/config/site.ts` → `trust.keurmerk` + `flags.showCertifications` |
| Instagram / TikTok / Facebook / LinkedIn | Footer | `src/config/site.ts` → `social` |
| Echte Google-reviews | Homepage + sterren in Google | `src/data/reviews.ts` + `flags.showReviews` |
| Meer voor/na-foto’s, vooral van **ramen** (dan verschijnt ook het filter “Glas”) | Homepage + /projecten/ | `src/data/projecten.ts` + `src/assets/projecten/` |
| Foto van de eigenaar | Over ons | vervang het logo-blok in `src/pages/over-ons.astro` |

## B. Ingevuld met een gangbare standaard: graag controleren

**Algemene voorwaarden**
- offerte 30 dagen geldig
- prijswijziging jaarlijks per 1 januari, een maand vooraf gemeld
- klachten binnen 48 uur, daarna kosteloos terugkomen
- annuleren tot 24 uur vooraf kosteloos
- opzegtermijn een maand
- betalen binnen 14 dagen
- schade melden binnen 48 uur
- aansprakelijkheid tot het factuurbedrag

Laat de voorwaarden juridisch controleren.

**Privacyverklaring**
- aanvragen zonder opdracht 12 maanden bewaren
- klantgegevens tot 2 jaar na het klantschap
- facturen 7 jaar bewaren
- accounts beveiligd met sterke wachtwoorden en tweestapsverificatie

Laat ook de privacyverklaring juridisch controleren.

**Glasbewassing**
- buitenkant (voor, achter of rondom)
- alle verdiepingen
- osmosewater aan een telescoopsteel of traditioneel met ladder
- extra’s: dakkapel, zonnepanelen, dakgoot, serre

**Vacatures**
- “salaris, uren en contract bespreken we in een gesprek”
- “de eerste keren ga je mee met iemand die het werk kent”

**Over ons**
- “begonnen in Oldenzaal, met één doel: schoonmaak en glasbewassing zoals je het zelf zou willen”

**Airbnb**
- “zorg dat er genoeg schone sets linnengoed klaarliggen” (wij bieden dus geen linnenservice)

## B2. Foto’s en video’s (geplaatst op 5 november 2026)

- 5 voor/na-paren (keuken, kookplaat, koelkast, badkamer, gang) en 7 video’s staan online. Ze zijn bijgesneden, de video’s zijn verkleind en zonder geluid.
- **Toestemming:** heb je van de klanten toestemming om foto’s van hun woning te plaatsen? Er staan geen namen of adressen op.
- **Video “douchewand”:** daarin is iemand van het team herkenbaar in beeld. Is die persoon akkoord?

## C. Prijzen (staan in `src/data/prijzen.ts`)

- Glas per raam (staffel €3,00 / €2,50 / €2,00), minimaal €10
- Toeslagen en abonnementskorting (10% / 5% / 2,5%)
- Schoonmaak €35 per uur, diepte- of eindschoonmaak €50 per uur, **minimaal 2 uur (aanname)**
- Alle prijzen worden getoond **inclusief 21% btw**, ook voor bedrijven. Klopt dat?

## D. Te controleren werkgebied

- De wijken en bedrijventerreinen per plaats in `src/data/plaatsen.ts`. Haal weg wat niet klopt.

## E. Livegang (Vercel)

- [ ] Vercel-project aanmaken vanuit de GitHub-repo (README, stap 4)
- [ ] Web3Forms-sleutel aanvragen en als `PUBLIC_WEB3FORMS_KEY` in Vercel zetten, daarna redeployen (README, stap 3)
- [ ] Testaanvraag doen via `/offerte/` en `/contact/`, en controleren of de mail binnenkomt
- [ ] Domein `fdschoonmaakbedrijf.nl` koppelen in Vercel
- [ ] Google Business Profile aanmaken (zelfde naam, telefoon en website)
- [ ] Search Console: domein verifiëren en sitemap indienen
