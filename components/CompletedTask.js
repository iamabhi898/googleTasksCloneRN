import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const CompletedTasks = props => {
  const {id, task, themeStyle, onNotCompleteTask, onDeleteTask} = props;
  return (
    <View style={styles.taskWrapper}>
      <View style={styles.leftItems}>
        <TouchableOpacity
          onPress={() => {
            onNotCompleteTask(id);
          }}>
          <View style={styles.doneIcon}>
            <Icon name="done" size={30} color={themeStyle.blueTintColor} />
          </View>
        </TouchableOpacity>
        <Text
          style={{...styles.task, color: themeStyle.textColor}}
          numberOfLines={2}>
          {task}
        </Text>
      </View>
      <Icon
        name="delete"
        size={30}
        color={'gray'}
        style={styles.deleteIcon}
        onPress={() => {
          onDeleteTask(id);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 120,
    width: '90%',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  doneIcon: {
    marginRight: 10,
    marginLeft: -5,
    padding: 0,
  },
  leftItems: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  task: {
    fontSize: 16,
    paddingVertical: 15,
    textDecorationLine: 'line-through',
    paddingRight: 20,
  },
  deleteIcon: {
    right: -45,
    opacity: 0.7,
  },
});

export default CompletedTasks;
