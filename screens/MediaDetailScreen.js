import React, {useContext, useEffect} from 'react';
import ImageViewer from '../components/ImageViewer';
import VideoViewer from '../components/VideoViewer';
import {Alert, SafeAreaView, ToastAndroid, View} from 'react-native';
import TouchableIcon from '../components/TouchableIcon';
import {deleteFile} from '../util/fs';
import {StylesContext} from '../App';

export default ({navigation, route}) => {
  const {name, path, type} = route.params.file;
  const styles = useContext(StylesContext);

  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  const Media = () => {
    if (type === 'Image')
      return <ImageViewer imageUri={path}/>;
    else
      return <VideoViewer videoUri={path} navigation={navigation}/>;
  };

  const deleteMedia = () => {
    Alert.alert(
      '',
      'Confirm deletion?',
      [{
        text: 'Cancel',
      }, {
        text: 'OK',
        onPress: async () => {
          await deleteFile(path);
          ToastAndroid.show(`${type} deleted!`, ToastAndroid.SHORT);
          navigation.navigate('Gallery', {name});
        },
      }],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={styles.default}>
      <View style={styles.flex1}>
        <Media/>
        <View style={[styles.horizontalButtonContainer, styles.bottomFixedContainer]}>
          <TouchableIcon onPress={deleteMedia} name={'delete'} size={40}/>
        </View>
      </View>
    </SafeAreaView>
  );
};
