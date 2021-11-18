import React from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {LoanHistory, ReturnHistory} from '../screens';

const Tab = createMaterialTopTabNavigator();

const HistoryTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="대출내역" component={LoanHistory}/>
            <Tab.Screen name="반납내역" component={ReturnHistory}/>
        </Tab.Navigator>
    );
}

export default HistoryTab;