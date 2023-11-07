import React from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Api1 from '../components/Api1';
import Api2 from '../components/Api2';
import Api3 from '../components/Api3';

const ApiPage = () => {
  return (
    <React.Fragment>
      <Stack direct="column" alignItems="center" justifyContent="flex-start" spacing={4} sx={{ mb: 4 }}>
        <Stack direct="column" alignItems="center" justifyContent="flex-start" spacing={1}>
          <Typography align="center" variant="h4" color="primary">
            Veraleo Capital Software Engineer Take Home
          </Typography>
          <Typography>
            by James Wyse
          </Typography>
        </Stack>
        <Api1 />
        <Api2 />
        <Api3 />
      </Stack>
    </React.Fragment>
  );
};

export default ApiPage;
