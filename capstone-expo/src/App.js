import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import TabNavigation from './navigations/bottom-tab';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <TabNavigation style={{ alignItem: 'center' }} />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
