# Portfolio Website Template

A modern, responsive portfolio website template inspired by professional portfolio designs. Built with Bootstrap 4, this template features smooth animations, a fixed sidebar navigation, and a clean, professional look.

## Features

- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Fixed Sidebar Navigation**: Easy navigation with smooth scrolling
- **Portfolio Filter**: Filter projects by category
- **Image Lightbox**: View portfolio images in a popup gallery
- **Contact Form**: Ready-to-use contact form
- **Modern Animations**: Smooth transitions and hover effects
- **Clean Code**: Well-organized and commented code
- **Easy to Customize**: Simple structure for easy customization

## Template Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Custom styles
├── js/
│   └── script.js          # Custom JavaScript
├── assets/
│   └── images/            # Images folder
│       ├── profile.jpg    # Profile picture
│       ├── portfolio-01.jpg to portfolio-06.jpg
│       └── README.md      # Image guidelines
└── README.md              # This file
```

## Sections

1. **Sidebar Navigation**
   - Profile picture
   - Name and title
   - Navigation menu
   - Social media links

2. **About Me**
   - Introduction
   - Highlights and achievements

3. **What I'm Good At**
   - Skills showcase with icons
   - Four skill items

4. **My Work**
   - Portfolio grid with filter
   - Six portfolio items
   - Image lightbox

5. **Project 1 & 2**
   - Detailed project descriptions
   - What you learned sections

6. **Contact Me**
   - Contact information
   - Contact form

## How to Customize

### 1. Personal Information

Open `index.html` and update:
- Your name (line 35-36)
- Your title/profession (line 37)
- About me text (section1)
- Skills (section2)
- Projects (section3)
- Contact details (section6)

### 2. Images

Replace placeholder images in `assets/images/`:
- `profile.jpg` - Your profile picture (400x400px recommended)
- `portfolio-01.jpg` to `portfolio-06.jpg` - Your project screenshots (800x600px recommended)

### 3. Colors

Edit `css/style.css` to change the color scheme:
```css
:root {
    --primary-color: #f13a11;      /* Main accent color */
    --secondary-color: #2a2a2a;    /* Secondary color */
    --text-color: #666;            /* Text color */
    --light-bg: #f8f9fa;          /* Light background */
    --dark-bg: #1a1a1a;           /* Dark background (sidebar) */
}
```

### 4. Social Media Links

Update social media links in the sidebar (around line 45-48 in index.html):
```html
<a href="your-facebook-url"><i class="fab fa-facebook-f"></i></a>
<a href="your-twitter-url"><i class="fab fa-twitter"></i></a>
<a href="your-linkedin-url"><i class="fab fa-linkedin-in"></i></a>
<a href="your-github-url"><i class="fab fa-github"></i></a>
```

### 5. Portfolio Items

Update portfolio items in section3:
- Change images
- Update titles and descriptions
- Modify `data-category` attributes for filtering

### 6. Contact Form

The contact form currently shows an alert. To make it functional:
- Set up a backend service (PHP, Node.js, etc.)
- Or use a form service like Formspree, EmailJS, or Netlify Forms
- Update the JavaScript in `js/script.js` (see commented section)

## Technologies Used

- HTML5
- CSS3
- JavaScript (jQuery)
- Bootstrap 4.2.1
- Font Awesome 5.15.4
- Google Fonts (Lato)
- Magnific Popup (for image lightbox)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to Settings > Pages
3. Select your branch and save
4. Your site will be live at `https://username.github.io/repository-name/`

### Netlify
1. Drag and drop your folder to Netlify
2. Or connect your GitHub repository
3. Your site will be deployed automatically

### Other Hosting
Upload all files to your web server via FTP or hosting control panel.

## Quick Start

1. **Clone or download** this template
2. **Open index.html** in your browser to preview
3. **Customize** the content, images, and colors
4. **Test** on different devices
5. **Deploy** to your hosting service

## Customization Tips

- Keep your content concise and focused
- Use high-quality images (optimized for web)
- Update meta tags for SEO
- Add your favicon
- Test navigation and form functionality
- Ensure all links work correctly

## Support

For questions or issues, please refer to the documentation or check:
- Bootstrap documentation: https://getbootstrap.com/docs/4.2/
- Font Awesome icons: https://fontawesome.com/icons
- jQuery documentation: https://jquery.com/

## License

This template is free to use for personal and commercial projects. No attribution required.

## Credits

- Design inspired by modern portfolio layouts
- Built with Bootstrap and open-source libraries
- Placeholder images created with SVG

---

**Note**: Remember to replace all placeholder content with your actual information before publishing!

Happy building! 🚀
