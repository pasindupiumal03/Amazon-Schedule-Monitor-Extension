# ReactJS Chrome Extension Template

A modern, production-ready template for building Chrome extensions with ReactJS, TailwindCSS, and Webpack.

## Features

- ⚛️ **React 18** - Modern React with hooks and functional components
- 🎨 **TailwindCSS** - Utility-first CSS framework for rapid styling
- 📦 **Webpack 5** - Modern bundling with development and production configs
- 🔄 **Hot Reload** - Development mode with file watching
- 🎯 **Manifest V3** - Latest Chrome extension API
- 🌟 **Shadow DOM** - Isolated content script rendering
- 💾 **Storage Controller** - Easy Chrome storage API integration
- 🔧 **Cross-browser** - Chrome and Firefox compatibility
- 📱 **Responsive** - Mobile-friendly popup design

## Project Structure

```
├── public/
│   └── manifest.json          # Extension manifest
├── src/
│   ├── popup.jsx             # Extension popup component
│   ├── popup.html            # Popup HTML template
│   ├── content.jsx           # Content script entry
│   ├── background.jsx        # Background service worker
│   ├── shadowRoot.jsx        # Shadow DOM content injection
│   ├── App.jsx               # Main app component for content
│   ├── index.css             # Popup styles
│   ├── shadow-root.css       # Content script styles
│   ├── assets/
│   │   ├── icons/            # Extension icons
│   │   └── fonts/            # Custom fonts
│   ├── controllers/
│   │   └── storageController.js  # Chrome storage utilities
│   └── utils/
│       └── browser.js        # Cross-browser compatibility
├── webpack.config.js         # Base webpack configuration
├── webpack.dev.js           # Development webpack config
├── webpack.prod.js          # Production webpack config
├── babel.config.json        # Babel configuration
├── tailwind.config.js       # TailwindCSS configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this template
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

1. Start development mode with file watching:
   ```bash
   npm run dev
   ```

2. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

### Production Build

Build for production:
```bash
npm run build
```

## Usage

### Popup Extension
The main popup interface is defined in `src/popup.jsx`. This appears when users click the extension icon.

### Content Script
Content scripts run on web pages and can inject UI elements. The template includes Shadow DOM setup for isolated styling.

### Background Script
Background scripts handle extension lifecycle events, API calls, and communication between components.

### Storage
Use the storage controller for persistent data:
```javascript
import { saveToStorage, getFromStorage } from './controllers/storageController.js';

// Save data
await saveToStorage({ key: 'value' });

// Get data
const data = await getFromStorage(['key']);
```

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for popup styles
- Update `src/shadow-root.css` for content script styles

### Permissions
Add required permissions in `public/manifest.json`:
```json
{
  "permissions": ["storage", "activeTab", "tabs"]
}
```

### Icons
Replace icons in `src/assets/icons/` with your own (16px, 32px, 48px, 64px, 128px).

## Browser Compatibility

- ✅ Chrome (Manifest V3)
- ✅ Firefox (with minor adjustments)
- ⚠️ Edge (Chromium-based)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please create an issue in the repository.