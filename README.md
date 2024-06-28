# 20-20-20 Rule Chrome Extension

## Overview

This Chrome extension helps reduce eye strain by reminding users to follow the 20-20-20 rule. According to the rule, every 20 minutes, you should look at an object 20 feet away for 20 seconds. The extension displays a popup with an "Activate" button that starts a 20-minute timer. When the timer reaches 0, the screen is covered with a black overlay for 20 seconds, instructing you to take a break. After the break, the timer resets.

## Features

- **Activate/Deactivate Timer**: Start and stop a 20-minute countdown.
- **Overlay Notification**: Display a black screen for 20 seconds when the timer expires.
- **Automatic Reset**: The timer resets after the 20-second break.

## Installation

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/your-repo/20-20-20-rule-extension.git
   ```
2. **Download the folder**

3. **Open Chrome Extensions Page**:
   Navigate to `chrome://extensions/` in your Chrome browser.

4. **Enable Developer Mode**:
   Toggle the switch for "Developer mode" in the top right corner.

5. **Load Unpacked Extension**:
   Click on "Load unpacked" and select the cloned repository folder.

## File Structure

```
20-20-20-rule-extension/
│
├── manifest.json
├── background.js
├── popup.html
├── popup.js
├── content.js
├── style.css
└── icons/
    ├── icon16.png
    ├── icon48.png
    ├── icon128.png
```

## File Descriptions

- **manifest.json**: Configuration file that defines the extension's metadata and permissions.
- **background.js**: Manages the background tasks and timers.
- **popup.html**: HTML for the extension's popup interface.
- **popup.js**: Handles the popup's functionality and timer logic.
- **content.js**: Injects the overlay into the web pages.
- **style.css**: Styles for the popup and overlay.
- **icons/**: Contains icons for the extension in different sizes.

## Usage

1. **Activate the Timer**:
   - Click the extension icon in the Chrome toolbar.
   - Click the "Activate" button in the popup to start the 20-minute timer.

2. **Deactivate the Timer**:
   - Click the "Deactivate" button in the popup to stop the timer.

3. **Overlay Notification**:
   - When the 20-minute timer reaches 0, a black overlay will cover the screen for 20 seconds.

## Development

### Adding Features

To add new features or modify existing ones, follow these steps:

1. **Edit the Code**:
   - Make changes to the relevant files (`background.js`, `popup.js`, `content.js`, etc.).

2. **Reload the Extension**:
   - Go to the Chrome Extensions page (`chrome://extensions/`).
   - Click the "Reload" button next to the extension.

### Debugging

To debug the extension:

1. **Open Developer Tools**:
   - Right-click on the extension icon and select "Inspect popup" to debug the popup.
   - Go to the Chrome Extensions page, click "background page" under the extension to debug the background script.

2. **Check Console for Errors**:
   - Look for any errors or logs in the console to identify issues.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with descriptive messages.
4. Open a pull request to merge your changes.


