import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Mypage from '../screens/mypage';
import Join from '../screens/join';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'home' }),
        }}
      />
      <Tab.Screen
        name="도서관"
        component={Join}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'library' }),
        }}
      />
      <Tab.Screen
        name="책가방"
        component={Home}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'bag-personal' }),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={Join}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'account' }),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;