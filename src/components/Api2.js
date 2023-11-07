import React, { useState } from "react";
import api from '../axios/api';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';


const Api2 = () => {
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleClick = () => {
    setLoading(true);
    api.get(`api/vcp/wiki/${query}`)
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

  const handleClear = () => {
    setQuery(null);
    setData(null);
  }

  return (
    <React.Fragment>
      <Card sx={{ width: { xs: 345, md: 645 }, minHeight: 200 }}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
          <Typography>
            API #2: "Wiki Query"
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <TextField 
              variant="outlined"
              size="small"
              hiddenLabel
              placeholder="Search Wikipedia"
              value={query || ""}
              onChange={(event) => setQuery(event.target.value)}
              InputProps={{
                endAdornment: (
                  query ?
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClear}
                        edge="end"
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  : null
                ),
              }}
              sx={{ width: 250 }}
            />
            <Button
              size="large"
              variant="contained"
              disabled={!query}
              onClick={handleClick}
              sx={{  
                '&:hover': { 
                  transform: 'scale(1.05)',
                }
              }}
            >
              Search
            </Button>
          </Stack>
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

export default Api2;
