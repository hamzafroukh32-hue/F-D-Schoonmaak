/** Window-cleaning facts for the glasbewassing pages, from site.glasbewassing and the price config. */
import { site } from '../config/site';
import { extraDiensten } from '../data/prijzen';

const g = site.glasbewassing;

/** Extra outdoor services we offer (from the calculator config), plus the conservatory. */
export const glasExtras = [...extraDiensten.filter((e) => e.aan).map((e) => e.label), 'Serre: buitenkant en serredak'];

/** Spec rows shown on the window-cleaning pages. */
export const glasFeiten = [
  { label: 'Welke kant', value: g.zijden },
  { label: 'Voor', value: g.panden },
  { label: 'Hoogte', value: g.maxHoogte },
  { label: 'Methode', value: g.methode },
];

export const glasZijden = g.zijden;
export const glasHoogte = g.maxHoogte;
export const glasMethode = g.methode;
