# Aiieras - Trilingual Recipe Website

## Overview
Aiieras is a multi-page static recipe website supporting three languages: Arabic (RTL), English, and French. Users can browse recipes, filter by category, search, and save favorites to local storage. The site features a sophisticated, premium design with a beige/black/white color palette, advanced CSS animations, and modern glassmorphism effects.

## Pages
- **index.html** - Home page with hero section
- **recipes.html** - Browse and search recipes
- **lifestyle.html** - Culinary lifestyle tips and kitchen wisdom
- **about.html** - About the author
- **contact.html** - Contact form

## Project Structure
```
/
├── index.html          # Home page (hero section)
├── recipes.html        # Recipes page with search and filter
├── about.html          # About the author page
├── contact.html        # Contact form page
├── style.css           # Styling with RTL support
├── script.js           # JavaScript for i18n, recipes, and interactions
├── server.py           # Python HTTP server with cache control
├── assets/             # Images for hero, author, and recipes
│   ├── hero.jpg
│   ├── author.jpg
│   ├── logo.ico
│   └── recipe[1-5].jpg
└── README.txt          # Original project documentation
```

## Technology Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Server**: Python 3.11 HTTP server on port 5000
- **Languages**: Arabic (default), English, French
- **Storage**: LocalStorage for user preferences and favorites

## Features
- Trilingual support with dynamic language switching (AR/EN/FR)
- RTL/LTR text direction handling
- Recipe search and category filtering
- Favorite recipes with visual indicators (saved to localStorage)
- Responsive design for mobile and desktop
- Contact form (demo mode)
- Mobile hamburger menu
- 8 recipe entries with multiple categories
- Smooth animations and transitions
- Gradient backgrounds and hover effects
- Professional UI with modern CSS styling

## Recent Setup & Updates

### Oct 17, 2025 - Social Media Icons & Header Search Added
- **Added social media icons** to header (top right):
  * Instagram, TikTok, YouTube, Pinterest, Twitter/X icons
  * Clean, minimalist design with hover effects
  * Icons scale and lift on hover with drop-shadow animations
- **Added search bar** to header:
  * Sleek search input with "SEARCH" placeholder
  * Rounded design with beige background
  * Search icon button with hover interactions
  * Integrated seamlessly with existing header design
- **Responsive behavior**:
  * Icons and search hidden on mobile (< 900px) to keep header clean
  * Mobile menu button appears for navigation
- All 5 pages updated: index, recipes, lifestyle, about, contact

### Oct 17, 2025 - Premium CSS Upgrade & Lifestyle Page
- **Complete CSS overhaul** with beige/black/white color palette:
  * Replaced palm oil/coconut colors with sophisticated beige (#d4c5b0), black (#0a0a0a), white (#ffffff)
  * Added comprehensive CSS variables for colors, spacing, shadows, and effects
- **Advanced CSS features implemented**:
  * Glassmorphism header with backdrop-filter blur effects
  * 3D transforms and animations on cards, buttons, and interactive elements
  * Advanced keyframe animations (gradients, fades, slides, rotations)
  * Premium shadow system (5 levels from sm to xl)
  * Modern hover effects with scale, translate, and filter transitions
  * Animated background patterns with radial gradients
- **Typography upgrade**:
  * Playfair Display (serif) for headings and elegant titles
  * Inter (sans-serif) for body text and UI elements
  * Custom font sizing, weights, and letter-spacing
- **New Lifestyle page** added with premium design:
  * Hero section with gradient background
  * 6 lifestyle cards covering mindful eating, kitchen wisdom, nutrition, sustainability, meal planning, and cooking with love
  * Inspirational quote section with rotating gradient effect
  * Quick kitchen tips grid with 9 practical tips
  * Fully responsive with mobile optimizations
- **Navigation updated** across all pages to include Lifestyle link
- **Responsive design enhancements**:
  * Auto-fit grids with minmax for fluid layouts
  * Mobile breakpoints at 900px and 600px
  * Enhanced mobile menu with slide-down animation
  * Accessibility support with reduced-motion preferences
- All pages tested and verified working correctly with new design

### Oct 17, 2025 - Replit Environment Setup (Fresh GitHub Import)
- Python 3.12 already available in environment (no module installation needed)
- Configured workflow "Server" to run `python3 server.py` on port 5000 with webview output
- Verified all pages working correctly in Replit environment:
  * Home page with hero section and elegant beige/black/white design
  * Recipes page with search, filters, and recipe cards displaying properly
  * Lifestyle page with premium design and kitchen tips
  * About page with author information
  * Contact page with functional form (demo mode)
- Set up deployment configuration:
  * Deployment target: autoscale (stateless web server)
  * Run command: python3 server.py
- Confirmed .gitignore already includes Python and Replit configs
- Server.py already properly configured with:
  * Cache-Control headers (no-cache, no-store, must-revalidate) for Replit iframe compatibility
  * Socket reuse (allow_reuse_address) to prevent port binding issues
  * Binding to 0.0.0.0:5000 (Replit compatible host)
- All assets loading correctly including hero images and recipe photos

### Oct 16, 2025 - Previous Updates
- Created assets folder with stock images
- Set up server.py with cache control headers and socket reuse
- Added .gitignore for Python and Replit files
- Created favicon.svg with brand logo
- Enhanced CSS with animations, gradients, and hover effects
- Added 3 more recipes (total: 8 recipes)
- Improved favorite button visual feedback
- Added meta tags for SEO

## Running the Project
The project runs via a Python HTTP server on port 5000:
```bash
python3 server.py
```

Access at: http://0.0.0.0:5000/

## User Preferences
- No specific preferences documented yet
