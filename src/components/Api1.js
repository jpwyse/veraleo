import React, { useState } from "react";
import api from '../axios/api';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Api1 = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleClick = () => {
    setLoading(true);
    api.get('api/vcp/check')
    .then((response) => {
      console.log(response.data);
      setData(JSON.stringify(response.data));
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      setData("Error");
      setLoading(false);
    });
  };

  return (
    <React.Fragment>
      <Card sx={{ width: { xs: 345, md: 645 }, minHeight: 200 }}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" spacing={1} sx={{ p: 1 }}>
          <Typography>
            API #1: "Creator"
          </Typography>
          { !data ?
            <Button
              variant="contained"
              size="large"
              onClick={handleClick}
              sx={{  
                '&:hover': { 
                  transform: 'scale(1.05)',
                }
              }}
            >
              Get
            </Button>
          : 
            <Button
              variant="contained"
              size="large"
              onClick={() => setData(null)}
              sx={{  
                '&:hover': { 
                  transform: 'scale(1.05)',
                }
              }}
            >
              Clear
            </Button>
          }
        </Stack>
        <Divider />
        <CardContent>
          <Stack direction="column" alignItems="flex-start" justifyContent="flex-start" spacing={2}>
            <Typography variant="body1">
              Response:
            </Typography>
            { !data && loading ?
              <Typography variant="body1">
                Loading...
              </Typography>
            : 
              <Typography variant="body1" color="text.secondary">
                {data}
              </Typography>
            }
          </Stack>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Api1;
