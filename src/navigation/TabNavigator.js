import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import WelcomeScreen from '../screens/WelcomeScreen';
import CoursesScreen from '../screens/CoursesScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 8,
        },
        headerStyle: {
          backgroundColor: theme.colors.card,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 3,
        },
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
          color: theme.colors.text,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={WelcomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          headerTitle: 'UoM Course Finder',
        }}
      />
      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          tabBarLabel: 'Courses',
          tabBarIcon: ({ color, size }) => (
            <Feather name="grid" size={size} color={color} />
          ),
          headerTitle: 'All Courses',
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
          headerTitle: 'Saved Courses',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerTitle: 'My Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
