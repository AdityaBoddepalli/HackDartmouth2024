import { createRoot } from 'react-dom/client';
import App from '@pages/content/ui/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectedStyle from './injected.css?inline';

import CustomChakraProvider from '@pages/content/ui/CustomChakraProvider';
import EmotionCacheProvider from '@pages/content/ui/EmotionCacheProvider';
import Badge from '@pages/content/ui/Badge';

refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);


const legalDocumentRegex = /\bagreement\b|\bprivacy policy\b|\bprivacy notice\b|\bcookie policy\b|\bterms and conditions\b|\bterms & conditions\b|\bt&c\b|\bconditions of use\b|\bterms of service\b/i;
const anchorEls = Array.from(document.getElementsByTagName('a')).filter((anchorEl) => legalDocumentRegex.test(anchorEl.innerText));

createRoot(rootIntoShadow).render(
   <EmotionCacheProvider rootId={root.id}>
      <CustomChakraProvider shadowRootId={rootIntoShadow.id}>
         <App anchorEls={anchorEls} />
         {/* <Badge url="https://www.google.com/" /> */}
      </CustomChakraProvider>
   </EmotionCacheProvider>
);
