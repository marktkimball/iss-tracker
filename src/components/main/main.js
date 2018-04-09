import React from 'React';
import PropTypes from 'prop-types';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import { withRouter } from 'react-router';
import {
  Colors as COLORS,
  Toolbar,
  ToolbarContent,
  ToolbarAction,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Map } from '../map';
import { MoreMenu } from '../menu';

class MainApp extends React.Component {
  static displayName = 'Main';

  static propTypes = {
    history: PropTypes.object,
  };

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
    const { history } = this.props;
    if (action === 'itemSelected') {
      switch (index) {
        case 0:
          history.push('/settings');
          break;
        case 1:
          history.push('/feedback');
          break;
        default:
          return;
      }
    }
  };

  render() {
    const {
      centerCoordinate,
      issLocation: { latitude, longitude },
    } = this.state;
    return (
      <View style={styles.container}>
        <Toolbar>
          <ToolbarContent title="Orbit Watch" />
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
});

export const Main = withRouter(MainApp);
