/** @type {import('next').NextConfig} */
const nextConfig = {
  // Nextjs has an issue with pdfjs-dist which optionally uses the canvas package
  // for Node.js compatibility. This causes a "Module parse failed" error when
  // building the app. Since pdfjs-dist is only used on client side, we disable
  // the canvas package for webpack
  // https://github.com/mozilla/pdf.js/issues/16214
  output: 'standalone',
  webpack: (config) => {
    // Setting resolve.alias to false tells webpack to ignore a module
    // https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  serverOptions: {
    secure: true, // Включает HTTPS
  },
  // i18n: {
  //   locales: ['kz', 'ru', 'ch'], // Список поддерживаемых языков
  //   defaultLocale: 'ru', // Язык по умолчанию
  // },
};

module.exports = nextConfig;
