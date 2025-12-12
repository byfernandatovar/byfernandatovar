import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

// Sanity client configuration (server-side, used in loaders)
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '2b266qdi',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Image URL builder
const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Types
export interface PortfolioCategory {
  _id: string;
  name: string;
  title: string;
  subtitle: string;
  coverImage?: SanityImage;
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
    "images": images[] {
      _key,
      asset,
      alt
    }
  }`;

  return client.fetch(query, { slug });
}

// Query to get all portfolio categories for the main grid
export async function getAllPortfolioCategories(): Promise<PortfolioCategory[]> {
  const query = `*[_type == "portfolioCategory"] | order(
    select(
      name == "weddings" => 0,
      name == "portraits" => 1,
      name == "moments" => 2,
      name == "couples" => 3,
      4
    )
  ){
    _id,
    name,
    title,
    subtitle,
    coverImage {
      _key,
      asset,
      alt
    }
  }`;

  return client.fetch(query);
}

// Helper to transform Sanity images to URL strings
export function getImageUrls(images: SanityImage[] | undefined): string[] {
  if (!images || images.length === 0) {
    return [];
  }

  return images
    .map((image) => {
      try {
        if (!image || !image.asset) {
          return null;
        }
        const url = urlFor(image).auto('format').quality(85).url();
        return url || null;
      } catch (error) {
        console.warn('Error generating image URL:', error);
        return null;
      }
    })
    .filter((url): url is string => url !== null && url !== undefined && url !== '');
}

