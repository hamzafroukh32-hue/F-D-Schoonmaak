/** Pure price calculation for the /offerte/ calculator. Shared by the page script and the build. */
import { glasPrijzen, glasBasis, uurtarieven, extraDiensten, schoonmaakFrequenties, btwPercentage } from '../data/prijzen';

export type VoorWie = 'woning' | 'zakelijk';

export interface OfferteState {
  voor: VoorWie;
  glas: {
    aan: boolean;
    woningtype: string | null;
    ramen: number;
    methode: string;
    zijde: string;
    verdieping: string;
    perStuk: Record<string, number>;
    ladder: boolean;
    serre: string;
    freq: string;
  };
  schoonmaak: { aan: boolean; type: string; uren: number; freq: string };
  diep: { aan: boolean; type: string; uren: number };
  extras: Record<string, { aan: boolean; n: number }>;
}

export interface Regel {
  id: string;
  titel: string;
  details: string[];
  bedrag: number; // incl. btw, this visit
  vanBedrag?: number; // before subscription discount
  terugkerend?: string; // e.g. 'elke 4 weken' / '± €152 per maand'
}

const find = <T extends { id: string }>(list: T[], id: string) => list.find((x) => x.id === id) ?? list[0];
const euro = (n: number) =>
  new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const round2 = (n: number) => Math.round(n * 100) / 100;

export function berekenOfferte(s: OfferteState) {
  const regels: Regel[] = [];

  if (s.glas.aan && s.glas.ramen > 0) {
    const g = s.glas;
    const methode = find(glasPrijzen.methodes, g.methode);
    const zijde = find(glasPrijzen.zijden, g.zijde);
    const verdieping = find(glasPrijzen.verdiepingen, g.verdieping);
    const serre = s.voor === 'woning' ? find(glasPrijzen.serre, g.serre) : glasPrijzen.serre[0];
    const freq = find(glasPrijzen.frequenties, g.freq);
    let totaal = glasBasis(g.ramen) + zijde.toeslag + verdieping.toeslag + serre.toeslag + (g.ladder ? glasPrijzen.ladder.toeslag : 0);
    const details = [`${g.ramen} ramen`, methode.label, zijde.label, verdieping.label];
    for (const p of glasPrijzen.perStuk) {
      const n = g.perStuk[p.id] ?? 0;
      if (n > 0) {
        totaal += n * p.prijs;
        details.push(`${p.label}: ${n}`);
      }
    }
    if (g.ladder) details.push(glasPrijzen.ladder.label);
    if (serre.toeslag) details.push(serre.label);
    totaal = round2(totaal * methode.factor);
    const korting = freq.korting ?? 0;
    const bedrag = round2(totaal * (1 - korting / 100));
    regels.push({
      id: 'glas',
      titel: 'Glasbewassing',
      details,
      bedrag,
      vanBedrag: korting ? totaal : undefined,
      terugkerend: freq.weken ? `${freq.label.toLowerCase()}, ${korting}% korting per beurt` : undefined,
    });
  }

  if (s.schoonmaak.aan && s.schoonmaak.uren > 0) {
    const freq = find(schoonmaakFrequenties, s.schoonmaak.freq);
    const bedrag = round2(s.schoonmaak.uren * uurtarieven.regulier);
    regels.push({
      id: 'schoonmaak',
      titel: 'Schoonmaak',
      details: [s.schoonmaak.type, `${String(s.schoonmaak.uren).replace('.', ',')} uur × ${euro(uurtarieven.regulier)}`],
      bedrag,
      terugkerend: freq.perMaand ? `${freq.label.toLowerCase()}, ± ${euro(bedrag * freq.perMaand)} per maand` : undefined,
    });
  }

  if (s.diep.aan && s.diep.uren > 0) {
    regels.push({
      id: 'diep',
      titel: s.diep.type,
      details: [`${String(s.diep.uren).replace('.', ',')} uur × ${euro(uurtarieven.diep)}`],
      bedrag: round2(s.diep.uren * uurtarieven.diep),
    });
  }

  for (const e of extraDiensten.filter((x) => x.aan)) {
    const st = s.extras[e.id];
    if (st?.aan && st.n > 0) {
      regels.push({
        id: e.id,
        titel: e.label,
        details: [`${st.n} ${e.eenheid.replace('per ', '')}`],
        bedrag: round2(Math.max(st.n * e.prijs, e.minimum)),
      });
    }
  }

  const totaal = round2(regels.reduce((t, r) => t + r.bedrag, 0));
  const btw = round2((totaal * btwPercentage) / (100 + btwPercentage));
  return { regels, totaal, btw, exclBtw: round2(totaal - btw) };
}

/** Plain-text summary that is sent with the form. */
export function samenvatting(s: OfferteState) {
  const r = berekenOfferte(s);
  const lines = [`Voor: ${s.voor === 'woning' ? 'woning (particulier)' : 'bedrijf (zakelijk)'}`];
  for (const x of r.regels) {
    lines.push(`- ${x.titel}: ${euro(x.bedrag)}${x.vanBedrag ? ` (was ${euro(x.vanBedrag)})` : ''}`);
    lines.push(`  ${x.details.join(', ')}`);
    if (x.terugkerend) lines.push(`  ${x.terugkerend}`);
  }
  lines.push(`Totaal incl. btw: ${euro(r.totaal)} (waarvan btw ${euro(r.btw)})`);
  return lines.join('\n');
}

export { euro };
