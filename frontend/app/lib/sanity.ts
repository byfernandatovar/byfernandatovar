import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity client configuration
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '2b266qdi',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Types
export interface PortfolioCategory {
  _id: string;
  name: string;
  title: string;
  subtitle: string;
  images: SanityImage[];
}

export interface SanityImage {
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

// Query to get a portfolio category by slug
export async function getPortfolioCategory(slug: string): Promise<PortfolioCategory | null> {
  const query = `*[_type == "portfolioCategory" && name == $slug][0]{
    _id,
    name,
    title,
    subtitle,
    images
  }`;

  return client.fetch(query, { slug });
}

// Helper to transform Sanity images to URL strings
export function getImageUrls(images: SanityImage[] | undefined): string[] {
  if (!images || images.length === 0) {
    return [];
  }

  return images.map((image) =>
    urlFor(image).auto('format').quality(85).url()
  );
}

