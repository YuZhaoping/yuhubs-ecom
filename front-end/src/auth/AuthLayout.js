import React from 'react';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';


import Header from 'Components/Header';
import Footer from 'Components/Footer';

import {
  AppContent,
  MainContent
} from '../app/appStyles';


const AuthLayout = (props) => {
  const { width } = props;

  return (
    <AppContent>
      <Header />
      <MainContent p={isWidthUp("md", width) ? 8 : 6}>
        ...TODO...
      </MainContent>
      <Footer />
    </AppContent>
  );
};

export default withWidth()(AuthLayout);