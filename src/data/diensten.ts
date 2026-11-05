/**
 * Service pages. Each entry renders /diensten/[slug]/.
 * Tone: 'u' for business pages, 'je' for private customers.
 * Keep title ≤ 60 chars and description ≤ 155 chars (checked at build).
 */
import type { Faq } from './types';
import { glasExtras, glasZijden } from '../lib/glas';

export interface Dienst {
  slug: string;
  kort: string; // nav / card label
  icon: 'praktijk' | 'kantoor' | 'vve' | 'woning' | 'airbnb' | 'glas';
  doelgroep: 'zakelijk' | 'particulier';
  aanspreek: 'u' | 'je';
  title: string;
  description: string;
  h1: string;
  intro: string[];
  kaartTekst: string;
  voorWie: string[];
  inbegrepen: string[];
  checklist?: { titel: string; intro: string; groepen: { naam: string; items: string[] }[] };
  werkwijze: { titel: string; tekst: string }[];
  faq: Faq[];
  pakketId: string;
  zoekwoordPlaats: string; // anchor text pattern used on place pages, e.g. 'kantoor schoonmaken in'
  formLabel: string; // label in the quote form dropdown
}

export const diensten: Dienst[] = [
  {
    slug: 'glasbewassing-particulier',
    kort: 'Glasbewassing',
    icon: 'glas',
    doelgroep: 'particulier',
    aanspreek: 'je',
    title: 'Glazenwasser voor je woning | F&D Schoonmaak',
    description:
      'Glazenwasser in Twente voor je huis of appartement. Streeploze ramen, vaste prijs vooraf en een abonnement elke 4, 6 of 8 weken.',
    h1: 'Glazenwasser voor je woning',
    intro: [
      'Schone ramen zie je meteen: meer licht, een frissere uitstraling, en jij hoeft niet zelf de ladder op.',
      'Kies een losse beurt of een vaste ronde: dan komen we elke 4, 6 of 8 weken langs. Je prijs zie je meteen in onze offerte-calculator.',
    ],
    kaartTekst: 'Streeploze ramen, los of elke 4, 6 of 8 weken.',
    voorWie: ['Rijtjeshuizen en hoekwoningen', 'Twee-onder-een-kap en vrijstaande woningen', 'Appartementen', 'Bij een verhuizing of oplevering'],
    inbegrepen: [`Ramen wassen. ${glasZijden}`, 'Streeploos met osmosewater, of traditioneel met ladder', 'Alle verdiepingen, ook dakkapel- en dakramen', ...glasExtras],
    werkwijze: [
      { titel: 'Stuur je woningtype of een foto', tekst: 'App ons wat voor woning je hebt, of hoeveel ramen. Een foto van de voor- en achterkant helpt.' },
      { titel: 'Vaste prijs en frequentie', tekst: 'Je krijgt een vaste prijs per beurt. Kies los, of elke 4, 6 of 8 weken met abonnementskorting.' },
      { titel: 'Wij wassen, jij kijkt', tekst: 'We komen op de afgesproken dag. Na afloop zie je het resultaat meteen.' },
    ],
    faq: [
      {
        vraag: 'Hoe vaak moeten je ramen gewassen worden?',
        antwoord:
          'Dat hangt af van je woning en de omgeving. Aan een drukke weg, onder bomen of bij een bouwplaats worden ramen sneller vies. Wij bieden elke 4, 6 of 8 weken aan. In ons artikel lees je hoe je kiest.',
      },
      {
        vraag: 'Wat kost een glazenwasser?',
        antwoord:
          'Dat hangt af van het type woning en het aantal ramen. Op onze prijzenpagina staan de vanaf-prijzen per woningtype en de korting bij een abonnement. Met de rekenhulp zie je meteen een indicatie.',
      },
      {
        vraag: 'Moet ik thuis zijn?',
        antwoord:
          'Voor de buitenkant niet, zolang we bij de ramen kunnen, bijvoorbeeld via een open poort of achterom. Voor de binnenkant spreken we een moment af.',
      },
      {
        vraag: 'Wat gebeurt er als het regent?',
        antwoord:
          'Bij lichte regen kunnen we meestal gewoon werken. Bij harde regen, storm of vorst verzetten we de beurt en sturen we je een appje met een nieuwe dag.',
      },
      {
        vraag: 'Hoe hoog kunnen jullie werken?',
        antwoord: 'We wassen ramen op alle verdiepingen, ook 3 hoog en hoger. Dat doen we met osmosewater aan een telescoopsteel, of traditioneel met een ladder. Lastig bereikbaar? Stuur een foto, dan kijken we wat kan.',
      },
    ],
    pakketId: 'glas-particulier',
    zoekwoordPlaats: 'glazenwasser',
    formLabel: 'Glasbewassing particulier',
  },
  {
    slug: 'glasbewassing-zakelijk',
    kort: 'Glasbewassing zakelijk',
    icon: 'glas',
    doelgroep: 'zakelijk',
    aanspreek: 'u',
    title: 'Glasbewassing zakelijk: kantoor en praktijk | F&D',
    description:
      'Ramen wassen voor kantoren, praktijken, winkels en VvE’s in Twente. Vaste ronde elke 4, 6 of 8 weken en een vaste prijs per beurt.',
    h1: 'Glasbewassing voor kantoren, praktijken en winkels',
    intro: [
      'Uw ramen en entree zijn het eerste wat een klant of patiënt ziet. Wij nemen het u uit handen met een vaste ronde en een vaste prijs per beurt.',
      'Combineer het met uw vaste schoonmaak, dan heeft u één aanspreekpunt voor alles.',
    ],
    kaartTekst: 'Kantoor, praktijk, winkel of VvE. Vaste ronde, vaste prijs.',
    voorWie: ['Kantoren', 'Tandarts-, huisarts- en fysiopraktijken', 'Winkels en showrooms', 'VvE’s: entrees, trappenhuizen en gemeenschappelijke ramen'],
    inbegrepen: [`Ramen wassen. ${glasZijden}`, 'Etalages en glazen entreedeuren', 'Streeploos met osmosewater, of traditioneel met ladder', 'Alle verdiepingen, ook 3 hoog en hoger', ...glasExtras],
    werkwijze: [
      { titel: 'Foto’s of opname', tekst: 'Stuur foto’s van de gevel, of we komen even kijken. U krijgt een vaste prijs per beurt.' },
      { titel: 'Vaste ronde', tekst: 'Elke 4, 6 of 8 weken. Etalage en entree kunnen vaker dan de rest.' },
      { titel: 'Op een tijd die past', tekst: 'Voor of na openingstijd, of tijdens als dat niet stoort. Dat spreken we vooraf af.' },
    ],
    faq: [
      {
        vraag: 'Wat kost glasbewassing voor een bedrijf?',
        antwoord:
          'Dat hangt af van het aantal ramen, de hoogte en hoe goed ze bereikbaar zijn. Op de prijzenpagina staat onze vanaf-prijs. Met een paar foto’s van de gevel krijgt u snel een vaste prijs per beurt.',
      },
      {
        vraag: 'Hoe vaak moeten de ramen van een kantoor of praktijk gewassen worden?',
        antwoord:
          'Etalages en entrees worden het eerst gezien en het snelst vies, dus die vaak vaker dan de rest van het pand. Wij bieden elke 4, 6 of 8 weken aan, en een mix kan ook.',
      },
      {
        vraag: 'Kunnen jullie buiten openingstijden komen?',
        antwoord: 'Bespreek uw gewenste tijden met ons. In de offerte staat precies wanneer we komen.',
      },
      {
        vraag: 'Wat gebeurt er als het regent?',
        antwoord: 'Bij lichte regen werken we meestal gewoon door. Bij harde regen, storm of vorst verzetten we de beurt in overleg naar een andere dag.',
      },
      {
        vraag: 'Kan glasbewassing samen met de schoonmaak?',
        antwoord: 'Ja. Dan heeft u één aanspreekpunt voor de schoonmaak en de ramen.',
      },
      {
        vraag: 'Hoe hoog kunnen jullie werken?',
        antwoord: 'We wassen ramen op alle verdiepingen, ook 3 hoog en hoger, met osmosewater aan een telescoopsteel of traditioneel met een ladder. Is uw pand erg hoog? Neem contact op, dan kijken we samen wat mogelijk is.',
      },
    ],
    pakketId: 'glas-zakelijk',
    zoekwoordPlaats: 'ramen wassen',
    formLabel: 'Glasbewassing zakelijk',
  },
  {
    slug: 'praktijkschoonmaak',
    kort: 'Praktijken',
    icon: 'praktijk',
    doelgroep: 'zakelijk',
    aanspreek: 'u',
    title: 'Schoonmaak tandarts- en huisartspraktijk | F&D',
    description:
      'Schoonmaak voor tandartsen, huisartsen en fysiotherapeuten in Twente. Vaste checklist, vast aanspreekpunt en een prijs vooraf. Vraag een offerte aan.',
    h1: 'Schoonmaak voor tandarts-, huisarts- en fysiopraktijken',
    intro: [
      'In een praktijk ziet elke patiënt hoe schoon het is. De wachtkamer, de balie, het toilet. Daarom werken wij met een vaste checklist die we samen met u opstellen en elke beurt afvinken.',
      'U heeft één aanspreekpunt. Wilt u iets anders? Dan stuurt u een appje en passen we het aan. Zonder ticketsysteem, zonder wisselende gezichten die de weg niet weten.',
    ],
    kaartTekst: 'Tandarts, huisarts, fysio. Vaste checklist en vaste schoonmaker.',
    voorWie: ['Tandartspraktijken', 'Huisartsenpraktijken', 'Fysiotherapie- en oefentherapiepraktijken', 'Andere kleine zorgpraktijken'],
    inbegrepen: [
      'Wachtruimte: stoelen, tafels, deurklinken en lichtschakelaars',
      'Balie en receptie: werkblad, telefoon, pinautomaat (afnemen)',
      'Behandelkamers: vloeren, vrije oppervlakken, wastafels, prullenbakken',
      'Sanitair: toiletten, wastafels, spiegels, aanvullen zeep en papier',
      'Personeelsruimte en pantry',
      'Vloeren: stofzuigen en nat reinigen, passend bij het vloertype',
      'Afvalbakken legen en nieuwe zakken plaatsen (geen medisch afval)',
    ],
    checklist: {
      titel: 'Hygiëne-checklist per beurt',
      intro:
        'Dit is onze basislijst. We stemmen hem af op het hygiëneprotocol van uw praktijk. Wat medisch-specifiek is (zoals instrumenten en medisch afval) blijft bij uw eigen team.',
      groepen: [
        {
          naam: 'Contactpunten',
          items: [
            'Deurklinken en duwplaten',
            'Lichtschakelaars',
            'Trapleuningen',
            'Armleuningen van wachtkamerstoelen',
            'Balieblad en pinautomaat',
          ],
        },
        {
          naam: 'Sanitair',
          items: [
            'Toiletpot, bril en spoelknop',
            'Wastafel en kraan',
            'Zeep- en handdoekdispensers bijvullen',
            'Spiegels streeploos',
            'Vloer rond het toilet nat reinigen',
          ],
        },
        {
          naam: 'Behandelkamers',
          items: [
            'Vloer stofvrij en nat gereinigd',
            'Vrije werkvlakken afnemen (in overleg welke)',
            'Wastafel en kraan',
            'Prullenbakken legen',
          ],
        },
        {
          naam: 'Afsluiting',
          items: [
            'Werkwijze met kleurcodering voor doeken (sanitair apart)',
            'Afvinklijst ingevuld achterlaten of digitaal sturen',
            'Bijzonderheden direct melden via WhatsApp',
          ],
        },
      ],
    },
    werkwijze: [
      { titel: 'Kennismaking', tekst: 'We lopen samen door de praktijk. U vertelt wat belangrijk is en welke ruimtes we niet aanraken.' },
      { titel: 'Checklist en prijs', tekst: 'U krijgt een checklist op maat en een vaste prijs per beurt. Geen verrassingen achteraf.' },
      { titel: 'Vaste tijden', tekst: 'We komen op afgesproken tijden, bijvoorbeeld voor of na het spreekuur.' },
      { titel: 'Korte lijnen', tekst: 'Iets gemist of een wijziging? Eén appje is genoeg.' },
    ],
    faq: [
      {
        vraag: 'Schoonmaken jullie ook tijdens openingstijden van de praktijk?',
        antwoord:
          'Dat spreken we met u af. De meeste praktijken kiezen voor schoonmaak voor of na het spreekuur, zodat patiënten er geen last van hebben. In de offerte staat precies wanneer we komen.',
      },
      {
        vraag: 'Nemen jullie ook medisch afval mee?',
        antwoord:
          'Nee. Medisch en specifiek afval valt onder de afvalregeling van uw praktijk. Wij legen de gewone afvalbakken en plaatsen nieuwe zakken.',
      },
      {
        vraag: 'Kunnen we de checklist aanpassen aan ons eigen protocol?',
        antwoord:
          'Ja, graag zelfs. Stuur ons uw hygiëneprotocol of de punten die voor u belangrijk zijn. We nemen ze op in de checklist en vinken ze elke beurt af.',
      },
      {
        vraag: 'Hoe vaak moet een praktijk schoongemaakt worden?',
        antwoord:
          'Dat hangt af van het aantal patiënten en de soort praktijk. In ons artikel over tandartspraktijken leggen we uit waar u op kunt letten. Samen bepalen we een frequentie die past.',
      },
      {
        vraag: 'Werken er steeds andere schoonmakers in mijn praktijk?',
        antwoord:
          'We streven naar een vast gezicht per praktijk, zodat iemand uw ruimte en uw wensen kent. U heeft daarnaast altijd één vast aanspreekpunt.',
      },
    ],
    pakketId: 'praktijk',
    zoekwoordPlaats: 'praktijk schoonmaken in',
    formLabel: 'Praktijkschoonmaak',
  },
  {
    slug: 'kantoorschoonmaak',
    kort: 'Kantoren',
    icon: 'kantoor',
    doelgroep: 'zakelijk',
    aanspreek: 'u',
    title: 'Kantoorschoonmaak in Twente | F&D Schoonmaak',
    description:
      'Kantoor schoonmaken in Enschede, Hengelo, Oldenzaal en omgeving. Voor kantoren van 100 tot 300 m². Vaste prijs per beurt, snel antwoord.',
    h1: 'Kantoorschoonmaak voor kleine en middelgrote kantoren',
    intro: [
      'Een schoon kantoor merkt niemand op. Een vies kantoor wel. Wij zorgen voor het eerste, op een vaste dag en tijd, zodat u er niet meer aan hoeft te denken.',
      'We richten ons op kantoren van ongeveer 100 tot 300 m². Groot genoeg om professioneel aan te pakken, klein genoeg dat de eigenaar uw naam kent.',
    ],
    kaartTekst: 'Kantoren van 100 tot 300 m². Vaste dag, vaste prijs.',
    voorWie: ['Kleine en middelgrote kantoren', 'Administratie- en advieskantoren', 'Showrooms met kantoorruimte', 'Bedrijfsunits met kantoor en kantine'],
    inbegrepen: [
      'Werkplekken: bureaus afnemen (vrije delen), stoelen en schermen stofvrij',
      'Vloeren stofzuigen en nat reinigen',
      'Toiletten en wastafels reinigen, verbruiksartikelen bijvullen',
      'Pantry en kantine: aanrecht, kranen, koffieautomaat (buitenkant), tafels',
      'Prullenbakken legen',
      'Deurklinken, lichtschakelaars en andere contactpunten',
      'Entree en trappen',
    ],
    werkwijze: [
      { titel: 'Rondgang of foto’s', tekst: 'We komen langs, of u stuurt een paar foto’s en de plattegrond. Zo kunnen we snel een prijs geven.' },
      { titel: 'Werkprogramma', tekst: 'U krijgt een overzicht van wat we per beurt doen, en wat we bijvoorbeeld maandelijks extra doen.' },
      { titel: 'Sleutel en alarm', tekst: 'We maken duidelijke afspraken over sleutelbeheer en het alarm.' },
      { titel: 'Evaluatie', tekst: 'Na de eerste weken bellen we u om te horen of alles naar wens is.' },
    ],
    faq: [
      {
        vraag: 'Wat kost kantoorschoonmaak?',
        antwoord:
          'Dat hangt vooral af van het aantal m², het aantal toiletten en hoe vaak we komen. Op de prijzenpagina staat een indicatie. Voor een vaste prijs stuurt u ons een appje met het aantal m² en een paar foto’s.',
      },
      {
        vraag: 'Kunnen jullie ’s avonds of vroeg in de ochtend schoonmaken?',
        antwoord:
          'Bespreek uw gewenste tijden met ons. In de offerte zetten we precies wanneer we komen, zodat u weet waar u aan toe bent.',
      },
      {
        vraag: 'Moeten wij zelf schoonmaakmiddelen regelen?',
        antwoord: 'Dat spreken we vooraf af. In de offerte staat duidelijk wat wij meenemen en wat eventueel bij u blijft.',
      },
      {
        vraag: 'Is er een minimale contractduur?',
        antwoord: 'De voorwaarden staan in de offerte en in onze algemene voorwaarden. Heeft u een voorkeur? Zeg het gerust, dan kijken we wat mogelijk is.',
      },
      {
        vraag: 'Doen jullie ook grotere kantoorpanden?',
        antwoord: 'We richten ons nu op kantoren tot ongeveer 300 m². Heeft u een groter project? Neem contact op, dan kijken we samen wat haalbaar is.',
      },
    ],
    pakketId: 'kantoor',
    zoekwoordPlaats: 'kantoor schoonmaken in',
    formLabel: 'Kantoorschoonmaak',
  },
  {
    slug: 'vve-trappenhuis-schoonmaak',
    kort: 'VvE / trappenhuis',
    icon: 'vve',
    doelgroep: 'zakelijk',
    aanspreek: 'u',
    title: 'VvE schoonmaak en trappenhuis | F&D Schoonmaak',
    description:
      'Trappenhuis en algemene ruimtes van uw VvE schoon op een vaste dag. Heldere prijs per beurt en één aanspreekpunt in Twente. Vraag een offerte aan.',
    h1: 'VvE-schoonmaak en trappenhuizen',
    intro: [
      'Het trappenhuis is het visitekaartje van het gebouw. Bewoners merken het meteen als het een keer wordt overgeslagen. Daarom komen wij op een vaste dag en laten we zien dat het gedaan is.',
      'Voor het bestuur of de beheerder is het simpel: één prijs per beurt, één aanspreekpunt en een korte melding als ons iets opvalt, zoals een kapotte lamp of rommel in de gang.',
    ],
    kaartTekst: 'Trappenhuizen, hallen en entrees. Vaste dag, korte lijnen.',
    voorWie: ['Verenigingen van Eigenaars (VvE)', 'Beheerders van appartementencomplexen', 'Kleine woningcorporatie-complexen', 'Bedrijfsverzamelgebouwen met gedeelde hal'],
    inbegrepen: [
      'Trappen en bordessen stofzuigen en nat reinigen',
      'Entree en hal, inclusief deurmatten',
      'Leuningen, deurklinken en lichtschakelaars',
      'Brievenbussen en bellentableau afnemen',
      'Liftdeuren en liftcabine (binnenkant)',
      'Glas van de entreedeur binnen',
      'Melding van gebreken of rommel aan het bestuur of de beheerder',
    ],
    werkwijze: [
      { titel: 'Opname', tekst: 'We bekijken het gebouw of u stuurt foto’s van de entree, trappen en verdiepingen.' },
      { titel: 'Vaste prijs per beurt', tekst: 'U krijgt een duidelijke prijs, handig voor de begroting van de VvE.' },
      { titel: 'Vaste dag', tekst: 'Bewoners weten wanneer we komen. Desgewenst hangen we een afvinklijst op.' },
      { titel: 'Meldingen', tekst: 'Valt ons iets op? Dan melden we het met een foto aan het bestuur of de beheerder.' },
    ],
    faq: [
      {
        vraag: 'Hoe vaak moet een trappenhuis schoongemaakt worden?',
        antwoord:
          'Dat hangt af van het aantal woningen en hoe druk het is. Veel VvE’s kiezen voor elke week of elke twee weken. We adviseren u graag na een korte opname.',
      },
      {
        vraag: 'Kunnen bewoners zien wanneer er is schoongemaakt?',
        antwoord: 'Ja, als u dat wilt hangen we een afvinklijst op in de hal. Zo is voor iedereen zichtbaar dat het gedaan is.',
      },
      {
        vraag: 'Ontvangt de VvE een factuur?',
        antwoord: 'Ja. De factuur gaat naar de VvE of de beheerder, zoals u dat wilt.',
      },
      {
        vraag: 'Doen jullie ook de ramen in het trappenhuis?',
        antwoord: 'Glas aan de binnenkant van de entree hoort bij de standaardbeurt. Overige ramen spreken we apart af.',
      },
    ],
    pakketId: 'vve',
    zoekwoordPlaats: 'VvE schoonmaak in',
    formLabel: 'VvE / trappenhuis',
  },
  {
    slug: 'eindschoonmaak-diepteschoonmaak',
    kort: 'Eindschoonmaak',
    icon: 'woning',
    doelgroep: 'particulier',
    aanspreek: 'je',
    title: 'Eindschoonmaak en diepteschoonmaak | F&D Schoonmaak',
    description:
      'Je huurwoning schoon opleveren of je huis grondig laten schoonmaken? Vaste prijs vooraf, ook in Enschede, Hengelo en Oldenzaal. App ons voor een prijs.',
    h1: 'Eindschoonmaak en diepteschoonmaak',
    intro: [
      'Verhuizen is al druk genoeg. Wij maken je oude woning schoon, zodat je met een gerust hart kunt opleveren. Je weet vooraf precies wat het kost.',
      'Geen verhuizing, maar wil je je huis een keer echt grondig laten doen? Dat is een diepteschoonmaak. Dezelfde aanpak, dezelfde vaste prijs vooraf.',
    ],
    kaartTekst: 'Verhuizing of oplevering? Vaste prijs vooraf.',
    voorWie: ['Huurders die hun woning moeten opleveren', 'Verkopers die een woning leeg en schoon willen overdragen', 'Mensen die een nieuwe woning schoon willen betrekken', 'Iedereen die een grondige beurt wil'],
    inbegrepen: [
      'Keuken: kastjes binnen en buiten, aanrecht, kranen, tegelwand, oven en afzuigkap (buitenkant en filter)',
      'Badkamer: tegels, kitranden reinigen, douche, bad, toilet, wastafel en spiegel',
      'Alle vloeren stofzuigen en dweilen',
      'Plinten, deuren, deurposten en lichtschakelaars',
      'Vensterbanken en radiatoren',
      'Ramen aan de binnenkant',
      'Kasten (leeg) binnen en buiten',
    ],
    checklist: {
      titel: 'Wat checkt een verhuurder vaak?',
      intro: 'Elke verhuurder is anders. Vraag altijd zelf na wat er in jouw huurcontract staat. Dit zijn plekken die we standaard meenemen:',
      groepen: [
        { naam: 'Keuken', items: ['Vet op de afzuigkap en het filter', 'Binnenkant van de oven', 'Kastjes en lades', 'Achter en onder het aanrecht'] },
        { naam: 'Badkamer', items: ['Kalk op kranen en tegels', 'Kitranden', 'Afvoerputjes', 'Toilet inclusief de rand'] },
        { naam: 'Overal', items: ['Plinten en deuren', 'Vensterbanken', 'Stopcontacten en schakelaars', 'Vloeren in hoeken'] },
      ],
    },
    werkwijze: [
      { titel: 'Stuur foto’s', tekst: 'App ons een paar foto’s van keuken, badkamer en de kamers, plus het aantal m².' },
      { titel: 'Vaste prijs', tekst: 'Je krijgt een vaste prijs. Die verandert niet achteraf.' },
      { titel: 'Wij maken schoon', tekst: 'Op de afgesproken dag. De woning moet leeg zijn, of we spreken af wat er blijft staan.' },
      { titel: 'Jij checkt', tekst: 'Loop samen met ons of via foto’s na of alles klopt voordat je oplevert.' },
    ],
    faq: [
      {
        vraag: 'Moet de woning leeg zijn?',
        antwoord: 'Voor een eindschoonmaak liefst wel, dan kunnen we overal goed bij. Staat er nog iets? Zeg het vooraf, dan houden we er rekening mee in de prijs.',
      },
      {
        vraag: 'Wat als de verhuurder nog iets ziet?',
        antwoord: 'Laat het ons direct weten met een foto. Dan kijken we samen wat er nodig is en lossen we het op.',
      },
      {
        vraag: 'Hoe snel kunnen jullie komen?',
        antwoord: 'Dat hangt af van de planning. App ons je verhuisdatum, dan hoor je snel of het past.',
      },
      {
        vraag: 'Is de prijs echt vast?',
        antwoord: 'Ja. Je krijgt vooraf een prijs op basis van je foto’s en het aantal m². Die prijs betaal je, tenzij de situatie wezenlijk anders blijkt dan op de foto’s. Dan overleggen we eerst met je.',
      },
      {
        vraag: 'Wat is het verschil tussen eindschoonmaak en diepteschoonmaak?',
        antwoord: 'Een eindschoonmaak doe je bij vertrek uit een (huur)woning. Een diepteschoonmaak is dezelfde grondige beurt, maar dan in een woning waar je blijft wonen.',
      },
    ],
    pakketId: 'eindschoonmaak',
    zoekwoordPlaats: 'eindschoonmaak in',
    formLabel: 'Eindschoonmaak / diepteschoonmaak',
  },
  {
    slug: 'airbnb-wisselschoonmaak',
    kort: 'Airbnb',
    icon: 'airbnb',
    doelgroep: 'particulier',
    aanspreek: 'je',
    title: 'Airbnb-schoonmaak en wisselschoonmaak | F&D Schoonmaak',
    description:
      'Schoonmaak tussen twee gasten voor je Airbnb of vakantiewoning in Twente. Vaste prijs per wissel en snel te bereiken via WhatsApp.',
    h1: 'Airbnb- en wisselschoonmaak',
    intro: [
      'Een goede review begint bij een schone woning. Wij maken je Airbnb, vakantiewoning of short-stay appartement schoon tussen twee gasten in.',
      'Je stuurt de planning, wij zorgen dat het klaar is voordat de volgende gast aankomt. Na elke wissel krijg je een korte melding.',
    ],
    kaartTekst: 'Schoon tussen twee gasten. Vaste prijs per wissel.',
    voorWie: ['Airbnb-hosts', 'Eigenaren van vakantiewoningen en chalets', 'Short-stay appartementen', 'B&B’s met een paar kamers'],
    inbegrepen: [
      'Keuken en servies controleren, aanrecht en apparaten afnemen',
      'Badkamer en toilet volledig reinigen',
      'Vloeren stofzuigen en dweilen',
      'Bedden opmaken met jouw schone linnengoed',
      'Afval weggooien',
      'Korte melding na elke wissel, met foto’s als je dat wilt',
      'Melding van schade of iets dat ontbreekt',
    ],
    werkwijze: [
      { titel: 'Planning delen', tekst: 'Je deelt je boekingen of stuurt de data via WhatsApp.' },
      { titel: 'Sleutel', tekst: 'We spreken af hoe we binnenkomen: sleutelkluis, code of afgifte.' },
      { titel: 'Wissel', tekst: 'We maken schoon en zetten alles klaar volgens jouw lijst.' },
      { titel: 'Melding', tekst: 'Je krijgt een berichtje als het klaar is.' },
    ],
    faq: [
      {
        vraag: 'Regelen jullie ook het linnengoed?',
        antwoord: 'We maken de bedden op met jouw schone linnengoed. Zorg dat er genoeg schone sets klaarliggen.',
      },
      {
        vraag: 'Wat als een gast laat vertrekt of vroeg aankomt?',
        antwoord: 'App ons zo snel mogelijk. We kijken dan wat er past in de planning.',
      },
      {
        vraag: 'Melden jullie schade?',
        antwoord: 'Ja. Zien we schade, vlekken of iets dat ontbreekt, dan sturen we je direct een foto. Handig als je iets bij de gast wilt melden.',
      },
      {
        vraag: 'Kan ik een vaste prijs per wissel krijgen?',
        antwoord: 'Ja. Op basis van het aantal slaapkamers en badkamers krijg je een vaste prijs per wissel.',
      },
    ],
    pakketId: 'airbnb',
    zoekwoordPlaats: 'Airbnb schoonmaak in',
    formLabel: 'Airbnb / wisselschoonmaak',
  },
];

/** All services are always visible. Kept as a separate name for readability at call sites. */
export const actieveDiensten = diensten;

export const isGlas = (d: Pick<Dienst, 'slug'>) => d.slug.startsWith('glasbewassing');

export const getDienst = (slug: string) => actieveDiensten.find((d) => d.slug === slug);
