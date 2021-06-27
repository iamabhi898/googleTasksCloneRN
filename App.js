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

import Home from './screens/Home';

const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const themeStyle = {
    backgroundColor: isDarkMode ? '#202124' : 'white',
    textColor: isDarkMode ? 'white' : 'black',
    secBackgroundColor: isDarkMode ? '#35363A' : 'white',
  };

  const onSetTheme = isDark => {
    setIsDarkMode(isDark);
  };

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
