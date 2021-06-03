import React, {useContext, useEffect} from 'react';
import {BackHandler, SafeAreaView, View} from 'react-native';
import MediaReviewButtons from '../components/MediaReviewButtons';
import VideoViewer from '../components/VideoViewer';
import {deleteFile} from '../util/fs';
import {StylesContext} from '../App';

export default ({navigation, route}) => {
  const styles = useContext(StylesContext);
  const {videoUri} = route.params;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      deleteFile(videoUri);
      return false;
    });
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.defaultBlack}>
      <View style={styles.flex1}>
        <VideoViewer videoUri={videoUri} navigation={navigation}/>
        <MediaReviewButtons mediaType="Video" uri={videoUri} navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};
