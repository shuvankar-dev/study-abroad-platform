import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// City data (copied from cities.ts for the build script)
const cities = [
  {
    name: 'Kolkata',
    slug: 'kolkata',
    state: 'West Bengal'
  },
  {
    name: 'Delhi',
    slug: 'delhi', 
    state: 'Delhi'
  },
  {
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra'
  },
  {
    name: 'Bangalore',
    slug: 'bangalore',
    state: 'Karnataka'
  },
  {
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra'
  },
  {
    name: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu'
  },
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana'
  },
  {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat'
  },
  {
    name: 'Chandigarh',
    slug: 'chandigarh',
    state: 'Punjab'
  },
  {
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan'
  }
];

function generateSitemap() {
  const baseUrl = 'https://codescholaroverseas.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const urls = [
    // Static pages
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/services`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/explore`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: `${baseUrl}/search-results`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.6'
    },
    {
      loc: `${baseUrl}/consultants`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    // Privacy and legal pages
    {
      loc: `${baseUrl}/privacy-policy`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      loc: `${baseUrl}/legal`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.3'
    }
  ];

  // Add dynamic city pages
  cities.forEach(city => {
    urls.push({
      loc: `${baseUrl}/consultants/${city.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    });
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

function generateRobotsTxt() {
  const baseUrl = 'https://codescholaroverseas.com';
  
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin pages
Disallow: /admin/

# Allow all public pages
Allow: /
Allow: /about
Allow: /services
Allow: /explore
Allow: /search-results
Allow: /consultants/
Allow: /privacy-policy
Allow: /legal`;
}

// Main execution
try {
  const sitemapContent = generateSitemap();
  const robotsContent = generateRobotsTxt();
  
  // Get the public directory path
  const publicDir = path.resolve(__dirname, '..', 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write files
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
  
  console.log('✅ Sitemap and robots.txt generated successfully!');
  console.log(`📍 Files saved to: ${publicDir}`);
  console.log(`🔗 Sitemap URL: https://codescholaroverseas.com/sitemap.xml`);
  console.log(`🤖 Robots.txt URL: https://codescholaroverseas.com/robots.txt`);
  console.log(`📊 Generated ${cities.length} city landing page URLs`);
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}