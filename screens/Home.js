import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';

import Task from '../components/Task';
import CompletedTask from '../components/CompletedTask';

const windowHeight = Dimensions.get('window').height;

const Home = props => {
  const {themeStyle, isDarkMode, onSetTheme} = props;

  const [task, setTask] = React.useState(null);
  const [taskItems, setTaskItems] = React.useState([]);
  const [completedTasks, setCompletedTasks] = React.useState([]);

  const handleAddTask = () => {
    if (task !== null && task !== '') {
      setTaskItems(taskItems => [task, ...taskItems]);
      setTask(null);
    }
  };

  const handleCompleteTask = taskIndex => {
    let itemsCopy = [...taskItems];
    setCompletedTasks(completedTasks => [
      taskItems[taskIndex],
      ...completedTasks,
    ]);
    itemsCopy.splice(taskIndex, 1);
    setTaskItems(itemsCopy);
  };

  const handleNotCompleteTask = taskIndex => {
    let itemsCopy = [...completedTasks];
    setTaskItems(taskItems => [completedTasks[taskIndex], ...taskItems]);
    itemsCopy.splice(taskIndex, 1);
    setCompletedTasks(itemsCopy);
  };

  React.useEffect(() => {
    console.log(taskItems, completedTasks);
  }, [completedTasks]);

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
      <ScrollView style={{width: '100%'}}>
        <View style={styles.tasksContainer}>
          {taskItems.map((item, index) => {
            return (
              <Task
                key={index}
                themeStyle={themeStyle}
                task={item}
                id={index}
                onCompleteTask={handleCompleteTask}
              />
            );
          })}
          {completedTasks.map((item, index) => {
            return (
              <CompletedTask
                key={index}
                themeStyle={themeStyle}
                task={item}
                id={index}
                onNotCompleteTask={handleNotCompleteTask}
              />
            );
          })}
        </View>
      </ScrollView>

      {/* Writing a Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.taskInputWrapper}>
        <TextInput
          style={{
            ...styles.input,
            color: themeStyle.textColor,
            backgroundColor: themeStyle.secBackgroundColor,
          }}
          placeholder={'New task'}
          placeholderTextColor={'gray'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask} activeOpacity={0.8}>
          <View
            style={{
              ...styles.addButton,
              backgroundColor: themeStyle.secBackgroundColor,
            }}>
            <Text
              style={{...styles.addButtonText, color: themeStyle.textColor}}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Empty Screen */}
      {taskItems.length === 0 && completedTasks.length === 0 ? (
        <View style={{...styles.emptyScreen}}>
          <Text
            style={{
              color: themeStyle.textColor,
              fontWeight: 'bold',
              fontSize: 16,
              marginBottom: 10,
            }}>
            A fresh start
          </Text>
          <Text style={{color: '#888'}}>Anything to add?</Text>
        </View>
      ) : (
        <></>
      )}
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
  tasksContainer: {
    paddingHorizontal: 30,
    paddingBottom: 100,
  },
  taskInputWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    width: '75%',
    fontSize: 16,
    paddingHorizontal: 15,
    borderRadius: 25,
    // shadow
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  addButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // shadow
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  addButtonText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  emptyScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: windowHeight * 0.45,
    zIndex: -1,
  },
});

export default Home;
