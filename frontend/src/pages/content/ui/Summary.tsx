import { CircularProgress, Box, Text, Stack, Center } from '@chakra-ui/react';


export default function Summary({ data }) {


   return data != undefined && (
      <Box px="5px" py="10px" overflowY="scroll">
         <Stack direction="row" justifyContent="space-evenly">
            <Text zIndex={2}>{data.summary[0]}</Text>
            <Stack alignItems="center" justifyContent="center">
               <Text zIndex={2} fontWeight={700} fontSize="16px" mt="-5px">{data.category}</Text>
               <DonutGraph 
                  value={data.average_rating}
               />
            </Stack>
         </Stack>
         <Stack direction="row" justifyContent="space-evenly" mt="-40px">
            <Text zIndex={2}>{data.summary[1]}</Text>
            <Stack alignItems="center" justifyContent="center" mt="-20px">
               <Text fontWeight={700} fontSize="16px" mt="-5px"zIndex={2} textAlign="center">{data.features[1]}</Text>
               <DonutGraph 
                  value={data.ratings[1]}
               />
            </Stack>
         </Stack>
         <Stack direction="row" justifyContent="space-evenly" mt="-40px">
            <Text zIndex={2}>{data.summary[2]}</Text>
            <Stack alignItems="center" justifyContent="center" mt="-20px">
               <Text fontWeight={700} fontSize="16px" mt="-5px"zIndex={2} textAlign="center">{data.features[2]}</Text>
               <DonutGraph 
                  value={data.ratings[2]}
               />
            </Stack>
         </Stack>
      </Box>
   );
}

const DonutGraph = ({ value }) => {
   const color = value === 5 ? 'rgb(44, 193, 44)' : value === 4 ? 'rgb(136, 184, 50)' : value === 3 ? 'rgb(224, 167, 20)' : value === 2 ? 'rgb(208, 103, 33)' : 'rgb(190, 30, 38)';
   return (
      <Box position="relative" mt="-25px">
         <CircularProgress
            value={(value / 5) * 50}
            size={40}
            color={color}
            sx={{
               transform: "rotate(-90deg)",
               position: "relative",
               zIndex: 0,
               "&:after": {
                  zIndex: 1,
                  content: '""',
                  width: "80px",
                  height: "235px",
                  position: "absolute",
                  bottom: "5px",
                  left: "2px",
                  bgColor: "white",
                  borderRadius: "50px 50 50 50px"
               }
            }}
         />
         <Text 
            fontWeight={700}
            position="absolute"
            fontSize="35px"
            sx={{
               top: "30px",
               left: "70px"
            }}
         >
            {value}
         </Text>
      </Box>
   )
};