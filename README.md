# Bootmaker

An Alpine.js-powered single-page application inspired by Lucchese Bootmaker. It showcases dynamic product browsing with a clean, responsive UI.

## Stack

- HTML/CSS
- Tailwind CSS
- Alpine.js
- JSON Server (for mock API endpoints)

## Getting Started

1. Clone the repository:
```
git clone https://github.com/Kuba-Jeziorski/bootmaker-project
cd bootmaker-project
```

2. Install dependencies:
```
npm install
```

3. Run mock APIs in separate terminals:

- Terminal 1 (Boots API):
```
npx json-server --watch ./data/boots.json --port 8000
```

- Terminal 2 (Recommended API):
```
npx json-server --watch ./data/recommended.json --port 9000
```

4. Start the development server:
```npm run dev```

## Features

- Dynamic content fetching — minimal hardcoded data, populated via API.
- Switch between product variants using clickable color thumbnails.
- Interactive sidebar for selecting size, width, and calf width.
- Gallery images open in a modal on click.
- “Show more media” button reveals additional gallery images.
- Tailwind-powered accordion for product details (Description, Material, Care).
- Dynamically loaded recommended products section.
