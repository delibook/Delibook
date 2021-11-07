import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BookList, LibraryList } from '../screens';
import BookTab from './bookStack';

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
      <Stack.Screen name="도서목록" component={BookList} />
    </Stack.Navigator>
  );
};

export default LibraryStack;
