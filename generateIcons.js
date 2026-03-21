const svg2img = require('svg2img');
const fs = require('fs');
const path = require('path');

const ICON_SIZE = 81; // 81x81 pixels for sharp rendering on high-DPI displays

// Colors
const COLOR_INACTIVE = '#666666';
const COLOR_ACTIVE = '#1677ff';

const icons = {
  home: {
    inactive: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" fill="none" stroke="${COLOR_INACTIVE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    active: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" fill="${COLOR_ACTIVE}" stroke="${COLOR_ACTIVE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22" fill="#fff"></polyline></svg>`
  },
  publish: {
    inactive: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" fill="none" stroke="${COLOR_INACTIVE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    active: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" fill="${COLOR_ACTIVE}" stroke="${COLOR_ACTIVE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="${COLOR_ACTIVE}"></path><circle cx="12" cy="10" r="3" fill="#fff" stroke="#fff"></circle></svg>`
  },
  chat: {
    inactive: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" fill="none" stroke="${COLOR_INACTIVE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
    active: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" fill="${COLOR_ACTIVE}" stroke="${COLOR_ACTIVE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="${COLOR_ACTIVE}"></path></svg>`
  },
  profile: {
    inactive: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" fill="none" stroke="${COLOR_INACTIVE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    active: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" fill="${COLOR_ACTIVE}" stroke="${COLOR_ACTIVE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="${COLOR_ACTIVE}"></path><circle cx="12" cy="7" r="4" fill="${COLOR_ACTIVE}"></circle></svg>`
  }
};

const outputDir = path.join(__dirname, 'assets', 'icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

Object.keys(icons).forEach(iconName => {
  ['inactive', 'active'].forEach(state => {
    const svgString = icons[iconName][state];
    const fileName = state === 'inactive' ? `${iconName}.png` : `${iconName}-active.png`;
    const filePath = path.join(outputDir, fileName);

    svg2img(svgString, { width: ICON_SIZE, height: ICON_SIZE }, (error, buffer) => {
      if (error) {
        console.error(`Failed to generate ${fileName}:`, error);
      } else {
        fs.writeFileSync(filePath, buffer);
        console.log(`Successfully generated ${fileName}`);
      }
    });
  });
});
