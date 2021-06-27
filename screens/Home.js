import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Task from '../components/Task';

const Home = props => {
  const {themeStyle, isDarkMode, onSetTheme} = props;
  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        {/* List Title */}
        <View style={styles.titleContainer}>
          <Text
            style={{...styles.title, color: themeStyle.textColor}}
            numberOfLines={1}>
            My Tasks
          </Text>
        </View>
        {/* Theme Icon */}
        <View style={styles.themeIconContainer}>
          <TouchableOpacity onPress={() => onSetTheme(!isDarkMode)}>
            <View
              style={{
                ...styles.themeIcon,
                backgroundColor: themeStyle.textColor,
              }}></View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Todo List */}
      <Task themeStyle={themeStyle} task="Workout" />
      <Task themeStyle={themeStyle} task="Meditate" />
      <Task themeStyle={themeStyle} task="Count calories" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'pink',
  },
  header: {
    flexDirection: 'row',
    height: 80,
    width: '100%',
    // backgroundColor: 'skyblue',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  titleContainer: {
    // backgroundColor: 'yellow',
    paddingLeft: 30,
    width: '80%',
  },
  title: {
    fontSize: 32,
  },
  themeIconContainer: {
    // backgroundColor: 'lightgreen',
  },
  themeIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

export default Home;
