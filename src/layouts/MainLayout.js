import React from "react";
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const MainLayout = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', background: '#DCDCDC', minHeight: '100vh', width: '100vw' }}>
      <Container disableGutters maxWidth="lg" sx={{ p: 0, background: 'none', height: '100%', width: '100%', mt: 5 }}>
	       <Outlet />
      </Container>
		</Box>
	);
};

export default MainLayout;