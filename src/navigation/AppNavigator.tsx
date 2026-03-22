import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login     from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Inventory from '../screens/Inventory';
import AddItem   from '../screens/AddItem';
import Tickets   from '../screens/Tickets';
import Settings  from '../screens/Settings';

import {colors} from '../theme';
import {RootStackParamList, AppStackParamList, TabParamList} from '../types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AppStack  = createNativeStackNavigator<AppStackParamList>();
const Tab       = createBottomTabNavigator<TabParamList>();

const tabIcons: Record<keyof TabParamList, string> = {
  Dashboard: '📊',
  Inventory: '📦',
  Tickets:   '🎫',
  Settings:  '⚙️',
};

function MainTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor:   colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          borderTopColor:  colors.border,
          backgroundColor: colors.card,
        },
        tabBarIcon: ({size}: {size: number}) => (
          <Text style={{fontSize: size - 4}}>{tabIcons[route.name]}</Text>
        ),
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Inventory" component={Inventory} />
      <Tab.Screen name="Tickets"   component={Tickets} />
      <Tab.Screen name="Settings"  component={Settings} />
    </Tab.Navigator>
  );
}

function AppStackNavigator(): React.JSX.Element {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="MainTabs" component={MainTabs} />
      <AppStack.Screen name="AddItem"  component={AddItem} />
    </AppStack.Navigator>
  );
}

export default function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="App"   component={AppStackNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
