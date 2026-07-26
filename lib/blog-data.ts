export type BlogPost = {
  slug: string;
  category: string;
  tag?: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  avatarColor: string;
  date: string;
  readTime: string;
  views: string;
  likes: number;
  gradient: string;
  featured: boolean;
  content: string; // full HTML content
};

export const posts: BlogPost[] = [
  {
    slug: "mpesa-ecommerce-integration-guide",
    category: "E-Commerce",
    tag: "Featured",
    title: "The Complete Guide to M-Pesa STK Push Integration for Your Online Store",
    excerpt: "Learn step-by-step how to integrate M-Pesa STK Push into your e-commerce website, accept payments instantly and increase your conversion rate by up to 60%.",
    author: "Brian Mwangi",
    authorRole: "Lead Developer",
    authorAvatar: "BM",
    avatarColor: "#0D518C",
    date: "June 15, 2025",
    readTime: "8 min read",
    views: "4.2k",
    likes: 142,
    gradient: "linear-gradient(135deg, rgba(13,81,140,0.4), rgba(46,204,113,0.2))",
    featured: true,
    content: `
<p>M-Pesa STK Push (also known as Lipa Na M-Pesa Online) is the most powerful payment tool available to Kenyan e-commerce businesses. When implemented correctly, it eliminates the friction of manual Paybill payments and drives conversion rates up by 40–60%.</p>

<h2>What is STK Push?</h2>
<p>STK Push is a Safaricom API that sends an automatic payment prompt directly to your customer's phone. The customer simply enters their M-Pesa PIN and the payment is confirmed in seconds — no Paybill numbers to remember, no manual reference codes.</p>

<h2>Prerequisites</h2>
<ul>
<li>A registered Safaricom Daraja API account at developer.safaricom.co.ke</li>
<li>A verified M-Pesa Paybill or Till number</li>
<li>Node.js or Python backend to handle API calls</li>
<li>An HTTPS endpoint for callbacks</li>
</ul>

<h2>Step 1: Get Your Daraja Credentials</h2>
<p>After registering on the Daraja portal, create a new app to get your Consumer Key and Consumer Secret. You'll also need your Paybill shortcode and the Lipa Na M-Pesa passkey from the M-Pesa portal.</p>

<h2>Step 2: Generate an Access Token</h2>
<p>Every API call requires a Bearer token generated from your credentials. This token expires every hour, so build token refresh logic into your system from the start.</p>

<h2>Step 3: Initiate the STK Push</h2>
<p>Send a POST request to the STK Push endpoint with the customer's phone number, amount and callback URL. Safaricom validates and sends the prompt to the customer's phone within 2–5 seconds.</p>

<h2>Step 4: Handle the Callback</h2>
<p>When the customer completes or cancels the payment, Safaricom sends a POST request to your callback URL with the transaction result. Update your order status based on this response.</p>

<h2>Common Pitfalls to Avoid</h2>
<ul>
<li>Always sanitize the phone number format (254XXXXXXXXX — no + or leading 0)</li>
<li>Store the CheckoutRequestID from the initiation response to reconcile callbacks</li>
<li>Implement idempotency to avoid double-processing</li>
<li>Test thoroughly in sandbox before going live</li>
</ul>

<p>At Solvara, we've implemented M-Pesa STK Push in over 20 e-commerce stores. If you need help integrating M-Pesa into your platform, <a href="/contact" style="color:#2ECC71">book a free consultation</a> with our team.</p>
    `,
  },
  {
    slug: "nextjs-vs-wordpress-kenya",
    category: "Web Development",
    tag: "Popular",
    title: "Next.js vs WordPress in 2025 — Which is Better for Kenyan Businesses?",
    excerpt: "A practical comparison of Next.js and WordPress for SMEs in Kenya. We cover performance, cost, SEO, maintenance and which platform suits which type of business.",
    author: "Kevin Ochieng",
    authorRole: "Backend Engineer",
    authorAvatar: "KO",
    avatarColor: "#1A6BB5",
    date: "May 28, 2025",
    readTime: "6 min read",
    views: "3.8k",
    likes: 98,
    gradient: "linear-gradient(135deg, rgba(26,107,181,0.4), rgba(13,81,140,0.2))",
    featured: false,
    content: `
<p>One of the most common questions we get from Kenyan business owners is: "Should I use WordPress or Next.js for my website?" The honest answer is: it depends on your needs. Here's our breakdown.</p>

<h2>WordPress: The Case For It</h2>
<p>WordPress powers over 40% of all websites globally. It's easy to manage, has thousands of plugins and most web developers in Kenya are familiar with it. For a basic informational website with occasional content updates, WordPress remains a solid choice.</p>

<h2>Next.js: The Case For It</h2>
<p>Next.js is a React framework that gives you full control over your website's architecture. It produces faster, more secure websites with better SEO performance. For e-commerce, custom applications and performance-critical sites, Next.js is significantly superior.</p>

<h2>Performance Comparison</h2>
<p>In our testing on Kenyan mobile networks (4G, 5–10 Mbps), Next.js sites load in 0.8–1.5 seconds while equivalent WordPress sites average 3–5 seconds. This directly impacts bounce rates and conversions.</p>

<h2>Cost Comparison</h2>
<p>WordPress hosting starts at KES 2,000/month for decent performance. Next.js sites can be hosted on Vercel's free tier for small projects, scaling affordably. Development costs are typically 30–50% higher for Next.js due to specialised skills, but maintenance is lower.</p>

<h2>Our Recommendation</h2>
<ul>
<li><strong>Choose WordPress</strong> if: you need a simple blog or brochure site and want to manage content yourself without technical skills</li>
<li><strong>Choose Next.js</strong> if: you need e-commerce, custom features, high performance or are building something that will scale</li>
</ul>

<p>At Solvara, we build exclusively in Next.js because we believe our clients deserve the best performance, security and scalability available today.</p>
    `,
  },
  {
    slug: "seo-tips-kenyan-businesses",
    category: "SEO",
    tag: "New",
    title: "10 SEO Strategies That Actually Work for Kenyan Businesses in 2025",
    excerpt: "Stop guessing and start ranking. These proven SEO tactics are tailored for the Kenyan market, covering local SEO, Google Business Profile and content that converts.",
    author: "Aisha Njoroge",
    authorRole: "UI/UX Designer",
    authorAvatar: "AN",
    avatarColor: "#2ECC71",
    date: "May 10, 2025",
    readTime: "5 min read",
    views: "2.9k",
    likes: 76,
    gradient: "linear-gradient(135deg, rgba(46,204,113,0.3), rgba(13,81,140,0.15))",
    featured: false,
    content: `
<p>Most SEO guides are written for US or UK markets. The Kenyan digital landscape has unique characteristics — mobile-first users, specific local search patterns and a growing but competitive online market. Here are 10 strategies that work specifically for Kenyan businesses.</p>

<h2>1. Claim and Optimise Your Google Business Profile</h2>
<p>This is the single highest-ROI action for any Kenyan business. A fully optimised Google Business Profile gets you into the local map pack, which appears above organic results. Add your hours, photos, services and actively respond to reviews.</p>

<h2>2. Target Nairobi-Specific Keywords</h2>
<p>Instead of competing for "web development," target "web development Nairobi" or "website design Westlands." These long-tail local keywords have less competition and higher purchase intent.</p>

<h2>3. Build Your Site for Mobile First</h2>
<p>Over 80% of Kenyan web traffic comes from mobile devices. Google ranks mobile experience first. If your site isn't fast and beautiful on a cheap Android phone, you're losing rankings.</p>

<h2>4. Create Content in Kiswahili and English</h2>
<p>Many Kenyan searches include Kiswahili terms. Creating content in both languages or using natural code-switching can capture a significant audience that purely English sites miss.</p>

<h2>5. Get Listed on Kenyan Business Directories</h2>
<p>BrighterMonday, PigiaMe, Kenya Yellow Pages and similar directories provide local backlinks that signal relevance to Google for Kenyan searches.</p>

<h2>6. Page Speed is Non-Negotiable</h2>
<p>On Kenyan networks, page speed is a major ranking factor and a direct conversion lever. Use WebP images, lazy loading, CDNs and modern hosting. Target under 2 seconds load time on 4G.</p>

<h2>7. Schema Markup for Local Business</h2>
<p>Add LocalBusiness JSON-LD schema to your site. This helps Google understand your business type, location and services — improving how you appear in rich results.</p>

<h2>8. Build Links from Kenyan Publications</h2>
<p>A backlink from Business Daily Africa, Techweez or Nation Media carries significant authority for Kenyan search results. Reach out with press releases or guest content.</p>

<h2>9. Optimise for "Near Me" Searches</h2>
<p>Include your area/neighbourhood in page titles and content. "Website design company near Westlands" and similar phrases capture high-intent local traffic.</p>

<h2>10. Review Velocity Matters</h2>
<p>Consistently getting new Google reviews signals to Google that your business is active and trusted. Create a simple process for requesting reviews from every happy client.</p>
    `,
  },
  {
    slug: "hospital-management-system-guide",
    category: "Business",
    title: "Why Every Kenyan Hospital Needs a Digital Management System in 2025",
    excerpt: "From appointment booking to patient records — discover how a modern hospital management system reduces costs, improves patient experience and eliminates paperwork.",
    author: "Brian Mwangi",
    authorRole: "Lead Developer",
    authorAvatar: "BM",
    avatarColor: "#0D518C",
    date: "April 22, 2025",
    readTime: "7 min read",
    views: "1.8k",
    likes: 54,
    gradient: "linear-gradient(135deg, rgba(231,76,60,0.25), rgba(13,81,140,0.2))",
    featured: false,
    content: `<p>Kenya's healthcare sector is at an inflection point. With patient volumes growing and staff shortages worsening, the hospitals and clinics that will thrive in the next decade are those that embrace digital systems today.</p><h2>The Cost of Paper-Based Systems</h2><p>The average Kenyan clinic spends 2–4 hours per day on administrative paperwork — patient registration, appointment scheduling, billing reconciliation. At a staff cost of KES 500/hour, that's KES 30,000–60,000 per month wasted on work that software can do in seconds.</p><h2>What a Good HMS Does</h2><p>A modern hospital management system handles patient registration, appointment booking, consultation notes, prescription management, lab results, billing and insurance claims in one integrated platform. Critically, all data is searchable and accessible instantly.</p><h2>ROI for Kenyan Facilities</h2><p>Our clients using Solvara-built HMS solutions have reported: 60% reduction in patient waiting time, 40% reduction in billing errors, 80% reduction in lost patient files and an average 25% increase in patient throughput per day.</p><p>If you're running a clinic or hospital and want to discuss digitising your operations, <a href="/contact" style="color:#2ECC71">contact us</a> for a free needs assessment.</p>`,
  },
  {
    slug: "web-design-trends-africa-2025",
    category: "Design",
    title: "Web Design Trends Dominating African Markets in 2025",
    excerpt: "From bold typography to mobile-first experiences — explore the design trends that are resonating with African audiences and driving higher engagement on local websites.",
    author: "Aisha Njoroge",
    authorRole: "UI/UX Designer",
    authorAvatar: "AN",
    avatarColor: "#2ECC71",
    date: "April 5, 2025",
    readTime: "4 min read",
    views: "2.1k",
    likes: 89,
    gradient: "linear-gradient(135deg, rgba(155,89,182,0.3), rgba(13,81,140,0.15))",
    featured: false,
    content: `<p>African web design is developing its own distinct visual language — bold, vibrant, mobile-optimised and culturally resonant. Here are the trends defining 2025.</p><h2>Bold Typography</h2><p>Large, confident headlines are replacing the safe, small fonts of the past. African brands are claiming visual space with typography that commands attention, especially on mobile screens where the text IS the first impression.</p><h2>Dark Mode by Default</h2><p>Dark interfaces are growing in popularity across African markets — they look premium, are easier on the eyes in bright outdoor environments and reduce battery consumption on OLED mobile screens.</p><h2>Micro-Animations</h2><p>Subtle hover effects, loading animations and scroll-triggered reveals are becoming expected, not exceptional. Tools like Framer Motion make these accessible to every project.</p><h2>Authentic Local Photography</h2><p>Stock photos of smiling generic faces are being replaced by real local imagery. Kenyan users respond dramatically better to websites that look like they were made for them, not imported from the West.</p>`,
  },
  {
    slug: "ecommerce-launch-checklist",
    category: "E-Commerce",
    title: "The 20-Point Checklist Before Launching Your Online Store in Kenya",
    excerpt: "Don't launch your e-commerce store before reading this. We cover payments, security, SEO, legal requirements and the critical tests that save you from costly mistakes.",
    author: "Mercy Wanjiku",
    authorRole: "Project Manager",
    authorAvatar: "MW",
    avatarColor: "#25A85E",
    date: "March 18, 2025",
    readTime: "9 min read",
    views: "3.2k",
    likes: 112,
    gradient: "linear-gradient(135deg, rgba(46,204,113,0.25), rgba(243,156,18,0.15))",
    featured: false,
    content: `<p>Launching an e-commerce store prematurely is one of the most expensive mistakes a Kenyan business can make. Here's our agency's internal launch checklist — the same one we use for every client store.</p><h2>Payments</h2><ul><li>M-Pesa STK Push tested end-to-end with real transactions</li><li>Card payments (Visa/Mastercard) configured and tested</li><li>Payment failure handling and retry logic implemented</li><li>Refund process documented and tested</li></ul><h2>Security</h2><ul><li>SSL certificate active (HTTPS on all pages)</li><li>Admin panel on non-standard URL</li><li>Strong password policy enforced</li><li>Backup system configured and tested</li></ul><h2>SEO</h2><ul><li>Product pages have unique titles and descriptions</li><li>Images compressed and have alt text</li><li>Sitemap submitted to Google Search Console</li><li>Google Analytics 4 tracking purchases</li></ul><h2>Legal</h2><ul><li>Privacy Policy published</li><li>Terms and Conditions covering returns/refunds</li><li>Cookie consent banner live</li></ul><p>This is just the start. <a href="/contact" style="color:#2ECC71">Contact us</a> for our full 50-point enterprise launch checklist.</p>`,
  },
  {
    slug: "government-digital-transformation",
    category: "Tech News",
    title: "Kenya's Digital Government Push: What It Means for Web Development",
    excerpt: "The Kenyan government's eCitizen expansion is creating massive demand for digital services. Here's what tech companies and developers need to know.",
    author: "Kevin Ochieng",
    authorRole: "Backend Engineer",
    authorAvatar: "KO",
    avatarColor: "#1A6BB5",
    date: "March 2, 2025",
    readTime: "5 min read",
    views: "1.5k",
    likes: 43,
    gradient: "linear-gradient(135deg, rgba(243,156,18,0.25), rgba(13,81,140,0.2))",
    featured: false,
    content: `<p>Kenya's digital government agenda, anchored by the eCitizen platform and the Digital Superhighway initiative, is creating unprecedented demand for web development services across the public sector.</p><h2>The Opportunity</h2><p>County governments, parastatals and government agencies are under pressure to digitise service delivery. From land registries to permit applications, the mandate is clear: services must be available online. This creates massive demand for compliant, accessible and secure web platforms.</p><h2>What Government Clients Need</h2><p>Government digital projects have specific requirements: accessibility compliance (WCAG 2.1), multi-language support, high security standards, document management systems and integration with existing government APIs like eCitizen and Huduma Namba.</p><h2>Solvara's Government Experience</h2><p>We've delivered government and institutional platforms that meet Kenya ICT Authority standards. If your institution needs to digitise services, <a href="/contact" style="color:#2ECC71">let's talk</a>.</p>`,
  },
  {
    slug: "website-speed-optimization",
    category: "Web Development",
    title: "How to Make Your Website Load in Under 2 Seconds on Kenyan Networks",
    excerpt: "Slow websites lose customers. Learn practical optimization techniques that dramatically improve load times on mobile networks.",
    author: "Brian Mwangi",
    authorRole: "Lead Developer",
    authorAvatar: "BM",
    avatarColor: "#0D518C",
    date: "February 14, 2025",
    readTime: "6 min read",
    views: "2.7k",
    likes: 95,
    gradient: "linear-gradient(135deg, rgba(0,188,212,0.25), rgba(13,81,140,0.2))",
    featured: false,
    content: `<p>Every additional second of load time costs you 7% of conversions. On Kenyan mobile networks where speeds average 10–20 Mbps and latency is high, speed optimization is not optional — it's survival.</p><h2>Image Optimization</h2><p>Images account for 60–80% of page weight on most sites. Convert all images to WebP format (30–50% smaller than JPEG with equal quality), implement lazy loading for below-the-fold images and use responsive images with srcset.</p><h2>Use a CDN</h2><p>A Content Delivery Network serves your assets from servers geographically close to your users. Vercel and Cloudflare both have edge nodes in or near East Africa, reducing latency dramatically.</p><h2>Code Splitting</h2><p>Don't load all your JavaScript on every page. Next.js does automatic code splitting — each page only loads the code it needs. This alone can reduce initial load by 40–60% on complex sites.</p><h2>Eliminate Render-Blocking Resources</h2><p>Load non-critical CSS and JavaScript asynchronously. Use <code>next/font</code> for fonts (eliminates layout shift) and defer third-party scripts like chat widgets and analytics.</p><h2>Measure with Real Kenyan Network Conditions</h2><p>Use Chrome DevTools to throttle to "Fast 3G" when testing. This simulates real Kenyan mobile network conditions far better than your office WiFi. Target a Lighthouse performance score of 90+.</p>`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, category: string, count = 3): BlogPost[] {
  return posts
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, count);
}