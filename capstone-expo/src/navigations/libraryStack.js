import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BookList, LibraryList, Information } from '../screens';

const Stack = createStackNavigator();

const LibraryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Library"
    >
      <Stack.Screen 
        name="도서관목록" 
        component={LibraryList} 
      />
      <Stack.Screen 
      name="도서목록" 
      component={BookList} 
      options={({ navigation, route }) => ({ 
        headerTitle: route.params.name,
      })}/>
      <Stack.Screen name="편의정보" component={Information} />
    </Stack.Navigator>
  );
};

export default LibraryStack;
