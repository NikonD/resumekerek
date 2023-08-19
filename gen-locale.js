const fs = require('fs');
const glob = require('glob');

const translations = {};

glob.sync('./src/**/*.tsx').forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/t\(["'](.*?)["']\)/g);

  if (matches) {
    matches.forEach((match) => {
      const key = match.match(/t\(["'](.*?)["']\)/)[1];
      translations[key] = key; // Use the key itself as the initial translation
    });
  }
});

// Write translations to JSON files
const languages = ['en', 'ru']; // Add more languages as needed

languages.forEach((lang) => {
  fs.writeFileSync(`./public/locales/${lang}.json`, JSON.stringify(translations, null, 2));
});