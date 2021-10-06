import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import TabNavigation from './navigations/bottom-tab';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigations';
import { Text } from 'react-native';
import { ProgressProvider } from './contexts';

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
