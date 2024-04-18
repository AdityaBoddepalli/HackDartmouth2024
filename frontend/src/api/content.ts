import axios from 'axios';
import { Converter } from 'showdown';

export async function getSummary(url: string, signal: AbortSignal) {
   const mdConverter = new Converter();
   await new Promise((resolve) => setTimeout(resolve, 2000));
   return {
      status: 'green',
      summary: mdConverter.makeHtml(`- **Security Responsibility**: Users are responsible for keeping their account access secure.
      - **Liability Limits**: Robinhood isn't liable for unauthorized access or system failures.
      - **Access Rights**: Robinhood can restrict or terminate accounts at any time without notice.
      - **Electronic Communications**: Users agree to receive documents and communications electronically.
      - **Contact Information**: Users must keep their contact details current.
      - **Governing Law**: Governed by California law, with some federal and FINRA regulations also applicable.`),
   };
}

export async function getChatResponse(url: string, message: string, signal: AbortSignal) {
   await new Promise((resolve) => setTimeout(resolve, 2000));
   return `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
}