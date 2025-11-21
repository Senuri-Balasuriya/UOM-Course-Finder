import React from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

function AppContent() {
  const { isDarkMode } = useTheme();
  
  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F4F6' }}>
            <ActivityIndicator size="large" color="#1E3A8A" />
          </View>
        }
        persistor={persistor}
      >
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
