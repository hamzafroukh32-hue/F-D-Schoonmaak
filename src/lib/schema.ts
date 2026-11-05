/** Schema.org JSON-LD builders. Only real data goes in; placeholders are left out. */
import { site, absoluteUrl } from '../config/site';
import { plaatsen } from '../data/plaatsen';
import { reviews } from '../data/reviews';
import type { Faq } from '../data/types';
import { hasPlaceholder, stripPlaceholders } from './text';

export const businessId = `${site.url}/#business`;

export function businessSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    '@id': businessId,
    name: site.name,
    url: site.url + '/',
    telephone: site.contact.phoneE164,
    email: site.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
      ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
    },
    areaServed: plaatsen.map((p) => ({ '@type': 'City', name: p.naam })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.openingHours.days,
        opens: site.openingHours.opens,
        closes: site.openingHours.closes,
      },
    ],
  };

  const sameAs = Object.values(site.social).filter(Boolean);
  if (sameAs.length) schema.sameAs = sameAs;
  if (site.legal.kvk) schema.identifier = { '@type': 'PropertyValue', propertyID: 'KvK', value: site.legal.kvk };

  // AggregateRating only with real, published reviews.
  if (site.flags.showReviews && reviews.length > 0) {
    const avg = reviews.reduce((s, r) => s + r.score, 0) / reviews.length;
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    };
  }
  return schema;
}

export function faqSchema(faqs: Faq[]) {
  const usable = faqs.filter((f) => !hasPlaceholder(f.antwoord));
  if (!usable.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: usable.map((f) => ({
      '@type': 'Question',
      name: f.vraag,
      acceptedAnswer: { '@type': 'Answer', text: stripPlaceholders(f.antwoord) },
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string, areaNames?: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': businessId },
    areaServed: (areaNames ?? plaatsen.map((p) => p.naam)).map((n) => ({ '@type': 'City', name: n })),
  };
}
