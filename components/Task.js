import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const Task = props => {
  const {id, task, themeStyle, onCompleteTask} = props;
  return (
    <View style={styles.taskWrapper}>
      <TouchableOpacity
        onPress={() => {
          onCompleteTask(id);
        }}>
        <View style={styles.circle}></View>
      </TouchableOpacity>
      <Text
        style={{...styles.task, color: themeStyle.textColor}}
        numberOfLines={2}>
        {task}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 120,
    width: '90%',
    paddingRight: 30,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  circle: {
    height: 20,
    width: 20,
    borderWidth: 1.6,
    borderRadius: 10,
    borderColor: 'gray',
    marginRight: 16,
  },
  task: {
    fontSize: 16,
    paddingVertical: 15,
  },
});

export default Task;
