# AWS SAA-C03 Study Materials Website

A clean, responsive website for hosting AWS Solutions Architect Associate (SAA-C03) exam study materials.

## Features

- Responsive design that works on both desktop and mobile devices
- Navigation menu with sections for different study materials
- Search functionality to find specific topics
- Download option for Markdown files
- AWS-themed color scheme
- Clean and professional appearance

## Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── content/           # Directory containing markdown content
│   ├── study-guide.md
│   ├── practice-questions.md
│   ├── tricky-questions.md
│   ├── strategies.md
│   └── ultimate-guide.md
└── README.md          # This file
```

## Setup

1. Create a directory for your website
2. Copy all the files from this repository
3. Add your markdown content files to the `content/` directory
4. Serve the files using a web server

### Local Development

You can use any local web server to test the website. Here are a few options:

1. Using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. Using Node.js:
   ```bash
   # Install http-server globally
   npm install -g http-server
   
   # Run the server
   http-server
   ```

3. Using VS Code:
   Install the "Live Server" extension and click "Go Live" in the bottom right corner.

## Content Management

### Adding New Content

1. Create a new markdown file in the `content/` directory
2. Add the corresponding section in `index.html`
3. Update the navigation menu in `index.html`

### Markdown Format

The website supports standard markdown syntax. Here's a quick reference:

```markdown
# Heading 1
## Heading 2
### Heading 3

- Bullet points
- Another point

1. Numbered list
2. Second item

**Bold text**
*Italic text*

`Code`

```code block```

> Blockquote
```

## Customization

### Colors

The website uses AWS-themed colors defined in CSS variables:

```css
:root {
    --aws-blue: #232F3E;
    --aws-orange: #FF9900;
    --aws-light-blue: #0073BB;
    --aws-gray: #545B64;
    --aws-light-gray: #F2F3F3;
    --white: #FFFFFF;
}
```

You can modify these colors in `styles.css` to match your preferences.

### Layout

The layout is controlled by CSS Grid and Flexbox in `styles.css`. You can modify the layout by adjusting the CSS properties.

## Browser Support

The website is built with modern web standards and should work in all recent browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License. 