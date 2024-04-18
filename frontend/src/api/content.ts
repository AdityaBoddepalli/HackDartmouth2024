import axios from 'axios';

export async function getSummary(sid: string, url: string, signal?: AbortSignal) {
   // await new Promise((resolve) => setTimeout(resolve, 2000));
   return {
      category: 'Healthcare',
      average_rating: 2,
      summary: [
         "Aacah f auehfiouahwef uaiwhefuh weuhf aiuwehfyaw f f awhef awfu awu fuiaw fu awifu hiuwHE FUIW HF",
         "IBasdbfe uhefu eufh au hefiuah fuahweiufh ao hfua sfha usifhaiuww fhai hfi fi awfiu",
         "IUBdf aouf aouehf oaih efu auehf aoueh fuaeh fuah efah iuef h9wh d"
      ],
      features: ["Personal Data", "Information Collected", "Information Disclosed"],
      ratings: [3, 2, 5],
      explanations: [
         "Aacah f auehfiouahwef uaiwhefuh weuhf aiuwehfyaw f f awhef awfu awu fuiaw fu awifu hiuwHE FUIW HF",
         "IBasdbfe uhefu eufh au hefiuah fuahweiufh ao hfua sfha usifhaiuww fhai hfi fi awfiu",
         "IUBdf aouf aouehf oaih efu auehf aoueh fuaeh fuah efah iuef h9wh d"
      ]
   };
}

export async function getChatResponse(sid: string, url: string, message: string, signal?: AbortSignal) {
   await new Promise((resolve) => setTimeout(resolve, 2000));
   return `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
}