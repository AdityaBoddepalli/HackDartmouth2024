import { useEffect, useState } from "react";
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
   IconButton
} from "@chakra-ui/react";
import { getChatResponse } from "../../../api/content";
import SendIcon from '@mui/icons-material/Send';

type MessageProps = {
   text: string;
   actor: 'user' | 'bot';
 };
 const Message = ({ text, actor }: MessageProps) => {
   return (
     <Flex
       p={4}
       bg={actor === 'user' ? 'blue.500' : 'gray.100'}
       color={actor === 'user' ? 'white' : 'gray.600'}
       borderRadius="lg"
       w="fit-content"
       alignSelf={actor === 'user' ? 'flex-end' : 'flex-start'}
     >
       <Text>{text}</Text>
     </Flex>
   );
};

export default function Chat({ url, domainName, title }: { url: string, domainName: string, title: string }) {
   const [chats, setChats] = useState<{isUser: boolean, message: string}[]>([]);
   const [isFetching, setIsFetching] = useState(false);
   const [inputText, setInputText] = useState("");

   // useEffect(() => {
   //    const controller = new AbortController();
   //    getChatResponse(url,)
   // }, []);

   return (
      <Stack>
         <Stack overflowY="scroll" flex="1" alignItems="center">
            {chats.length < 1 ? (<></>) : (
               chats.map(({ isUser, message }) => (
                  <Stack direction="row">
                     <Box>
                        p
                     </Box>
                  </Stack>
               ))
            )}
         </Stack>
         <Box position="relative">
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
               position="absolute"
               right="20"
               onClick={(e) => {
                  if (inputText.trim() === "") return;
                  setChats((prev) => [...prev, { isUser: true, message: inputText }]);
                  setInputText("");
                  const controller = new AbortController();
                  setIsFetching(true);
                  getChatResponse(url, chats.at(-1).message, controller.signal)
                     .then((response) => {
                        setChats((prev) => [...prev, { isUser: false, message: response }]);
                     })
                     .catch((err) => {
                        console.log("error fetching chat response", err);
                     })
                     .finally(() => {
                        setIsFetching(false);
                     });
                  return (() => {
                     controller.abort();
                  });
               }}
            />
         </Box>
      </Stack>
   );
}