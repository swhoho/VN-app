import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

export default function SEOHead({
  title = "Visual Novel Hub - Discover Amazing Interactive Stories",
  description = "Explore thousands of visual novels across romance, fantasy, horror, and sci-fi genres. Read free chapters, unlock premium content with points, and discover your next favorite story.",
  keywords = "visual novels, interactive stories, romance novels, fantasy stories, horror visual novels, sci-fi fiction, mobile reading, premium content",
  image = "https://visual-novel-hub.replit.app/og-image.jpg",
  url = "https://visual-novel-hub.replit.app/",
  type = "website",
  noindex = false,
}: SEOHeadProps) {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update link tags
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      
      element.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);

    // Twitter tags
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:url', url, true);

    // Canonical URL
    updateLinkTag('canonical', url);

  }, [title, description, keywords, image, url, type, noindex]);

  return null;
}