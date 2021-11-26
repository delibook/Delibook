import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LibraryStack from './libraryStack';
import MypageStack from './mypageStack';
import { Home, Mypage, Bag } from '../screens';
import { Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="홈">
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'home' }),
        }}
      />
      <Tab.Screen
        name="도서관"
        component={LibraryStack}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'library' }),
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="책가방"
        component={Bag}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'bag-personal' }),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MypageStack}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: 'account' }),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
