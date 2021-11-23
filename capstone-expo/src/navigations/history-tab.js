import React from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {LoanHistory, ReturnHistory} from '../screens';

const Tab = createMaterialTopTabNavigator();

const HistoryTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="대출내역" component={LoanHistory} options={{unmountOnBlur: true,}} />
            <Tab.Screen name="반납내역" component={ReturnHistory} options={{unmountOnBlur: true,}} />
        </Tab.Navigator>
    );
}

export default HistoryTab;