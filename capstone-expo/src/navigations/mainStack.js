import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Login, Mypage, Complete, Information, MyLibrary} from '../screens';
import TabNavigation from './bottom-tab';
import HistoryTab from './history-tab';


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
      <Stack.Screen 
        name="주문완료" 
        component={Complete} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="이용내역" component={HistoryTab} />
      <Stack.Screen name="상세페이지" component={Information} />
      <Stack.Screen name="내 도서관" component={MyLibrary} />
    </Stack.Navigator>
  );
};

export default MainStack;
