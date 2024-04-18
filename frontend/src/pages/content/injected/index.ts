/**
 * DO NOT USE import someModule from '...';
 *
 * @issue-url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/160
 *
 * Chrome extensions don't support modules in content scripts.
 * If you want to use other modules in content scripts, you need to import them via these files.
 *
 */
import('@pages/content/injected/toggleTheme');


const legalDocumentRegex = /\bagreement\b|\bprivacy policy\b|\bprivacy notice\b|\bcookie policy\b|\bterms and conditions\b|\bterms & conditions\b|\bt&c\b|\bconditions of use\b|\bterms of service\b/i;
const anchorEls = Array.from(document.getElementsByTagName('a'));

for (let anchorEl of anchorEls) {
   // if the anchor text does not contain any of the legal document keywords, skip
   if (!(legalDocumentRegex.test(anchorEl.innerText))) continue;

   
}