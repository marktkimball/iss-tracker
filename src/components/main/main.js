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
    centerCoordinate: [0, 0],
  };

  componentWillMount() {
    this.getISSLocation(true);
    this.timer = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.getISSLocation();
  };

  getISSLocation = isInitial =>
    axios
      .get('http://api.open-notify.org/iss-now.json')
      .then(({ data: { iss_position: { latitude, longitude } } }) => {
        this.setState({
          issLocation: {
            latitude: 1 * latitude,
            longitude: 1 * longitude,
          },
          centerCoordinate: isInitial
            ? [1 * longitude, 1 * latitude]
            : [...this.state.centerCoordinate],
        });
      })
      .catch(() =>
        this.setState({
          issLocation: { latitude: 40.611509, longitude: -111.91499 },
        }),
      );

  render() {
    const {
      centerCoordinate,
      issLocation: { latitude, longitude },
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Toolbar centerElement="ISS Tracker" />
        <Map
          centerCoordinate={centerCoordinate}
          latitude={latitude}
          longitude={longitude}
        />
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
