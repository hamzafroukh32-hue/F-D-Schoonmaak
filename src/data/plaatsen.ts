/**
 * Service area. Each entry renders /werkgebied/[slug]/ with unique content.
 * `wijken` and `bedrijventerreinen` are geographic names for orientation — please verify.
 */
import type { Faq } from './types';

export interface Plaats {
  slug: string;
  naam: string;
  title: string; // pattern: "Schoonmaakbedrijf [plaats] | F&D Schoonmaak"
  description: string;
  intro: string[];
  wijken: string[];
  bedrijventerreinen: string[];
  focus: string[]; // service slugs to highlight first on this page
  glas: { description: string; intro: string[]; faq: Faq }; // "Glazenwasser [plaats]"
  faq: Faq[];
}

export const plaatsen: Plaats[] = [
  {
    slug: 'enschede',
    naam: 'Enschede',
    title: 'Schoonmaakbedrijf Enschede | F&D Schoonmaak',
    description:
      'Schoonmaakbedrijf in Enschede voor praktijken, kantoren, VvE’s en eindschoonmaak. Vaste prijs vooraf en snel antwoord via WhatsApp.',
    intro: [
      'Enschede is de grootste stad van Twente, met veel praktijken, kleine kantoren en appartementencomplexen. Precies de klanten waar wij ons op richten.',
      'Van een fysiopraktijk in de wijk tot een kantoor bij de universiteit: u krijgt een vaste prijs vooraf en een aanspreekpunt dat snel reageert.',
      'Woon je in Enschede en ga je verhuizen? Ook voor een eindschoonmaak van je huurwoning of studentenkamer kun je bij ons terecht.',
    ],
    wijken: ['Centrum', 'Roombeek', 'Boddenkamp', 'Stroinkslanden', 'Wesselerbrink', 'Deppenbroek', 'Pathmos', 'Hogeland'],
    bedrijventerreinen: ['Kennispark Twente', 'Marssteden', 'Haven-Noord'],
    focus: ['praktijkschoonmaak', 'kantoorschoonmaak', 'eindschoonmaak-diepteschoonmaak'],
    glas: {
      description:
        'Glazenwasser in Enschede voor woningen, appartementen, kantoren en praktijken. Vaste prijs vooraf en een abonnement elke 4, 6 of 8 weken.',
      intro: [
        'Van een rijtjeshuis in Stroinkslanden tot een appartement in het centrum of een praktijk in Roombeek: wij wassen ramen in heel Enschede.',
        'Kies een losse beurt of laat ons elke 4, 6 of 8 weken langskomen. Een studentenkamer opleveren? Dan nemen we de ramen mee in de eindschoonmaak.',
      ],
      faq: { vraag: 'Wassen jullie ook ramen van appartementen in Enschede?', antwoord: 'Ja, ook op hogere verdiepingen. Stuur een foto van je gebouw, dan weet je snel of het kan en wat het kost.' },
    },
    faq: [
      {
        vraag: 'Doen jullie ook een eindschoonmaak van een studentenkamer in Enschede?',
        antwoord: 'Ja. Stuur ons een paar foto’s van je kamer en de gedeelde ruimtes die je moet opleveren. Je krijgt een vaste prijs vooraf.',
      },
      {
        vraag: 'Werken jullie ook op Kennispark of andere bedrijventerreinen in Enschede?',
        antwoord: 'Ja, we komen naar kantoren en praktijken in heel Enschede. Laat ons weten waar uw pand is en hoe groot het is.',
      },
    ],
  },
  {
    slug: 'hengelo',
    naam: 'Hengelo',
    title: 'Schoonmaakbedrijf Hengelo | F&D Schoonmaak',
    description:
      'Kantoor of praktijk schoonmaken in Hengelo? F&D Schoonmaak geeft een vaste prijs vooraf en reageert snel. Ook VvE en eindschoonmaak.',
    intro: [
      'Hengelo heeft een mix van bedrijventerreinen, winkelgebieden en woonwijken. Veel kleine kantoren en praktijken zoeken een schoonmaker die gewoon komt opdagen en bereikbaar is.',
      'Dat is wat wij bieden: een vaste dag, een vaste prijs per beurt, en bij vragen een appje dat snel beantwoord wordt.',
    ],
    wijken: ['Centrum', 'Hasseler Es', 'Woolde', 'Groot Driene', 'Berflo Es', 'Hengelo-Noord', 'Tuindorp ’t Lansink'],
    bedrijventerreinen: ['Westermaat', 'Hasselo', 'Twentekanaal'],
    focus: ['kantoorschoonmaak', 'praktijkschoonmaak', 'vve-trappenhuis-schoonmaak'],
    glas: {
      description:
        'Glazenwasser in Hengelo voor woningen, winkels, kantoren en praktijken. Streeploze ramen, vaste prijs per beurt, elke 4, 6 of 8 weken.',
      intro: [
        'In Hengelo wassen we ramen van woningen in wijken als Woolde, Hasseler Es en Groot Driene, en van bedrijfspanden en winkels.',
        'Voor bedrijven combineren we glasbewassing met de vaste schoonmaak: één aanspreekpunt, één ronde.',
      ],
      faq: { vraag: 'Kunnen jullie de etalage van mijn winkel in Hengelo wassen?', antwoord: 'Ja. Etalages en entrees kunnen we vaker doen dan de rest van het pand, bijvoorbeeld elke 4 weken. U krijgt een vaste prijs per beurt.' },
    },
    faq: [
      {
        vraag: 'Kunnen jullie een bedrijfsunit met kantoor en kantine in Hengelo schoonmaken?',
        antwoord: 'Ja. We maken het kantoorgedeelte, de kantine en het sanitair schoon. De werkplaats of hal spreken we apart af.',
      },
      {
        vraag: 'Hoe snel kunnen jullie starten in Hengelo?',
        antwoord: 'Dat hangt af van de planning. Na een korte opname of een paar foto’s krijgt u een prijs en een voorstel voor de startdatum.',
      },
    ],
  },
  {
    slug: 'oldenzaal',
    naam: 'Oldenzaal',
    title: 'Schoonmaakbedrijf Oldenzaal | F&D Schoonmaak',
    description:
      'F&D Schoonmaak is gevestigd in Oldenzaal. Schoonmaak voor praktijken, kantoren, VvE’s en eindschoonmaak. Vaste prijs vooraf, kort bij u in de buurt.',
    intro: [
      'Oldenzaal is onze thuisbasis. We zijn gevestigd aan Het Nardusboer, dus voor klanten in Oldenzaal zitten we letterlijk om de hoek.',
      'Dat maakt het makkelijk om even langs te komen voor een opname, of om snel iets op te lossen als er een keer iets extra’s nodig is.',
    ],
    wijken: ['Centrum', 'Graven Es', 'Zuidberg', 'De Thij', 'Stakenbeek', 'Bentelerhoek'],
    bedrijventerreinen: ['Eekte', 'Zuid-Berghuizen'],
    focus: ['praktijkschoonmaak', 'kantoorschoonmaak', 'eindschoonmaak-diepteschoonmaak'],
    glas: {
      description:
        'Glazenwasser in Oldenzaal, gevestigd in de stad zelf. Ramen wassen voor woningen en bedrijven, los of met een abonnement elke 4, 6 of 8 weken.',
      intro: [
        'Als glazenwasser in Oldenzaal zitten we om de hoek: we zijn gevestigd aan Het Nardusboer.',
        'Daardoor kunnen we snel schakelen, ook als je tussendoor een extra beurt wilt, bijvoorbeeld voor een feestje of de verkoopfoto’s van je huis.',
      ],
      faq: { vraag: 'Kunnen jullie snel een extra beurt doen in Oldenzaal?', antwoord: 'Vaak wel, omdat we in Oldenzaal zelf zitten. App ons de datum, dan hoor je snel of het past.' },
    },
    faq: [
      {
        vraag: 'Zitten jullie echt in Oldenzaal?',
        antwoord: 'Ja. Ons adres is Het Nardusboer 159 in Oldenzaal. U kunt ons bellen of appen op +31 6 41290420.',
      },
      {
        vraag: 'Kunnen jullie langskomen voor een opname in Oldenzaal?',
        antwoord: 'Ja. Spreek een moment af via WhatsApp of telefoon, dan kijken we samen naar de ruimte.',
      },
      {
        vraag: 'Doen jullie ook de wijken en buurtschappen rond Oldenzaal?',
        antwoord: 'Ja, ook de buitengebieden rond Oldenzaal. Laat ons weten waar u zit.',
      },
    ],
  },
  {
    slug: 'almelo',
    naam: 'Almelo',
    title: 'Schoonmaakbedrijf Almelo | F&D Schoonmaak',
    description:
      'Schoonmaakbedrijf voor Almelo: kantoren, praktijken, VvE-trappenhuizen en eindschoonmaak. Vaste prijs vooraf en één vast aanspreekpunt.',
    intro: [
      'In Almelo helpen we kantoren, praktijken en VvE’s die een betrouwbare schoonmaker zoeken zonder ingewikkeld contract.',
      'U krijgt een prijs vooraf, een vaste dag en één aanspreekpunt. Bij een VvE sturen we het bestuur een melding met foto als ons iets opvalt in het gebouw.',
    ],
    wijken: ['Centrum', 'Nieuwstraatkwartier', 'Schelfhorst', 'Windmolenbroek', 'De Riet', 'Aalderinkshoek', 'Ossenkoppelerhoek'],
    bedrijventerreinen: ['Twentepoort', 'XL Businesspark Twente'],
    focus: ['vve-trappenhuis-schoonmaak', 'kantoorschoonmaak', 'praktijkschoonmaak'],
    glas: {
      description:
        'Glazenwasser in Almelo voor woningen, VvE’s en bedrijfspanden. Vaste prijs vooraf en een vaste ronde elke 4, 6 of 8 weken.',
      intro: [
        'In Almelo wassen we ramen van woningen, appartementencomplexen en bedrijfspanden.',
        'Voor VvE’s nemen we de ramen van entree en trappenhuis mee in de vaste trappenhuisschoonmaak, zodat het hele gebouw er verzorgd uitziet.',
      ],
      faq: { vraag: 'Doen jullie de gemeenschappelijke ramen van een VvE in Almelo?', antwoord: 'Ja. Entree, trappenhuis en galerijramen kunnen we meenemen in een vaste ronde. Het bestuur krijgt één vaste prijs per beurt.' },
    },
    faq: [
      {
        vraag: 'Doen jullie trappenhuizen van appartementencomplexen in Almelo?',
        antwoord: 'Ja. We maken trappen, hallen en entrees schoon op een vaste dag en melden gebreken aan het bestuur of de beheerder.',
      },
      {
        vraag: 'Kan ik een offerte krijgen zonder dat jullie langskomen?',
        antwoord: 'Vaak wel. Met een paar foto’s en het aantal m² kunnen we meestal al een prijs geven. Voor grotere ruimtes komen we liever even kijken.',
      },
    ],
  },
  {
    slug: 'borne',
    naam: 'Borne',
    title: 'Schoonmaakbedrijf Borne | F&D Schoonmaak',
    description:
      'Schoonmaak in Borne, Zenderen en Hertme. Voor praktijken, kleine kantoren, VvE’s en eindschoonmaak. Vaste prijs vooraf en snel antwoord.',
    intro: [
      'Borne ligt tussen Hengelo en Almelo in en heeft naast het centrum ook de kernen Zenderen en Hertme. We werken in de hele gemeente.',
      'Voor een kleine praktijk of een kantoor aan huis is een groot schoonmaakbedrijf vaak te log. Bij ons regelt u het met één appje.',
    ],
    wijken: ['Centrum', 'Bornsche Maten', 'Stroom Esch', 'Zenderen', 'Hertme'],
    bedrijventerreinen: ['Molenkamp'],
    focus: ['praktijkschoonmaak', 'kantoorschoonmaak', 'eindschoonmaak-diepteschoonmaak'],
    glas: {
      description:
        'Glazenwasser in Borne, Zenderen en Hertme. Ramen wassen voor woningen en kleine bedrijven, met een vaste prijs en abonnement elke 4, 6 of 8 weken.',
      intro: [
        'In Borne, Zenderen en Hertme wassen we ramen van woningen en kleine bedrijfspanden.',
        'Een abonnement elke 6 of 8 weken is een makkelijke manier om je ramen het hele jaar schoon te houden, zonder dat je er zelf aan hoeft te denken.',
      ],
      faq: { vraag: 'Komt de glazenwasser ook in Zenderen en Hertme?', antwoord: 'Ja, we werken in de hele gemeente Borne.' },
    },
    faq: [
      {
        vraag: 'Komen jullie ook in Zenderen en Hertme?',
        antwoord: 'Ja. We werken in de hele gemeente Borne, inclusief Zenderen en Hertme.',
      },
      {
        vraag: 'Is er een minimale oppervlakte voor kantoorschoonmaak?',
        antwoord: 'Nee, ook kleine kantoren zijn welkom. Laat ons weten hoe groot de ruimte is en hoe vaak u schoonmaak wilt.',
      },
    ],
  },
  {
    slug: 'haaksbergen',
    naam: 'Haaksbergen',
    title: 'Schoonmaakbedrijf Haaksbergen | F&D Schoonmaak',
    description:
      'Schoonmaak in Haaksbergen, Buurse en Sint Isidorushoeve. Voor praktijken, kantoren, VvE’s, eindschoonmaak en vakantiewoningen. Vaste prijs vooraf.',
    intro: [
      'In Haaksbergen en de kernen Buurse en Sint Isidorushoeve werken we voor praktijken, kleine kantoren en particulieren.',
      'Heb je een vakantiewoning of B&B in de omgeving? Dan regelen we ook de wisselschoonmaak tussen twee gasten.',
    ],
    wijken: ['Centrum', 'Buurse', 'Sint Isidorushoeve'],
    bedrijventerreinen: [],
    focus: ['praktijkschoonmaak', 'airbnb-wisselschoonmaak', 'eindschoonmaak-diepteschoonmaak'],
    glas: {
      description:
        'Glazenwasser in Haaksbergen, Buurse en Sint Isidorushoeve. Ramen wassen voor woningen, vakantiewoningen en bedrijven. Vaste prijs vooraf.',
      intro: [
        'In Haaksbergen, Buurse en Sint Isidorushoeve wassen we ramen van woningen, vakantiewoningen en bedrijfspanden.',
        'Verhuur je een vakantiewoning? Dan plannen we de ramen in tussen twee gasten, zodat ze aankomen met helder zicht naar buiten.',
      ],
      faq: { vraag: 'Kunnen jullie de ramen van mijn vakantiewoning meenemen?', antwoord: 'Ja. We plannen de ramen in tussen twee gasten, samen met de wisselschoonmaak of los.' },
    },
    faq: [
      {
        vraag: 'Doen jullie wisselschoonmaak voor vakantiewoningen rond Haaksbergen?',
        antwoord: 'Ja. Je deelt de planning, wij maken schoon tussen de gasten en sturen een berichtje als het klaar is.',
      },
      {
        vraag: 'Komen jullie ook in Buurse en Sint Isidorushoeve?',
        antwoord: 'Ja, we werken in de hele gemeente Haaksbergen.',
      },
    ],
  },
  {
    slug: 'hof-van-twente',
    naam: 'Hof van Twente',
    title: 'Schoonmaakbedrijf Hof van Twente | F&D Schoonmaak',
    description:
      'Schoonmaak in Goor, Delden, Markelo en Diepenheim. Voor praktijken, kantoren, VvE’s, eindschoonmaak en vakantiewoningen in Hof van Twente.',
    intro: [
      'Hof van Twente bestaat uit verschillende kernen, zoals Goor, Delden, Markelo en Diepenheim. Een groene gemeente met veel kleine ondernemers en vakantiewoningen.',
      'Wij werken in alle kernen. Voor praktijken en kantoren met een vaste schoonmaakdag, en voor verhuurders van vakantiewoningen met wisselschoonmaak.',
    ],
    wijken: ['Goor', 'Delden', 'Markelo', 'Diepenheim', 'Bentelo', 'Hengevelde', 'Ambt Delden'],
    bedrijventerreinen: [],
    focus: ['airbnb-wisselschoonmaak', 'praktijkschoonmaak', 'kantoorschoonmaak'],
    glas: {
      description:
        'Glazenwasser in Goor, Delden, Markelo en Diepenheim. Ramen wassen voor woningen en bedrijven in Hof van Twente, met vaste prijs vooraf.',
      intro: [
        'In Goor, Delden, Markelo, Diepenheim en de andere kernen van Hof van Twente wassen we ramen van woningen en bedrijven.',
        'Een vrijstaande woning met veel glas of een serre? Stuur een paar foto’s, dan krijg je een vaste prijs voordat we komen.',
      ],
      faq: { vraag: 'Wassen jullie ook serres en veel glas bij vrijstaande woningen?', antwoord: 'Ja. Stuur een paar foto’s, dan zie je vooraf wat het kost.' },
    },
    faq: [
      {
        vraag: 'In welke kernen van Hof van Twente werken jullie?',
        antwoord: 'In alle kernen, waaronder Goor, Delden, Markelo, Diepenheim, Bentelo en Hengevelde.',
      },
      {
        vraag: 'Doen jullie schoonmaak van vakantiewoningen in Hof van Twente?',
        antwoord: 'Ja, wisselschoonmaak tussen gasten in en een grondige beurt aan het begin of einde van het seizoen.',
      },
    ],
  },
];

export const getPlaats = (slug: string) => plaatsen.find((p) => p.slug === slug);
