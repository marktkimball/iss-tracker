import React from 'React';
import axios from 'axios';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

import { Map } from '../map';
import { cssVariables } from '../../css-variables';

export class Main extends React.Component {
  static displayName = 'Main';

  state = {
    issLocation: {
      latitude: 0,
      longitude: 0,
    },
  };

  componentWillMount() {
    this.getISSLocation();
    this.timer = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.getISSLocation();
  };

  getISSLocation = () =>
    axios
      .get('http://api.open-notify.org/iss-now.json')
      .then(({ data: { iss_position: { latitude, longitude } } }) => {
        this.setState({
          issLocation: {
            latitude: 1 * latitude,
            longitude: 1 * longitude,
          },
        });
      })
      .catch(() =>
        this.setState({
          issLocation: { latitude: 40.611509, longitude: -111.91499 },
        }),
      );

  render() {
    const { latitude, longitude } = this.state.issLocation;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Toolbar centerElement="ISS Tracker" />
        <Map latitude={latitude} longitude={longitude} />
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
