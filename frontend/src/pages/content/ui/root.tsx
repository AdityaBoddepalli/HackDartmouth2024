import { createRoot } from 'react-dom/client';
import { createPortal } from "react-dom";
import Badge from '@pages/content/ui/Badge';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectedStyle from './injected.css?inline';

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from '@chakra-ui/react';
import '@fontsource/open-sans';
import '@fontsource/raleway';
import CustomChakraProvider from '@pages/content/ui/CustomChakraProvider';
import EmotionCacheProvider from '@pages/content/ui/EmotionCacheProvider';

const theme = extendTheme({
   fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Raleway', sans-serif`,
   },
});

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


const legalDocumentRegex = /\bagreement\b|\bprivacy policy\b|\bprivacy notice\b|\bcookie policy\b|\bterms and conditions\b|\bterms & conditions\b|\bterms of use\b|\bt&c\b|\bconditions of use\b|\bterms of service\b/i;
const anchorEls = Array.from(document.getElementsByTagName('a')).filter((anchorEl) => legalDocumentRegex.test(anchorEl.innerText));

createRoot(rootIntoShadow).render(
   <ChakraProvider theme={theme}>
      {anchorEls.map((anchorEl) => {
         const containerDiv = document.createElement('div');
         containerDiv.style.display = 'inline-block';
         anchorEl.parentNode.insertBefore(containerDiv, anchorEl);
         containerDiv.appendChild(anchorEl);

         const contentDiv = document.createElement('div');
         contentDiv.style.display = 'inline-block';
         anchorEl.after(contentDiv);

         return createPortal(<Badge url={anchorEl.href} title={anchorEl.innerText} />, contentDiv);
      })}
   </ChakraProvider>
);