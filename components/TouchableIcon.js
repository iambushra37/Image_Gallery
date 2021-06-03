import {TouchableHighlight, View} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StylesContext} from '../App';

export default ({onPress, name, size, buttonStyle = {}, iconStyle = {}}) => {
  const styles = useContext(StylesContext);

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.buttonIconContainer, buttonStyle]}>
        <Icon name={name} size={size} style={[styles.buttonIcon, iconStyle]}/>
      </View>
    </TouchableHighlight>
  );
};
