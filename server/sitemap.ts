import { storage } from "./storage";

export async function generateSitemap(): Promise<string> {
  const baseUrl = "https://visual-novel-hub.replit.app";
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/search</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/ranking</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/buy-points</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

  try {
    // Add novel pages
    const items = await storage.getAllItems();
    
    for (const item of items) {
      sitemap += `
  <url>
    <loc>${baseUrl}/novel/${item.id}</loc>
    <lastmod>${item.createdAt || currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  sitemap += `
</urlset>`;

  return sitemap;
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://visual-novel-hub.replit.app/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Disallow admin pages (if any)
Disallow: /admin/
Disallow: /api/

# Allow specific API endpoints for SEO
Allow: /api/items
Allow: /api/rankings`;
}