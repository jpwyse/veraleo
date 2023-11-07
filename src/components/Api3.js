import React, { useState } from "react";
import api from '../axios/api';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';


const Api3 = () => {
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tickers, setTickers] = useState([]);
  const [ticker, setTicker] = useState(null);
  const [data, setData] = useState([]);
  const [news, setNews] = useState(null);

  const handleSearch = () => {
    setLoading(true);
    api.get(`api/vcp/tickers/${query}`)
    .then((response) => {
      console.log(response.data);
      setTickers(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      setError(true);
      setLoading(false);
    });
  };

  const handleData = () => {
    setNews(null);
    setLoading(true);
    api.get(`api/vcp/data/${ticker}`)
    .then((response) => {
      console.log(response.data);
      setData(JSON.stringify(response.data));
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      setError(true);
      setLoading(false);
    });
  };

  const handleNews = () => {
    setData(null);
    setLoading(true);
    api.get(`api/vcp/news/${ticker}`)
    .then((response) => {
      console.log(response.data);
      setNews(JSON.stringify(response.data));
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      setLoading(false);
    });
  };

  const handleClear = () => {
    setQuery(null);
    setTickers([]);
    setTicker(null);
    setData(null);
    setNews(null);
    setError(false);
  };

  

  const renderTicker = () => {
    if (query && loading && tickers?.length === 0) {
      return (
        <Typography variant="body1">
          Loading...
        </Typography>
      );
    } else if (query && !loading && tickers?.length > 0) {
      return (
        <React.Fragment>
          <FormControl sx={{ minWidth: 160 }} size="small">
            <FormHelperText sx={{ ml: 0 }}>Select Ticker</FormHelperText>
            <Select
              value={ticker || ""}
              onChange={(event) => setTicker(event.target.value)}
            >
            {tickers?.map((ticker) =>        
              <MenuItem value={ticker}>{ticker}</MenuItem>
            )}
            </Select>
          </FormControl>
          { ticker ?
            <React.Fragment>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 2 }}>
                <Button
                  size="large"
                  variant="contained"
                  disabled={loading || !ticker}
                  onClick={handleData}
                  sx={{  
                    '&:hover': { 
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  Get Data
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  disabled={loading || !ticker}
                  onClick={handleNews}
                  sx={{  
                    '&:hover': { 
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  Get News
                </Button>
              </Stack>
            </React.Fragment>
          : null }
        </React.Fragment>
      );
    } else if (query && !loading && tickers?.length === 0) {
      setTimeout(() => {
        return (
          <Typography variant="body1" color="text.error">
            No tickers found based on search query.
          </Typography>
        );
      }, 3000);
    } else {
      ///pass
    }
  };


  const renderData = () => {
    if (ticker && loading && !error) {
      return (
        <Typography variant="body1">
          Loading...
        </Typography>
      );
    } else if (ticker && !loading && data && !news && !error) {
      return (
        <Typography variant="body1">
          {data}
        </Typography>
      );
    } else if (ticker && !loading && !data && news && !error) {
      return (
        <Typography variant="body1">
          {news}
        </Typography>
      );
    } else if (ticker && !loading && error) {
      return (
        <Typography variant="body1">
          Error with api.
        </Typography>
      );
    } else {
      ///pass
    }
  };


  return (
    <React.Fragment>
      <Card sx={{ width: { xs: 345, md: 645 }, minHeight: 200 }}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
          <Typography>
            API #3: "Market Research"
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <TextField 
              variant="outlined"
              size="small"
              hiddenLabel
              placeholder="Search Public Company"
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
              onClick={handleSearch}
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
          <Typography variant="body1">
            Response:
          </Typography>
          {renderTicker()}
          {renderData()}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Api3;
