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
        name="회원가입"
        component={Join}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="마이페이지"
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
      <Stack.Screen
        name="홈"
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
