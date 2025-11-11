import { cities } from '../data/cities'

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: string
}

export const generateSitemap = (): string => {
  const baseUrl = 'https://codescholaroverseas.com'
  const currentDate = new Date().toISOString().split('T')[0]

  const urls: SitemapUrl[] = [
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
      loc: `${baseUrl}/terms-conditions`,
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
  ]

  // Add dynamic city pages
  cities.forEach(city => {
    urls.push({
      loc: `${baseUrl}/consultants/${city.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    })
  })

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
</urlset>`

  return xml
}

// Function to generate robots.txt
export const generateRobotsTxt = (): string => {
  const baseUrl = 'https://codescholaroverseas.com'
  
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
Allow: /terms-conditions
Allow: /legal`
}

// Note: For actual file generation, use the Node.js script in /scripts/generateSitemap.js

// Analytics and tracking code for each city page
export const getAnalyticsConfig = (citySlug: string) => {
  return {
    pageTitle: `Study Abroad Consultants in ${cities.find(c => c.slug === citySlug)?.name}`,
    pageCategory: 'city-landing-page',
    pageLocation: citySlug,
    conversionGoals: [
      'consultation_request',
      'phone_call',
      'form_submission',
      'brochure_download'
    ]
  }
}

export default {
  generateSitemap,
  generateRobotsTxt,
  getAnalyticsConfig
}