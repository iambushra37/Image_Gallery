import React, {useContext} from 'react';
import {Image} from 'react-native';
import {StylesContext} from '../App';

export default ({imageUri}) => {
  const styles = useContext(StylesContext);

  return (
    <Image source={{uri: imageUri}} style={styles.media} resizeMode="contain"/>
  );
};
