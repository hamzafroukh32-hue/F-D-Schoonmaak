/**
 * Before/after projects. Photos live in src/assets/projecten/ (same 3:4 crop for before and after).
 * Only publish photos with the client's permission and without recognisable personal data
 * (no faces, names, documents, house numbers or licence plates).
 */
import type { ImageMetadata } from 'astro';
import keukenVoor from '../assets/projecten/keuken-voor.jpg';
import keukenNa from '../assets/projecten/keuken-na.jpg';
import kookplaatVoor from '../assets/projecten/kookplaat-voor.jpg';
import kookplaatNa from '../assets/projecten/kookplaat-na.jpg';
import koelkastVoor from '../assets/projecten/koelkast-voor.jpg';
import koelkastNa from '../assets/projecten/koelkast-na.jpg';
import badkamerVoor from '../assets/projecten/badkamer-voor.jpg';
import badkamerNa from '../assets/projecten/badkamer-na.jpg';
import gangVoor from '../assets/projecten/gang-voor.jpg';
import gangNa from '../assets/projecten/gang-na.jpg';

export const projectCategorieen = [
  { id: 'keuken', label: 'Keuken' },
  { id: 'badkamer', label: 'Badkamer' },
  { id: 'kamers', label: 'Gang' },
  { id: 'glas', label: 'Glas' },
] as const;

export type ProjectCategorie = (typeof projectCategorieen)[number]['id'];

export interface Project {
  titel: string;
  plaats?: string;
  categorie: ProjectCategorie;
  dienstSlug: string;
  omschrijving: string;
  voor?: ImageMetadata;
  na?: ImageMetadata;
  altVoor: string;
  altNa: string;
}

export const projecten: Project[] = [
  {
    titel: 'Keuken',
    categorie: 'keuken',
    dienstSlug: 'eindschoonmaak-diepteschoonmaak',
    omschrijving: 'Volle aanrecht en vloer, daarna leeg, ontvet en schoon.',
    voor: keukenVoor,
    na: keukenNa,
    altVoor: 'Keuken met een volle aanrecht en zakken op de vloer',
    altNa: 'Dezelfde keuken met een lege, schone aanrecht en vloer',
  },
  {
    titel: 'Kookplaat en hoek',
    categorie: 'keuken',
    dienstSlug: 'eindschoonmaak-diepteschoonmaak',
    omschrijving: 'Vet op de kookplaat en rommel op de vloer, daarna alles schoon.',
    voor: kookplaatVoor,
    na: kookplaatNa,
    altVoor: 'Vette gaskookplaat met spullen en zakken eromheen',
    altNa: 'Schone gaskookplaat en lege keukenhoek',
  },
  {
    titel: 'Koelkast en nis',
    categorie: 'keuken',
    dienstSlug: 'eindschoonmaak-diepteschoonmaak',
    omschrijving: 'Kruimels en vet weg, de koelkast weer wit.',
    voor: koelkastVoor,
    na: koelkastNa,
    altVoor: 'Koelkast met een vuile oven en spullen erop',
    altNa: 'Dezelfde koelkast schoon en vrij',
  },
  {
    titel: 'Badkamer',
    categorie: 'badkamer',
    dienstSlug: 'eindschoonmaak-diepteschoonmaak',
    omschrijving: 'Rommel, rollen en handdoeken weg, bad en tegels schoon.',
    voor: badkamerVoor,
    na: badkamerNa,
    altVoor: 'Badkamer vol spullen rond het bad en toilet',
    altNa: 'Dezelfde badkamer met een schoon bad en lege vloer',
  },
  {
    titel: 'Gang',
    categorie: 'kamers',
    dienstSlug: 'eindschoonmaak-diepteschoonmaak',
    omschrijving: 'Van volle gang naar een schone, glanzende vloer.',
    voor: gangVoor,
    na: gangNa,
    altVoor: 'Gang vol zakken en afval',
    altNa: 'Dezelfde gang leeg met een schone vloer',
  },
];

/** Only projects with real before/after photos are shown on the site. */
export const projectenMetFoto = projecten.filter((p) => p.voor && p.na);
export const heeftFotos = projectenMetFoto.length > 0;
