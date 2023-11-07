import React from "react";
import MainLayout from '../layouts/MainLayout';
import ApiPage from '../pages/ApiPage';

const routes = () => [
  { 
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <ApiPage /> },
    ],
  },
];

export default routes;