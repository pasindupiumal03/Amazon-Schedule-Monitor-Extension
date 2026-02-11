# Amazon Schedule Monitor Extension

A specialized Chrome Extension designed to automate the process of monitoring Amazon hiring pages for available shift schedules.

## 🚀 Overview

This extension solves the problem of endlessly refreshing Amazon hiring pages waiting for slots to open. It intelligently monitors the page for the "Unable to fetch headcount request" error message and automatically reloads exactly when new schedules become available.

### Key Features

*   **Smart Monitoring**: Checks the page status every 1 second without aggressive reloading.
*   **Instant Reaction**: triggers a page reload immediately when the "No Schedules" error disappears.
*   **Anti-Detection**: Designed to mimic human behavior and avoid rate-limiting.
*   **403 Recovery**: Automatically detects if your IP is temporarily blocked (CloudFront 403) and pauses operations for 60 seconds to recover.
*   **Background Operation**: Works perfectly while you browse other tabs or minimize the window.

## 🛠 Usage

1.  **Install the Extension**:
    *   Clone this repository.
    *   Run `npm install` and `npm run build`.
    *   Load the `dist` folder as an unpacked extension in Chrome (`chrome://extensions`).

2.  **Start Automating**:
    *   Click the extension icon.
    *   Paste the Amazon Hiring link (e.g., `https://hiring.amazon.ca/...`).
    *   Click **Start Automating**.
    *   The page will open. Leave it open (you can use other tabs).

3.  **How it Works**:
    *   If no schedules are available (Error visible): It waits effectively.
    *   If schedules appear (Error gone): It reloads the page instantly to show you the shifts.

## 📦 Project Structure

*   `src/popup.jsx`: Modern React UI with glassmorphism design.
*   `src/content.jsx`: The core logic engine that injects into Amazon pages.
*   `src/background.jsx`: Service worker for handling extension lifecycle.
*   `manifest.json`: Configuration V3 manifest.

## 🔧 Building from Source

To modify or build the project yourself:

```bash
# Install dependencies
npm install

# Run development server (watch mode)
npm run dev

# Build for production
npm run build
```

## ⚠️ Disclaimer

This tool is for educational purposes. Use responsibly and be aware of website terms of service regarding automated access.