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
   Textarea
} from "@chakra-ui/react";
import { getChatResponse } from "../../../api/content";

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

export default function Chat({ url }: { url: string }) {
   const [chats, setChats] = useState<string[]>([]);
   const [isFetching, setIsFetching] = useState(false);
   const [inputText, setInputText] = useState("");

   // useEffect(() => {
   //    const controller = new AbortController();
   //    getChatResponse(url,)
   // }, []);

   return (
      <Stack>
         <Box overflowY="scroll">

         </Box>
         <Box>
            <Textarea  />
         </Box>
      </Stack>
   );
}