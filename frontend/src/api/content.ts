import axios from 'axios';
// import fetchAdapter from '@vespaiach/axios-fetch-adapter';

// const axios = axiosOG.create({
//    adapter: fetchAdapter
// })

export async function getSummary(sid: string, url: string, signal?: AbortSignal) {
   // await new Promise((resolve) => setTimeout(resolve, 2000));
   return axios.post('https://dc19-185-187-243-245.ngrok-free.app/summarize', { sid, url }, { headers: { "ngrok-skip-browser-warning": "6024" }, signal })
      .then((res) => {
         console.log(res);
         return res.data;
      })
      .catch(console.log);
}

export async function getChatResponse(sid: string, url: string, message: string, signal?: AbortSignal) {
   // await new Promise((resolve) => setTimeout(resolve, 2000));
   return axios.post('https://dc19-185-187-243-245.ngrok-free.app/chat', { sid, question: message }, { headers: { "ngrok-skip-browser-warning": "6024" }, signal })
      .then((res) => res.data)
      .catch(console.log);
}
