import React from 'React';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { cssVariables } from '../../css-variables';

export class Main extends React.Component {
  static displayName = 'Main';

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Toolbar centerElement="ISS Tracker" />
        <Text>ISS Tracker is up and running!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: cssVariables['--color-white'],
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
