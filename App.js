/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  // useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './screens/Home';

const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // loading stored theme preference
  const getStoredDarkThemeData = async () => {
    try {
      const value = await AsyncStorage.getItem('@isDarkMode');
      if (value !== null) {
        // value previously stored
        const isTrueSet = value === 'true';
        setIsDarkMode(isTrueSet);
      }
    } catch (e) {
      // error reading value
      console.log('loading stored theme doesnt work', e);
    }
  };

  const themeStyle = {
    backgroundColor: isDarkMode ? '#202124' : 'white',
    textColor: isDarkMode ? 'white' : 'black',
    secBackgroundColor: isDarkMode ? '#35363A' : 'white',
    blueTintColor: '#4285F4',
  };

  // storing theme preference
  const onSetTheme = async isDark => {
    try {
      setIsDarkMode(isDark);
      const val = isDark.toString();
      await AsyncStorage.setItem('@isDarkMode', val);
    } catch (e) {
      console.log('storing theme doesnt work', e);
    }
  };
  React.useEffect(() => {
    getStoredDarkThemeData();
  }, []);

  return (
    <SafeAreaView
      style={{
        ...styles.screen,
        backgroundColor: themeStyle.backgroundColor,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={themeStyle.backgroundColor}
      />
      <Home
        themeStyle={themeStyle}
        isDarkMode={isDarkMode}
        onSetTheme={onSetTheme}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
