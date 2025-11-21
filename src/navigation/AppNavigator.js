import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DetailsScreen from '../screens/DetailsScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
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
          headerTintColor: theme.colors.primary,
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: 'Create Account',
                headerBackTitle: 'Back',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="MainTabs"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{
                title: 'Course Details',
                headerBackTitle: 'Back',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
