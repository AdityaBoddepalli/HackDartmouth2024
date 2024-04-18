import { useEffect, useMemo, useState } from 'react';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
   PopoverHeader,
   PopoverBody,
   PopoverFooter,
   PopoverArrow,
   PopoverCloseButton,
   IconButton,
   Portal,
   Box,
   Heading,
   Text,
   Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator,
   Stack,
   useDisclosure
} from '@chakra-ui/react';
import { BounceLoader as BounceLoader } from 'react-spinners';

import { getSummary } from '../../../api/content';
import getSessionToken from '../../../../utils/sessionTokenStorage';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import GavelIcon from '@mui/icons-material/Gavel';
import Chat from './Chat';
import Summary from './Summary';

export default function Badge({ url, title }: { url: string, title: string }) {
   const [data, setData] = useState<{status: string, summary: string} | null>(null);
   const [isFetching, setIsFetching] = useState(false);
   const domainName = useMemo(() => {
      let domain: string | string[] = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[1].split('.');
      domain = domain[domain.length - 2] ?? domain[0];
      return domain[0].toUpperCase() + domain.slice(1).toLowerCase();
   }, []);
   const { isOpen, onToggle, onClose } = useDisclosure(
      // {isOpen: url === 'https://www.amazon.com/gp/help/customer/display.html/ref=ap_register_notification_condition_of_use?ie=UTF8&nodeId=508088'}
   );

   // useEffect(() => {
   //    const controller = new AbortController();
   //    getSummary(url, controller.signal).then(setData);
   //    return () => {
   //       controller.abort();
   //    }
   // }, [])

   return (
      <Box className="tnc-crawler-content-container">
         <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
               {/* <div style={{ backgroundColor: "green", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer" }} /> */}
               {isFetching
                  ? (<BounceLoader size={25} speedMultiplier={1.2} color='#2257A0' />)
                  : (<button
                        type='button'
                        style={{ 
                           cursor: "pointer", 
                           backgroundColor: "#2257A0", 
                           border: "none", 
                           borderRadius: "50%", 
                           width: "25px", 
                           height: "25px",
                           marginLeft: "2px",
                           marginBottom: "2px"
                        }}
                        onClick={() => {
                           if (isOpen) {
                              onToggle();
                              return;
                           }
                           setIsFetching(true);
                           getSummary(getSessionToken(), url)
                              .then(setData)
                              .finally(() => { 
                                 setIsFetching(false); 
                                 onToggle(); 
                              });
                        }}
                     >
                        <GavelIcon fontSize='18px' sx={{color:'white'}} />
                     </button>)
               }
            </PopoverTrigger>
            <Portal>
               <PopoverContent minW="500px"sx={{"&:focus": {boxShadow: "none"}}}>
                  <Tabs isFitted position='relative' variant='line'>
                     <PopoverArrow />
                     {/* <Stack direction="row" alignItems="center" justifyContent="space-between"> */}
                        <PopoverHeader fontWeight={700} fontSize="16px" minW="fit-content">{domainName}'s {title}</PopoverHeader>
                        <PopoverCloseButton />
                     {/* </Stack> */}
                     <PopoverBody height="50vh" maxh="500px" overflow="auto">
                        <TabPanels>
                           <TabPanel p="0px">
                              <Summary data={data} />
                           </TabPanel>
                           <TabPanel p="0px" overflow="hidden">
                              <Chat url={url} title={title} domainName={domainName} />
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
   );
}