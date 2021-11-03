import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { BookList, Information } from '../screens'

const Tab = createMaterialTopTabNavigator();

const BookTab = () => {
    return (
        <Tab.Navigator>
          <Tab.Screen name="BookList" component={BookList} />
          <Tab.Screen name="Information" component={Information} />
        </Tab.Navigator>
    );
};

export default BookTab;
