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
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from '../components/Task';
import CompletedTask from '../components/CompletedTask';
import CompletedSection from '../components/CompletedSection';

const windowWidth = Dimensions.get('window').width;

const Home = props => {
  const {themeStyle, isDarkMode, onSetTheme} = props;

  const [task, setTask] = React.useState(null);
  const [taskItems, setTaskItems] = React.useState([]);
  const [completedTasks, setCompletedTasks] = React.useState([]);

  const [isCompletedSelected, setIsCompletedSelected] = React.useState(false);

  const handleAddTask = () => {
    if (task !== null && task !== '') {
      setTaskItems(taskItems => [task, ...taskItems]);
      setTask(null);
    }
  };

  const handleDeleteTask = taskIndex => {
    let itemsCopy = [...completedTasks];
    itemsCopy.splice(taskIndex, 1);
    setCompletedTasks(itemsCopy);
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

  const handleOpenCompleted = () => {
    setIsCompletedSelected(!isCompletedSelected);
  };

  // storing tasks data locally
  React.useEffect(async () => {
    try {
      const jsonValue = JSON.stringify({
        tasksList: await taskItems,
        completedTasksList: await completedTasks,
      });
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
      console.log('storing tasks doesnt work', e);
    }
  }, [completedTasks, taskItems]);

  // loading stored tasks data
  React.useEffect(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const tasksObj =
        jsonValue != null
          ? JSON.parse(jsonValue)
          : console.log('tasks is empty');
      console.log(tasksObj);
      setTaskItems(tasksObj.tasksList);
      setCompletedTasks(tasksObj.completedTasksList);
      console.log('loaded stored tasks successfully');
    } catch (e) {
      // error reading value
      console.log('loading stored tasks data doesnt work');
    }
  }, []);

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
              }}>
              <Icon
                name={isDarkMode ? 'wb-sunny' : 'brightness-3'}
                size={30}
                color={themeStyle.textColor}
              />
            </View>
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
          {completedTasks.length !== 0 ? (
            <View style={styles.sectionLine}></View>
          ) : null}
          {completedTasks.length !== 0 ? (
            <CompletedSection
              numOfTasks={completedTasks.length}
              themeStyle={themeStyle}
              isCompletedSelected={isCompletedSelected}
              onOpenCompleted={handleOpenCompleted}
            />
          ) : null}
          {isCompletedSelected
            ? completedTasks.map((item, index) => {
                return (
                  <CompletedTask
                    key={index}
                    themeStyle={themeStyle}
                    task={item}
                    id={index}
                    onNotCompleteTask={handleNotCompleteTask}
                    onDeleteTask={handleDeleteTask}
                  />
                );
              })
            : null}
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
    justifyContent: 'center',
    alignItems: 'center',
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
    bottom: '45%',
    zIndex: -1,
  },
  sectionLine: {
    width: windowWidth,
    marginLeft: -30,
    height: 1,
    backgroundColor: 'lightgray',
  },
});

export default Home;
