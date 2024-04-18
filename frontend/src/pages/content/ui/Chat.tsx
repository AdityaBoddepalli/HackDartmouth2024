import { useCallback, useEffect, useState } from "react";
import { 
   Box,
   Button,
   Flex,
   Heading,
   HStack,
   Input,
   Stack,
   Text,
   Textarea,
   IconButton,
   CardFooter
} from "@chakra-ui/react";
import { getChatResponse } from "../../../api/content";
import getSessionToken from "../../../../utils/sessionTokenStorage";
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';

export default function Chat({ url, domainName, title }: { url: string, domainName: string, title: string }) {
   const [chats, setChats] = useState<{isUser: boolean, message: string}[]>([]);
   const [isFetching, setIsFetching] = useState(false);
   const [inputText, setInputText] = useState("");

   // useEffect(() => {
   //    const controller = new AbortController();
   //    getChatResponse(url,)
   // }, []);

   const onSendClick = useCallback(() => {
      if (inputText.trim() === "") return;
      setChats((prev) => [...prev, { isUser: true, message: inputText }]);
      setInputText("");
      setIsFetching(true);
      console.log(chats)
      getChatResponse(getSessionToken(), url, chats.at(-1).message)
         .then((response) => {
            setChats((prev) => [...prev, { isUser: false, message: response }]);
         })
         .catch((err) => {
            console.log("error fetching chat response", err);
         })
         .finally(() => {
            setIsFetching(false);
         });
   }, []);

   // useEffect(() => { console.log(inputText) }, [inputText])

   return (
      <Stack>
         <Stack overflowY="scroll" flex="1" alignItems="center" justifyContent="center">
            {chats.length < 1 ? (<></>) : (
               chats.map(({ isUser, message }) => (
                  <Stack direction="row" width="100%">
                     <Stack alignItems="center">
                        {isUser ? <PersonIcon /> : <GavelIcon />}
                     </Stack>
                     <Stack spacing="10px">
                        <Text fontWeight={700} fontSize="18px">{isUser ? "You" : "Clause"}</Text>
                        <Text>{message}</Text>
                     </Stack>
                  </Stack>
               ))
            )}
         </Stack>
         {/* #2257A0 */}
         <Stack direction="row" alignItems="center">
            <Textarea 
               display="block" 
               resize="none" 
               value={inputText} 
               onChange={(e) => { setInputText(e.target.value); }} 
               placeholder={`Any questions regarding ${domainName}'s ${title}?`}
            />
            <IconButton 
               icon={<SendIcon />}
               disabled={isFetching}
               onClick={() => {
                  if (inputText.trim() === "") return;
                  setChats((prev) => [...prev, { isUser: true, message: inputText }]);
                  setInputText("");
                  // const controller = new AbortController();
                  setIsFetching(true);
                  console.log(chats)
                  getChatResponse(url, chats.at(-1).message)
                     .then((response) => {
                        console.log("aaaa",response);
                        setChats((prev) => [...prev, { isUser: false, message: response }]);
                     })
                     .catch((err) => {
                        console.log("error fetching chat response", err);
                     })
                     .finally(() => {
                        setIsFetching(false);
                     });
               }}
            />
         </Stack>
      </Stack>
   );
}