import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Address, Mypage } from '../screens';

const Stack = createStackNavigator();

const MypageStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="마이페이지"
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
      <Stack.Screen name="마이페이지" component={Mypage} />
      <Stack.Screen name="주소설정" component={Address} />
    </Stack.Navigator>
  );
};

export default MypageStack;
