import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;

const CompletedSection = props => {
  const {numOfTasks, themeStyle, isCompletedSelected, onOpenCompleted} = props;
  return (
    <TouchableNativeFeedback
      onPress={onOpenCompleted}
      background={TouchableNativeFeedback.Ripple('lightgray', false)}>
      <View style={styles.wrapper}>
        <Text style={{...styles.text, color: themeStyle.textColor}}>
          Completed ({numOfTasks})
        </Text>
        <Icon
          name={isCompletedSelected ? 'expand-less' : 'expand-more'}
          size={30}
          color={'gray'}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: windowWidth,
    marginLeft: -30,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CompletedSection;
