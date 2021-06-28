import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

// import Icon from 'react-native-vector-icons/MaterialIcons';

const CompletedTasks = props => {
  const {id, task, themeStyle, onNotCompleteTask} = props;
  return (
    <View style={styles.taskWrapper}>
      <TouchableOpacity
        onPress={() => {
          onNotCompleteTask(id);
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
    paddingRight: 50,
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
    backgroundColor: 'skyblue',
  },
  task: {
    fontSize: 16,
    paddingVertical: 15,
    textDecorationLine: 'line-through',
  },
});

export default CompletedTasks;
