import { useEffect } from 'react';
import type { Item } from '@shared/schema';

interface StructuredDataProps {
  type: 'WebSite' | 'ItemList' | 'Product' | 'Article';
  data?: any;
  items?: Item[];
}

export default function StructuredData({ type, data, items }: StructuredDataProps) {
  useEffect(() => {
    let structuredData: any = {};

    switch (type) {
      case 'WebSite':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Visual Novel Hub",
          "url": "https://visual-novel-hub.replit.app/",
          "description": "Discover and read captivating visual novels across multiple genres",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://visual-novel-hub.replit.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Visual Novel Hub"
          }
        };
        break;

      case 'ItemList':
        if (items) {
          structuredData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Visual Novel Rankings",
            "description": "Top trending visual novels ranked by popularity",
            "numberOfItems": items.length,
            "itemListElement": items.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Book",
                "@id": `https://visual-novel-hub.replit.app/novel/${item.id}`,
                "name": item.title,
                "description": item.description,
                "image": item.image,
                "genre": item.tags,
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": item.rating,
                  "ratingCount": item.likeCount
                },
                "interactionStatistic": {
                  "@type": "InteractionCounter",
                  "interactionType": "https://schema.org/ReadAction",
                  "userInteractionCount": item.viewCount
                }
              }
            }))
          };
        }
        break;

      case 'Product':
        if (data) {
          structuredData = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Visual Novel Points",
            "description": "Purchase points to unlock premium visual novel content",
            "brand": {
              "@type": "Brand",
              "name": "Visual Novel Hub"
            },
            "offers": data.packages?.map((pkg: any) => ({
              "@type": "Offer",
              "price": parseFloat(pkg.price.replace('$', '')),
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "name": `${pkg.points} Points - ${pkg.title}`,
              "description": `Get ${pkg.points} points for ${pkg.price}`
            }))
          };
        }
        break;

      case 'Article':
        if (data) {
          structuredData = {
            "@context": "https://schema.org",
            "@type": "Book",
            "name": data.title,
            "description": data.description,
            "image": data.image,
            "genre": data.tags,
            "url": `https://visual-novel-hub.replit.app/novel/${data.id}`,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": data.rating,
              "ratingCount": data.likeCount,
              "bestRating": "5",
              "worstRating": "1"
            },
            "interactionStatistic": {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/ReadAction",
              "userInteractionCount": data.viewCount
            },
            "publisher": {
              "@type": "Organization",
              "name": "Visual Novel Hub"
            }
          };
        }
        break;
    }

    // Remove existing structured data
    const existingScript = document.querySelector('script[data-structured-data]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    if (Object.keys(structuredData).length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured-data', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.querySelector('script[data-structured-data]');
      if (script) {
        script.remove();
      }
    };
  }, [type, data, items]);

  return null;
}