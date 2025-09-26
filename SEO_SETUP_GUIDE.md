# Ozark Web Works - SEO Analytics & Monitoring Setup Guide

## Overview
This guide provides step-by-step instructions for setting up essential SEO tracking and monitoring tools for your Springfield, Missouri web design business. Following these steps will help you track your local search performance and measure the success of your SEO efforts.

## 🎯 Quick Setup Checklist
- [ ] Google Analytics 4 (GA4) setup
- [ ] Google Search Console verification
- [ ] Google My Business optimization
- [ ] Local citations audit
- [ ] Performance monitoring setup
- [ ] Monthly reporting schedule

---

## 1. Google Analytics 4 (GA4) Setup

### Step 1: Create GA4 Property
1. Visit [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring" or "Create Account"
3. Set up your account:
   - **Account Name**: "Ozark Web Works"
   - **Property Name**: "Ozark Web Works Website"
   - **Time Zone**: Central Time (US)
   - **Currency**: USD

### Step 2: Configure Data Streams
1. Select "Web" as your platform
2. Enter your website URL: `https://ozarkwebworks.com`
3. Enter stream name: "Ozark Web Works Main Site"
4. Enable "Enhanced measurement" (recommended)

### Step 3: Install Tracking Code
Add the GA4 tracking code to your website's `<head>` section:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Step 4: Set Up Goals & Conversions

#### A. Configure Custom Events

**Contact Form Submission Tracking**
Add this code to your contact form submit handler:

```javascript
// In your contact form component (Contact.tsx)
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Your existing form submission logic here...
  
  // Track form submission event
  if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submit', {
      event_category: 'Lead Generation',
      event_label: 'Contact Form',
      value: 1
    });
  }
  
  // Continue with form submission...
};
```

**Phone Click Tracking**
Add tracking to phone number links:

```html
<!-- Update phone links in Contact.tsx -->
<a 
  href="tel:+14179429738" 
  onClick={() => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'phone_call', {
        event_category: 'Lead Generation',
        event_label: 'Header Phone Click',
        value: 1
      });
    }
  }}
  data-testid="link-phone"
>
  (417) 942-9738
</a>
```

**Service Page Engagement**
Add to service card interactions:

```javascript
// In Services.tsx component
const trackServiceInterest = (serviceName) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'service_interest', {
      event_category: 'Service Engagement',
      event_label: serviceName,
      value: 1
    });
  }
};
```

#### B. Mark Events as Conversions

1. In GA4, go to **Configure > Conversions**
2. Click **New conversion event**
3. Add these events as conversions:
   - `form_submit`
   - `phone_call`
   - `service_interest`
4. Set each as "Mark as conversion: ON"

#### C. Testing & Validation

**Method 1: GA4 DebugView**
1. Install [Google Analytics Debugger](https://chrome.google.com/webstore) Chrome extension
2. Visit your website
3. In GA4, go to **Configure > DebugView**
4. Test your forms and phone clicks
5. Verify events appear in real-time

**Method 2: Google Tag Assistant**
1. Install [Tag Assistant Companion](https://chrome.google.com/webstore) extension
2. Enable recording
3. Navigate and test your site
4. Review event firing in the report

**Validation Checklist:**
- [ ] Contact form submissions fire `form_submit` event
- [ ] Phone clicks fire `phone_call` event
- [ ] Service interactions fire `service_interest` event
- [ ] All events marked as conversions in GA4
- [ ] Real-time reports show event data

---

## 2. Google Search Console Setup

### Step 1: Add & Verify Property
1. Visit [Google Search Console](https://search.google.com/search-console/)
2. Click "Add Property"
3. Select "URL prefix" method
4. Enter: `https://ozarkwebworks.com`

### Step 2: Verification Methods
Choose one verification method:

**Option A: HTML File Upload**
1. Download the verification file
2. Upload to your website root directory
3. Click "Verify"

**Option B: Google Analytics** (if GA4 is already set up)
1. Select "Google Analytics"
2. Use your existing GA4 property
3. Click "Verify"

### Step 3: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Enter sitemap URL: `https://ozarkwebworks.com/sitemap.xml`
3. Click "Submit"

### Step 4: Monitor Key Reports
Check these reports weekly:
- **Performance**: Track clicks, impressions, and rankings
- **Coverage**: Monitor indexing issues
- **Enhancements**: Check structured data and mobile usability

---

## 3. Google My Business Optimization

### Step 1: Claim Your Listing
1. Visit [Google My Business](https://business.google.com/)
2. Search for "Ozark Web Works Springfield MO"
3. Claim or create your listing

### Step 2: Complete Your Profile
Fill out all sections:
- **Business Name**: Ozark Web Works
- **Category**: Web Designer, Marketing Agency
- **Address**: Springfield, MO 65801
- **Phone**: (417) 942-9738
- **Website**: https://ozarkwebworks.com
- **Hours**: Monday-Friday, 9:00 AM - 5:00 PM

### Step 3: Add Business Details
- **Description**: Focus on Springfield/Missouri local SEO
- **Services**: Web Design, E-commerce, SEO, Digital Marketing
- **Photos**: Add logo, team photos, work samples
- **Posts**: Share updates about projects and services

---

## 4. Local SEO Monitoring

### Key Metrics to Track

#### Search Console (Weekly)
- **Local keyword rankings**:
  - "web design Springfield MO"
  - "Springfield web designer"
  - "Missouri web development"
  - "Ozark web design"
- **Click-through rates** for local searches
- **Local pack appearances**

#### Google Analytics (Monthly)
- **Organic traffic** from Missouri/Springfield
- **Contact form submissions**
- **Phone number clicks**
- **Service page engagement**

#### Google My Business (Weekly)
- **Search views** and **map views**
- **Website clicks** from GMB listing
- **Direction requests**
- **Phone calls** from listing
- **Review ratings** and responses

### Competitor Tracking
Monitor these Springfield-area competitors:
- Search for "web design Springfield MO"
- Track their GMB activities
- Monitor their content updates
- Analyze their local citations

---

## 5. Local Citation Audit & Building

### Current Citations to Verify
Ensure consistent NAP (Name, Address, Phone) across:

#### Primary Directories
- [ ] Google My Business
- [ ] Bing Places
- [ ] Apple Maps
- [ ] Yahoo Local
- [ ] Yelp

#### Local/Industry Directories
- [ ] Springfield Area Chamber of Commerce
- [ ] Missouri.gov Business Directory
- [ ] Better Business Bureau
- [ ] Angie's List
- [ ] Thumbtack

#### Industry-Specific
- [ ] Clutch.co
- [ ] UpCity
- [ ] GoodFirms
- [ ] WebFX Directory

### NAP Consistency Check
Ensure exact match across all platforms:
- **Name**: Ozark Web Works
- **Address**: Springfield, MO 65801
- **Phone**: (417) 942-9738

---

## 6. Performance Monitoring Tools

### Page Speed Monitoring
- **Google PageSpeed Insights**: Monthly checks
- **GTmetrix**: Quarterly detailed analysis
- **Core Web Vitals**: Monitor in Search Console

### SEO Tools (Recommended)
- **Free Tools**:
  - Google Keyword Planner
  - Ubersuggest (free version)
  - Answer the Public
  
- **Paid Tools** (Consider for growth):
  - SEMrush or Ahrefs (competitor analysis)
  - Moz Local (citation management)
  - BrightLocal (local SEO tracking)

---

## 7. Monthly SEO Reporting Template

### Create Monthly Reports Including:

#### Traffic & Rankings
- Organic traffic growth (overall and local)
- Keyword ranking improvements
- Top performing pages
- Geographic traffic breakdown

#### Local SEO Performance
- Google My Business insights
- Local pack rankings
- Citation consistency status
- Review generation and responses

#### Technical SEO Health
- Site speed performance
- Mobile usability issues
- Crawl errors or indexing problems
- Schema markup validation

#### Competitive Analysis
- Competitor ranking changes
- New competitor content
- Local market shifts

---

## 8. Ongoing SEO Maintenance Schedule

### Weekly Tasks (30 minutes)
- [ ] Check Search Console for errors
- [ ] Monitor Google My Business insights
- [ ] Respond to new reviews
- [ ] Check local keyword rankings

### Monthly Tasks (2 hours)
- [ ] Generate analytics reports
- [ ] Update Google My Business posts
- [ ] Audit citation consistency
- [ ] Create content for blog/updates
- [ ] Review and update local keywords

### Quarterly Tasks (4 hours)
- [ ] Comprehensive competitor analysis
- [ ] Technical SEO audit
- [ ] Local citation building campaign
- [ ] Review and update schema markup
- [ ] Content strategy planning

---

## 9. Emergency Troubleshooting

### Common Issues & Solutions

#### Ranking Drops
1. Check Search Console for manual actions
2. Verify site accessibility and speed
3. Check for duplicate content issues
4. Review recent changes or updates

#### Traffic Drops
1. Verify Analytics tracking code
2. Check for search algorithm updates
3. Review competitor activities
4. Audit technical SEO issues

#### Local Pack Disappearance
1. Verify Google My Business status
2. Check NAP consistency
3. Review recent Google My Business changes
4. Monitor suspension notifications

---

## 10. Contact Information for SEO Support

**Primary Contact**: Kishahn Lewis  
**Email**: klewis@ozarkwebworks.com  
**Phone**: (417) 942-9738  
**Service Area**: Springfield, MO and Greater Ozarks Region

---

## Additional Resources

- [Google Search Central](https://developers.google.com/search)
- [Google My Business Help](https://support.google.com/business/)
- [Springfield Area Chamber of Commerce](https://springfieldchamber.com)
- [Missouri Small Business Development](https://missouribusiness.net)

---

*Last Updated: September 2025*  
*Document Version: 1.0*

> **Note**: This guide is specifically tailored for Ozark Web Works' Springfield, Missouri market focus. Adjust strategies based on actual performance data and local market changes.