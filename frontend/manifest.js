// import icon128 from "./src/assets/img/icon-128.png";
// import icon32 from "./src/assets/img/icon-32.png";

import fs from 'node:fs';
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: 'en',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: 'TnC Crawler', // __MSG_extensionName__
  version: packageJson.version,
  description: '', // __MSG_extensionDescription__
  permissions: [
    'storage', 
    // 'sidePanel', 
    'activeTab', 
    'scripting'
  ],
  // side_panel: {
  //   default_path: 'src/pages/sidepanel/index.html',
  // },
  options_page: 'src/pages/options/index.html',
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon32.png',
  },
  // chrome_url_overrides: {
  //   newtab: 'src/pages/newtab/index.html',
  // },
  icons: {
    16: 'icon16.png',
    32: 'icon32.png'
  },
  content_scripts: [
    // {
    //   matches: ['http://*/*', 'https://*/*', '<all_urls>'],
    //   js: ['src/pages/contentInjected/index.js'],
    //   // KEY for cache invalidation
    //   css: ['assets/css/contentStyle<KEY>.chunk.css'],
    // },
    {
      run_at: "document_end",
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/contentUI/index.js'],
    },
  ],
  devtools_page: 'src/pages/devtools/index.html',
  web_accessible_resources: [
    {
      resources: [
        'assets/js/*.js', 
        'assets/css/*.css',
        // "localhost:3000/*", // TODO: add api url
        // "*"
      ],
      matches: ["<all_urls>"],
    },
  ],
};

export default manifest;
