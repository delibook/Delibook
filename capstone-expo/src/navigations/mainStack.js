import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Mypage, Complete } from '../screens';
import TabNavigation from './bottom-tab';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {
          //IOS
          shadowColor: '#a6a6a6',
          shadowOffset: {
            height: 4,
          },
          //ANDROID
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 10,
        },
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={TabNavigation} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Mypage" component={Mypage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="반납내역" component={LoanHistory} />
    </Stack.Navigator>
  );
};

export default MainStack;
