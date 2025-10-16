# Flavorya - Trilingual Recipe Website

## Overview
Flavorya is a static recipe website supporting three languages: Arabic (RTL), English, and French. Users can browse recipes, filter by category, search, and save favorites to local storage. The site features a clean, modern design with a warm color palette.

## Project Structure
```
/
├── index.html          # Main HTML file
├── style.css           # Styling with RTL support
├── script.js           # JavaScript for i18n, recipes, and interactions
├── server.py           # Python HTTP server with cache control
├── assets/             # Images for hero, author, and recipes
│   ├── hero.jpg
│   ├── author.jpg
│   └── recipe[1-5].jpg
└── README.txt          # Original project documentation
```

## Technology Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Server**: Python 3.11 HTTP server on port 5000
- **Languages**: Arabic (default), English, French
- **Storage**: LocalStorage for user preferences and favorites

## Features
- Trilingual support with dynamic language switching
- RTL/LTR text direction handling
- Recipe search and category filtering
- Favorite recipes (saved to localStorage)
- Responsive design for mobile and desktop
- Contact form (demo mode)
- Mobile hamburger menu

## Recent Setup (Oct 16, 2025)
- Installed Python 3.11 for HTTP server
- Created assets folder with stock images
- Set up server.py with cache control headers to prevent caching issues
- Configured workflow to serve on 0.0.0.0:5000
- Added .gitignore for Python and Replit files

## Running the Project
The project runs via a Python HTTP server on port 5000:
```bash
python3 server.py
```

Access at: http://0.0.0.0:5000/

## User Preferences
- No specific preferences documented yet
