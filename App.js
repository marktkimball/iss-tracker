import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  Colors as COLORS,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { NativeRouter } from 'react-router-native';
import { Navigation, Card } from 'react-router-navigation';
import { Main } from './src/components/main';
import { Settings } from './src/components/settings';
import { Feedback } from './src/components/feedback';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: COLORS.lightBlueA200,
    primary: COLORS.deepPurple500,
  },
};

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        <StatusBar animated backgroundColor="rgba(0, 0, 0, 0.24)" translucent />
        {Platform.OS === 'android' && Platform.Version >= 20 ? (
          <View style={styles.statusBar} />
        ) : null}
        <NativeRouter>
          <Navigation hideNavBar>
            <Card exact path="/" component={Main} />
            <Card exact path="/settings" component={Settings} />
            <Card exact path="/feedback" component={Feedback} />
          </Navigation>
        </NativeRouter>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: COLORS.deepPurple500,
    height: 24,
  },
});
