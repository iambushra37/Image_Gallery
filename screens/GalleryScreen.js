import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {FileSystem} from 'react-native-unimodules';
import {mediaDirectory} from '../util/fs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StylesContext} from '../App';

const NUM_COLS = 3;

export default ({navigation, route}) => {
  const styles = useContext(StylesContext);

  const [files, setFiles] = useState(null);

  useEffect(async () => {
    const list = await FileSystem.readDirectoryAsync(mediaDirectory);
    const listData = list.sort((a, b) => parseInt(a.replace(/-/g, '').split('.')[0]) < parseInt(b.replace(/-/g, '').split('.')[0])).map(file => {
      return ({
        name: file,
        path: mediaDirectory + file,
        type: file.endsWith('.jpg') ? 'Image' : 'Video',
      });
    });
    console.log(`Got ${listData.length} files from ${mediaDirectory}`);
    setFiles(listData);
  }, []);

  useEffect(() => {
    if (route.params?.name) {
      console.log(`Removed ${route.params.name} from state.`);
      setFiles(files => files.filter(file => file.name !== route.params.name));
    }
  }, [route.params?.name]);

  if (files === null) {
    return (
      <SafeAreaView style={styles.default}>
        <View style={styles.centerContainer}>
          <Icon name="image-search" size={160} style={[styles.colorForeground, {marginBottom: 40}]}/>
          <Text style={[styles.textBig, styles.colorForeground]}>Scanning ...</Text>
        </View>
      </SafeAreaView>
    );
  } else if (files.length === 0) {
    return (
      <SafeAreaView style={styles.default}>
        <View style={styles.centerContainer}>
          <Icon name="no-photography" size={160} style={[styles.colorForeground, {marginBottom: 40}]}/>
          <Text style={[styles.textBig, styles.colorForeground, {marginBottom: 10}]}>No media found!</Text>
          <Text style={[styles.textBig, styles.colorForeground]}>Try taking some photos or videos.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.default}>
      <FlatList data={files} keyExtractor={item => item.name} removeClippedSubviews={true} numColumns={NUM_COLS} key="x"
                renderItem={({item, index}) => <MemoizedThumbnail item={item} index={index} onPress={() => navigation.navigate('MediaDetail', {file: item})}/>}/>
    </SafeAreaView>
  );
};

const MemoizedThumbnail = React.memo(({item, index, onPress}) => {
  const styles = useContext(StylesContext);

  // console.log(index);
  return (
    <TouchableOpacity onPress={onPress} style={{flex: 1 / NUM_COLS, padding: 3}}>
      <Image source={{uri: item.path}} style={[styles.media, {aspectRatio: 1}]} resizeMode="cover"/>
      <Text style={[styles.textXSmall, styles.backgroundColorBlack_25, {marginTop: -15, textAlign: 'center'}]}>{item.name}</Text>
      <View style={[styles.topRightFixedContainer, {margin: 3}]}>
        <Icon name={item.type === 'Image' ? 'photo' : 'local-movies'} size={16} style={styles.colorBlack_50}/>
      </View>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => prevProps.item.name === nextProps.item.name);
