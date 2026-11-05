const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Escape text and highlight any [INVULLEN ...] placeholder so it is impossible to miss.
 * Use with set:html.
 */
export const withPlaceholders = (s: string) =>
  escapeHtml(s).replace(/\[INVULLEN[^\]]*\]/g, (m) => `<mark class="ph">${m}</mark>`);

/** Strip placeholders for machine-readable output (JSON-LD, meta tags). */
export const stripPlaceholders = (s: string) => s.replace(/\s*\[INVULLEN[^\]]*\]/g, '').trim();

export const hasPlaceholder = (s: string) => /\[INVULLEN/.test(s);
