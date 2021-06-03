import React, {useContext, useEffect} from 'react';
import {BackHandler, SafeAreaView, View} from 'react-native';
import ImageViewer from '../components/ImageViewer';
import MediaReviewButtons from '../components/MediaReviewButtons';
import {deleteFile} from '../util/fs';
import {StylesContext} from '../App';


export default ({navigation, route}) => {
  const styles = useContext(StylesContext);
  const {imageUri} = route.params;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      deleteFile(imageUri);
      return false;
    });
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.defaultBlack}>
      <View style={styles.flex1}>
        <ImageViewer imageUri={imageUri}/>
        <MediaReviewButtons mediaType="Image" uri={imageUri} navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};
