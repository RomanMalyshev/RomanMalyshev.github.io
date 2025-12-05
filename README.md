# Roman Malyshev Portfolio

A data-driven portfolio website for Roman Malyshev, a Senior Unity Developer with 7+ years of experience in the game industry.

## Features

- **Data-Driven Architecture**: All content is stored in JSON files, making it easy to update and maintain.
- **Multi-language Support**: Seamlessly switch between English and Russian using URL parameters.
- **Automatic Language Detection**: Automatically detects the user's preferred language based on browser settings.
- **Responsive Design**: Works on all devices, from mobile to desktop.
- **Dynamic Content Rendering**: Content is rendered dynamically using JavaScript.

## Structure

- `index.html`: Main entry point for the website, handles both English and Russian versions
- `data/`: Contains JSON files with all the content
  - `portfolio.json`: English content
  - `portfolio_ru.json`: Russian content
  - `social.json`: Social links and contact information
  - `styledata.json`: Theme and styling configuration
- `assets/`: Contains CSS, JavaScript, and other assets
  - `js/portfolio.js`: Main JavaScript file for rendering the portfolio
- `images/`: Contains all images used in the portfolio
- `debug.html`: Debug panel for testing the portfolio

## How to Update

### Updating Content

To update the content of the portfolio, simply edit the JSON files in the `data/` directory:

1. For English content, edit `data/portfolio.json`
2. For Russian content, edit `data/portfolio_ru.json`

### Adding a New Project

To add a new project, add a new object to the `projects` array in both JSON files:

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
  "image": "image-filename-without-extension",
  "imageThumb": "thumbnail-filename",
  "imageFull": "full-image-filename",
  "imageExtension": "png",
  "links": [
    {
      "text": "Link Text",
      "url": "https://link-url.com",
      "icon": "steam"
    }
  ]
}
```

### Adding a New Experience

To add a new experience, add a new object to the `experience` array in both JSON files:

```json
{
  "company": "Company Name",
  "url": "https://company-website.com",
  "title": "Job Title",
  "period": "Start Date - End Date",
  "location": "Location",
  "description": "Job description",
  "achievements": [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

### Adding a New Language

To add support for a new language:

1. Create a new JSON file in the `data/` directory (e.g., `portfolio_es.json` for Spanish)
2. Copy the structure from an existing language file and translate all content
3. Update the `language.available` array in both existing JSON files
4. Add the language selector to each JSON file

## Language Switching

The portfolio supports automatic language detection based on the user's browser settings. It will:

1. First check if a language is specified in the URL parameter (`?lang=en` or `?lang=ru`)
2. If not, detect the user's preferred language from browser settings
3. If the detected language is supported, use it
4. Otherwise, fall back to English as the default

You can also manually switch languages using the language selector in the UI or by using URL parameters:

- For English: `index.html?lang=en`
- For Russian: `index.html?lang=ru`

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**: jQuery, Poptrox
- **Icons**: Font Awesome
- **Styling**: SCSS with custom theming

## Deployment

This portfolio is designed to be hosted on GitHub Pages. To deploy:

1. Push the changes to your GitHub repository
2. Enable GitHub Pages in the repository settings
3. Select the branch you want to deploy (usually `main` or `master`)

## Contact

- **LinkedIn**: [Roman Malyshev](https://www.linkedin.com/in/roman-m-0738211a2/)
- **GitHub**: [RomanMalyshev](https://github.com/RomanMalyshev)
- **Itch.io**: [noagard](https://noagard.itch.io/)
- **Email**: noagard@gmail.com

## Credits

- Design based on the Strata template by [HTML5 UP](https://html5up.net/)
- Icons by [Font Awesome](https://fontawesome.com/)
