import React from 'React';
import axios from 'axios';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { COLOR, Toolbar } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Map } from '../map';

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
          issLocation: { latitude: 0, longitude: 0 },
        }),
      );

  render() {
    const {
      centerCoordinate,
      issLocation: { latitude, longitude },
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar animated backgroundColor="rgba(0, 0, 0, 0.24)" translucent />
        {Platform.OS === 'android' && Platform.Version >= 20 ? (
          <View style={styles.statusBar} />
        ) : null}
        <Toolbar
          centerElement="ISS Tracker"
          rightElement={{
            actions: [
              <Icon
                key="re-center"
                color={COLOR.white}
                name="crosshairs-gps"
                onPress={() => this.getISSLocation(true)}
                size={24}
                style={styles.icon}
              />,
            ],
            menu: {
              icon: 'more-vert',
              labels: ['Settings', 'Location'],
            },
          }}
        />
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
    backgroundColor: COLOR.white,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  icon: { alignSelf: 'center' },
  statusBar: {
    backgroundColor: COLOR.deepPurple500,
    height: 24,
  },
});
