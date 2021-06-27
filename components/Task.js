import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Task = props => {
  const {task, themeStyle} = props;
  return (
    <View style={styles.taskWrapper}>
      <View style={styles.circle}></View>
      <Text style={{...styles.task, color: themeStyle.textColor}}>{task}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    width: '100%',
  },
  circle: {
    height: 20,
    width: 20,
    borderWidth: 1.6,
    borderRadius: 10,
    borderColor: 'gray',
    marginRight: 16,
    marginLeft: 24,
  },
  task: {
    fontSize: 16,
  },
});

export default Task;
