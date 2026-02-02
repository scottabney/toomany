# QR Code Generator

A simple, customizable QR Code Generator web application. Create QR codes for URLs, text, contact information (vCards), and payment links with custom colors and sizes.

## Features

- **Multiple Input Types**: Support for URLs, plain text, contact info (vCard format), and payment links
- **Quick Templates**: One-click templates for common use cases
- **Color Customization**: Customize both foreground and background colors
- **Adjustable Size**: Choose QR code size from 128px to 512px
- **Download as PNG**: Export generated QR codes as PNG images
- **Clean, Modern UI**: Beautiful gradient design with smooth interactions

## Usage

1. Open `index.html` in a web browser or serve it with a local HTTP server
2. Select a template or enter your content manually
3. Customize colors and size (optional)
4. Click "Generate QR Code"
5. Download the QR code as PNG

## Running Locally

The application is ready to use - just open `index.html` in a web browser or serve it with a local HTTP server:

```bash
# Start a simple HTTP server
python3 -m http.server 8000

# Or using Node.js
npx http-server

# Then open http://localhost:8000 in your browser
```

## Building (for development)

If you modify `app.js`, rebuild the bundle:

```bash
npm install
npm run build
```

## Perfect For

- Restaurant menus
- Business cards
- Marketing materials
- Event tickets
- Product labels
- Contact sharing
- Payment links