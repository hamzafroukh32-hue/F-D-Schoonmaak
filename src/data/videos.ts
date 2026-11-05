/**
 * Short vertical videos of our work, in public/video/ (mp4 + poster jpg + nl.vtt captions).
 * Videos are compressed and silent. Add a new one: put the files in public/video/ and add an entry here.
 */
export interface Video {
  slug: string; // file name without extension
  titel: string;
  categorie: 'keuken' | 'badkamer' | 'glas' | 'kamers';
}

export const videos: Video[] = [
  { slug: 'afzuigkap-stoom-2', titel: 'Afzuigkap ontvetten met stoom', categorie: 'keuken' },
  { slug: 'douchewand', titel: 'Glazen douchewand streeploos', categorie: 'badkamer' },
  { slug: 'aanrecht', titel: 'Aanrecht en keuken schoon', categorie: 'keuken' },
  { slug: 'afzuigkap-stoom-1', titel: 'Stoom tegen vet en aanslag', categorie: 'keuken' },
  { slug: 'douche', titel: 'Douche en glazen wand', categorie: 'badkamer' },
  { slug: 'toilet', titel: 'Toilet en vloer', categorie: 'badkamer' },
  { slug: 'afzuigkap-stoom-3', titel: 'Afzuigkap na het stomen', categorie: 'keuken' },
];

export const videoSrc = (v: Video) => ({
  src: `/video/${v.slug}.mp4`,
  poster: `/video/${v.slug}.jpg`,
  captions: `/video/${v.slug}.nl.vtt`,
});
