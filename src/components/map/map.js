import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { COLOR } from 'react-native-material-ui';
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
      <View style={styles.annotationContainer}>
        <View style={styles.annotationFill} />
      </View>
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
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLOR.deepOrange500,
    transform: [{ scale: 0.6 }],
  },
});
