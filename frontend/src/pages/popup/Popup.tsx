import React from 'react';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { Checkbox, CheckboxGroup, Stack, Box, Grid } from '@chakra-ui/react';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <div
      className="App"
      style={{
      backgroundColor: theme === 'light' ? '#fff' : '#000',
      }}>
      <Box className="gridContainer" p={4}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <Box gridColumn="2 / span 1">
          <h3> Terms of Service - Preferences/Filters</h3>          
          <CheckboxGroup colorScheme="green">
              <Stack spacing={1.5}>
                <Checkbox value="usageGuidelines">Usage Guidelines</Checkbox>
                <Checkbox value="thirdPartyServices">Third-Party Services</Checkbox>
                <Checkbox value="userContent">User Content</Checkbox>
                <Checkbox value="payment">Payment</Checkbox>
                <Checkbox value="termination">Termination</Checkbox>
                <Checkbox value="generalSummaryTOS">General Summary</Checkbox>
              </Stack>
          </CheckboxGroup>
          </Box>
          <Box gridColumn="4 / span 1">
            <h3> Privacy Policy - Preferences/Filters</h3>
            <CheckboxGroup colorScheme="green">
              <Stack spacing={1.5}>
                <Checkbox value="personalDataCollected">Personal Data Collected</Checkbox>
                <Checkbox value="userRights">User Rights</Checkbox>
                <Checkbox value="internationalData">International Data</Checkbox>
                <Checkbox value="cookies">Cookies</Checkbox>
                <Checkbox value="contact">Contact</Checkbox>
                <Checkbox value="generalSummaryPP">General Summary</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </Grid>
      </Box>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occured </div>);

{/* <a
className="App-link"
href="https://reactjs.org"
target="_blank"
rel="noopener noreferrer"
style={{ color: theme === 'light' && '#0281dc', marginBottom: '10px' }}>
Learn React!
</a> */}