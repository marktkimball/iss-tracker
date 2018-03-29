import React from 'react';
import {
  Colors as COLORS,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Main } from './src/components/main';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.deepPurple500,
  },
};

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    );
  }
}
