import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import Badge from '@pages/content/ui/Badge';

export default function App({ anchorEls }: { anchorEls: HTMLAnchorElement[] }) {
  return anchorEls.map((anchorEl) => {
    const containerDiv = document.createElement('div');
    containerDiv.style.display = 'inline-block';
    anchorEl.parentNode.insertBefore(containerDiv, anchorEl);
    containerDiv.appendChild(anchorEl);

    const contentDiv = document.createElement('div');
    contentDiv.style.display = 'inline-block';
    anchorEl.after(contentDiv);

    return createPortal(<Badge url={anchorEl.href} />, contentDiv);
  });
}
