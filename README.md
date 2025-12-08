# Roman Malyshev Portfolio

A modern, data-driven portfolio website for Roman Malyshev, a Senior Unity Developer with 7+ years of experience in the game industry.

🔗 **Live Demo**: [GitHub Pages](https://romanmalyshev.github.io/Portfolio/)

## Features

- **Data-Driven Architecture**: All content is stored in JSON files, making it easy to update and maintain
- **Multi-language Support**: English and Russian versions with instant switching via URL parameters
- **Responsive Design**: Optimized for all devices — mobile, tablet, and desktop
- **Dynamic Content Rendering**: Single-page application with JavaScript-powered content loading
- **Mobile Navigation**: Hamburger menu with smooth animations and section links
- **Image Gallery**: Modal viewer with keyboard navigation and touch swipe gestures
- **Performance Optimized**: Lazy loading, page visibility handling, and online/offline detection

## Project Structure

```
Portfolio/
├── index.html              # Main entry point (SPA)
├── debug.html              # Debug panel for testing
├── data/
│   ├── portfolio.json      # English content
│   ├── portfolio_ru.json   # Russian content
│   ├── social.json         # Social links (shared across languages)
│   └── styledata.json      # Design system configuration
├── assets/
│   ├── css/
│   │   └── main.css        # Main stylesheet
│   ├── js/
│   │   └── portfolio.js    # ModernPortfolioManager class
│   ├── sass/               # SCSS source files
│   └── webfonts/           # Font Awesome webfonts
└── images/
    ├── avatar.jpg          # Profile photo
    ├── thumbs/             # Project thumbnails
    ├── fulls/              # Full-size project images
    └── gifs/               # Animated GIFs
```

## Content Sections

| Section | Description |
|---------|-------------|
| **About** | Personal introduction and professional summary |
| **Contact** | Social links, email, CV download |
| **Skills** | Technical skills categorized by type |
| **Projects** | Commercial game projects portfolio |
| **Jams** | Game jam entries (Ludum Dare, GMTK, etc.) |
| **Prototypes** | Prototype and experimental projects |
| **Experience** | Work history with achievements |
| **Education** | Academic background |

## How to Update Content

### Updating Existing Content

Edit the JSON files in the `data/` directory:
- **English**: `data/portfolio.json`
- **Russian**: `data/portfolio_ru.json`
- **Social Links**: `data/social.json` (shared between languages)

### Adding a New Project

Add a new object to the `projects` array in both language files:

```json
{
  "title": "Project Title",
  "genre": "Game Genre",
  "description": "Project description",
  "role": "Your Role",
  "period": "Start Date - End Date",
  "techTags": ["Unity", "C#"],
  "contribution": [
    "Achievement 1",
    "Achievement 2"
  ],
  "image": "image-filename",
  "imageThumb": "thumbnail-filename",
  "imageFull": "full-image-filename",
  "imageExtension": "png",
  "featured": false,
  "links": [
    {
      "text": "Steam",
      "url": "https://store.steampowered.com/app/...",
      "icon": "steam"
    }
  ]
}
```

### Adding a Jam Project

Add to the `jams` array:

```json
{
  "title": "Jam Project Title",
  "genre": "Genre",
  "description": "Description",
  "techTags": ["Unity", "C#"],
  "event": "Ludum Dare 58",
  "contribution": ["Your contributions"],
  "image": "image-filename",
  "imageThumb": "thumbnail-filename",
  "imageFull": "full-image-filename",
  "imageExtension": "png",
  "links": [
    {
      "text": "itch.io",
      "url": "https://...",
      "icon": "itch.io"
    }
  ]
}
```

### Adding a New Experience

Add to the `experience` array:

```json
{
  "company": "Company Name",
  "url": "https://company-website.com",
  "title": "Job Title",
  "period": "Start Date - End Date",
  "location": "City, Country",
  "description": "Job description",
  "achievements": [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

### Supported Link Icons

The following icons are supported for project links:
- `steam` — Steam
- `youtube` — YouTube
- `globe` / `website` — Website
- `github` — GitHub
- `google-play` — Google Play
- `apple` — App Store
- `itch.io` — itch.io
- `discord` — Discord

## Language Switching

Switch languages using URL parameters:

- **English**: `index.html` or `index.html?lang=en`
- **Russian**: `index.html?lang=ru`

Users can also switch languages via the globe button (🌐) in the header.

### Adding a New Language

1. Create a new JSON file: `data/portfolio_XX.json` (e.g., `portfolio_es.json` for Spanish)
2. Copy the structure from `portfolio.json` and translate all content
3. Update `supportedLanguages` array in `assets/js/portfolio.js`:
   ```javascript
   this.supportedLanguages = ['en', 'ru', 'es'];
   ```
4. Update `updateMobileNavLabels()` method with new language labels

## Debug Panel

Open `debug.html` to access the debug panel with:
- Theme and language toggle testing
- Image modal testing
- Loading simulation
- Portfolio data inspection
- Viewport and layout information
- Real-time stats (projects count, current language, layout mode)

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Architecture**: Single-page application with ModernPortfolioManager class
- **Icons**: Font Awesome 5
- **Styling**: CSS with custom properties (CSS variables)
- **No Dependencies**: Pure vanilla JavaScript (no jQuery required)

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/RomanMalyshev/Portfolio.git
   ```

2. Serve locally (any static server):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (npx)
   npx serve
   
   # Using VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"
   ```

3. Open `http://localhost:8000` in your browser

## Deployment

This portfolio is designed for GitHub Pages:

1. Push changes to your GitHub repository
2. Go to **Settings** → **Pages**
3. Select the branch to deploy (usually `main`)
4. Site will be available at `https://username.github.io/Portfolio/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Contact

- **LinkedIn**: [Roman Malyshev](https://www.linkedin.com/in/roman-m-0738211a2/)
- **GitHub**: [RomanMalyshev](https://github.com/RomanMalyshev)
- **Itch.io**: [noagard](https://noagard.itch.io/)
- **Ludum Dare**: [noagard](https://ldjam.com/users/noagard/)
- **Email**: noagard@gmail.com

## Credits

- Design inspired by [HTML5 UP](https://html5up.net/)
- Icons by [Font Awesome](https://fontawesome.com/)
