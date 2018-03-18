import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { COLOR } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAP_BOX_ACCESS_TOKEN } from '../../../config.json';

import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken(MAP_BOX_ACCESS_TOKEN);

export class Map extends Component {
  static displayName = 'Map';

  static propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  };

  renderAnnotations = (longitude, latitude) => (
    <Mapbox.PointAnnotation
      key="pointAnnotation"
      id="pointAnnotation"
      coordinate={[longitude, latitude]}
    >
      <Icon name="satellite-variant" size={40} color={COLOR.grey200} />
      <Mapbox.Callout title="International Space Station" />
    </Mapbox.PointAnnotation>
  );

  render() {
    const { latitude, longitude } = this.props;

    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Dark}
          zoomLevel={2}
          centerCoordinate={[longitude, latitude]}
          style={styles.container}
        >
          {this.renderAnnotations(longitude, latitude)}
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
