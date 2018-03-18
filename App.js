import React from 'react';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Main } from './src/components/main';

const uiTheme = {
  palette: {
    primaryColor: COLOR.pinkA700,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Main />
      </ThemeProvider>
    );
  }
}
