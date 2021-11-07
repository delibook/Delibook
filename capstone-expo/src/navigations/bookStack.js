import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { BookList, Information } from '../screens'

const Tab = createMaterialTopTabNavigator();

const BookTab = () => {
    return (
        <Tab.Navigator
          initialRouteName="도서"
        >
          <Tab.Screen name="도서" component={BookList} />
          <Tab.Screen name="편의정보" component={Information} />
        </Tab.Navigator>
    );
};

export default BookTab;
