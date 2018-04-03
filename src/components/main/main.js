import React from 'React';
import axios from 'axios';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import {
  Colors as COLORS,
  Toolbar,
  ToolbarContent,
  ToolbarAction,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Map } from '../map';
import { MoreMenu } from '../menu';

export class Main extends React.Component {
  static displayName = 'Main';

  state = {
    centerCoordinate: [0, 0],
    issLocation: {
      latitude: 0,
      longitude: 0,
    },
  };

  MORE_MENU_ACTIONS = ['Settings', 'Feedback and Support'];

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

  handleMenuPress = (action, index) => {
    if (action === 'itemSelected') {
      console.warn('Pressed:', action, index); //eslint-disable-line
    }
  };

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
        <Toolbar>
          <ToolbarContent title="ISS Tracker" />
          <ToolbarAction
            icon={
              <Icon
                color={COLORS.white}
                name="crosshairs-gps"
                size={24}
                onPress={() => this.getISSLocation(true)}
              />
            }
          />
          <ToolbarAction
            icon={
              <MoreMenu
                actions={this.MORE_MENU_ACTIONS}
                onPress={this.handleMenuPress}
              />
            }
          />
        </Toolbar>
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
    backgroundColor: COLORS.white,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  statusBar: {
    backgroundColor: COLORS.deepPurple500,
    height: 24,
  },
});
