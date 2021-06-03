import React, { useContext } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import TouchableIcon from '../components/TouchableIcon';
import useDoubleBackExit from '../util/useDoubleBackExit';
import { StylesContext } from '../App';

export default ({ navigation }) => {
  const styles = useContext(StylesContext);
  useDoubleBackExit(navigation);

  const Header = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Image Gallery</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.default}>
      <Header />
      <View style={{ flex: 3, justifyContent: 'center' }}>
        <View style={styles.horizontalButtonContainer}>
          <TouchableIcon onPress={() => navigation.navigate('Camera')} size={75} name="add-a-photo" buttonStyle={[styles.backgroundColorSecondary, { padding: 15 }]} />
          <TouchableIcon onPress={() => navigation.navigate('Gallery')} size={75} name="photo-library" buttonStyle={[styles.backgroundColorSecondary, { padding: 15 }]} />
        </View>
      </View>
    </SafeAreaView>
  );
};
