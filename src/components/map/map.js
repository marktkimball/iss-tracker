import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { Colors as COLORS } from 'react-native-paper';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAP_BOX_ACCESS_TOKEN } from '../../../config.json';

Mapbox.setAccessToken(MAP_BOX_ACCESS_TOKEN);

export class Map extends Component {
  static displayName = 'Map';

  static propTypes = {
    centerCoordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  };

  state = {
    mapTheme: 'dark',
  };

  async componentWillMount() {
    try {
      const mapTheme = await AsyncStorage.getItem('@preferences:mapTheme');
      if (mapTheme) {
        this.setState({ mapTheme });
      }
    } catch (error) {
      console.warn('Failed to retrieve user map theme'); // eslint-disable-line
    }
  }
  renderAnnotations = (longitude, latitude, mapTheme) => (
    <Mapbox.PointAnnotation
      key="pointAnnotation"
      id="pointAnnotation"
      coordinate={[longitude, latitude]}
    >
      <Icon
        name="satellite-variant"
        size={40}
        color={mapTheme === 'dark' ? COLORS.grey200 : COLORS.grey800}
      />
      <Mapbox.Callout title="International Space Station" />
    </Mapbox.PointAnnotation>
  );

  render() {
    const { centerCoordinate, latitude, longitude } = this.props;
    const { mapTheme } = this.state;

    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={
            mapTheme === 'dark' ? Mapbox.StyleURL.Dark : Mapbox.StyleURL.Light
          }
          zoomLevel={2}
          centerCoordinate={centerCoordinate}
          style={styles.container}
        >
          {this.renderAnnotations(longitude, latitude, mapTheme)}
        </Mapbox.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
