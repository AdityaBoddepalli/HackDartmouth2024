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
   const [chats, setChats] = useState<string[]>([]);
   const [isFetching, setIsFetching] = useState(false);
   const [inputText, setInputText] = useState("");

   // useEffect(() => {
   //    const controller = new AbortController();
   //    getChatResponse(url,)
   // }, []);

   return (
      <Stack direction="column">
         <Box overflowY="scroll" flexGrow="1">

         </Box>
         <Stack direction="row" alignItems="center" flexGrow="0">
            <Textarea 
               display="inline-block" 
               resize="none" 
               value={inputText} 
               onChange={(e) => { setInputText(e.target.value); }} 
               placeholder={`Any questions regarding ${domainName}'s ${title}?`}
            />
            {/* <Box display="inline-block" height="80px" border="1px solid rgb(226, 232, 240)"> */}
               <IconButton icon={<SendIcon />} />
            {/* </Box> */}
         </Stack>
      </Stack>
   );
}