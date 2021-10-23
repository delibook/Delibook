import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack';
import MainStack from './mainStack';
import { Spinner } from '../components';
import { ProgressContext, UserContext } from '../contexts';

const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);
  const { user } = useContext(UserContext);
  console.log(user.token);

  return (
    <NavigationContainer>
      {user?.token ? <MainStack /> : <AuthStack />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
