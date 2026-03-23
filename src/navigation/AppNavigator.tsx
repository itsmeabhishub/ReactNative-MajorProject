import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login     from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Inventory from '../screens/Inventory';
import AddItem   from '../screens/AddItem';
import Tickets   from '../screens/Tickets';
import Settings  from '../screens/Settings';

import { colors } from '../theme';

// ─── Param Lists ──────────────────────────────────────────────────────────────
export type RootStackParamList = {
  Login: undefined;
  Main:  undefined;
};

// Inventory ka apna stack — AddItem iske andar hai
export type InventoryStackParamList = {
  InventoryList: undefined;
  AddItem:       undefined;
};

export type TabParamList = {
  Dashboard:      undefined;
  InventoryStack: undefined;
  Tickets:        undefined;
  Settings:       undefined;
};

// ─── Navigators ───────────────────────────────────────────────────────────────
const RootStack      = createNativeStackNavigator<RootStackParamList>();
const Tab            = createBottomTabNavigator<TabParamList>();
const InventoryStack = createNativeStackNavigator<InventoryStackParamList>();

// Inventory ka apna Stack Navigator
// Inventory List → AddItem (back button bhi aayega)
function InventoryNavigator(): React.JSX.Element {
  return (
    <InventoryStack.Navigator screenOptions={{ headerShown: false }}>
      <InventoryStack.Screen name="InventoryList" component={Inventory} />
      <InventoryStack.Screen name="AddItem"        component={AddItem} />
    </InventoryStack.Navigator>
  );
}

// Bottom Tab Navigator
function MainTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor:   colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          borderTopColor:  colors.border,
          backgroundColor: colors.card,
        },
        tabBarIcon: ({ size }: { size: number }) => {
          const icons: Record<string, string> = {
            Dashboard:      '📊',
            InventoryStack: '📦',
            Tickets:        '🎫',
            Settings:       '⚙️',
          };
          return <Text style={{ fontSize: size - 4 }}>{icons[route.name]}</Text>;
        },
        tabBarLabel: ({ color }: { color: string }) => {
          const labels: Record<string, string> = {
            Dashboard:      'Dashboard',
            InventoryStack: 'Inventory',
            Tickets:        'Tickets',
            Settings:       'Settings',
          };
          return (
            <Text style={{ fontSize: 10, color, marginBottom: 2 }}>
              {labels[route.name]}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard"      component={Dashboard} />
      <Tab.Screen name="InventoryStack" component={InventoryNavigator} />
      <Tab.Screen name="Tickets"        component={Tickets} />
      <Tab.Screen name="Settings"       component={Settings} />
    </Tab.Navigator>
  );
}

// Root Navigator
export default function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Main"  component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
