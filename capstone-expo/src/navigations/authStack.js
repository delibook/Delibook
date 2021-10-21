import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Join, Mypage, Home, PhoneCode, ShowId } from '../screens';
import FindId from '../screens/findId';

const Stack = createStackNavigator();

const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="로그인"
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.headerTintColor,
      }}
    >
      <Stack.Screen
        name="로그인"
        component={Login}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="Join"
        component={Join}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Mypage"
        component={Mypage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="아이디찾기"
        component={FindId}
      />
      <Stack.Screen
        name="휴대폰인증"
        component={PhoneCode}
      />
      <Stack.Screen
        name="아이디"
        component={ShowId}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
