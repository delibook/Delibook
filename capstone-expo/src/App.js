import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import { ProgressProvider } from './contexts';
import Navigation from './navigations';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ProgressProvider>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </ProgressProvider>
    </ThemeProvider>
  );
};

export default App;
