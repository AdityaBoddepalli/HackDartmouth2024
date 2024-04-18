import { useEffect, useState } from 'react';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
   PopoverHeader,
   PopoverBody,
   PopoverFooter,
   PopoverArrow,
   PopoverCloseButton,
   PopoverAnchor,
   Portal,
   Box,
   Heading,
   Text,
   Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator,
   Stack
} from '@chakra-ui/react';
import { BounceLoader as BounceLoader } from 'react-spinners';

import { getSummary } from '../../../api/content';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import Chat from './Chat';

export default function Badge({ url, title }: { url: string, title: string }) {
   const [data, setData] = useState<{status: string, summary: string} | null>(null);

   useEffect(() => {
      const controller = new AbortController();
      getSummary(url, controller.signal).then(setData);
      return () => {
         controller.abort();
      }
   }, [])
   console.log(data?.summary);

   return (data === null
      ? (<BounceLoader size={20} speedMultiplier={1.2} color='blue' />)
      : (
         <Box className="tnc-crawler-content-container">
            <Popover>
               <PopoverTrigger>
                  <div style={{ backgroundColor: "green", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer" }} />
               </PopoverTrigger>
               <Portal>
                  <PopoverContent minW="400px"sx={{"&:focus": {boxShadow: "none"}}}>
                     <Tabs isFitted position='relative' variant='line'>
                        <PopoverArrow />
                        {/* <Stack direction="row" alignItems="center" justifyContent="space-between"> */}
                           <PopoverHeader fontWeight={700} fontSize="16px" minW="fit-content">{window.location.hostname.slice(0,4) === 'www.' ? window.location.hostname.slice(4) : window.location.hostname}'s {title}</PopoverHeader>
                           <PopoverCloseButton />
                        {/* </Stack> */}
                        <PopoverBody height="50vh" maxh="500px" overflowY="scroll">
                           <TabPanels>
                              <TabPanel px="15px" py="5px">
                                 <Text dangerouslySetInnerHTML={{ __html: data.summary }} />
                              </TabPanel>
                              <TabPanel p="0px">
                                 <Chat url={url} />
                              </TabPanel>
                           </TabPanels>
                        </PopoverBody>
                        <PopoverFooter p="0px" height="50px">
                           <TabList height="50px">
                              <Tab>Summary</Tab>
                              <Tab>Chat</Tab>
                           </TabList>
                           <TabIndicator />
                        </PopoverFooter>
                     </Tabs>
                  </PopoverContent>
               </Portal>
            </Popover>
         </Box>
      )
   );
}