/**
 * ONLY real, verifiable reviews (e.g. copied from your Google Business Profile, with permission).
 * Leave empty until you have them. The reviews section + AggregateRating stay hidden while
 * this list is empty or site.flags.showReviews is false.
 */
export interface Review {
  naam: string; // e.g. 'Marieke' or 'Tandartspraktijk X' (with permission)
  plaats: string;
  tekst: string;
  score: 1 | 2 | 3 | 4 | 5;
  datum: string; // ISO date, e.g. '2026-10-14'
  bron: string; // e.g. 'Google'
}

export const reviews: Review[] = [];
