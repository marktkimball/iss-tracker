import React from 'React';
import PropTypes from 'prop-types';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import {
  Button,
  Caption,
  Colors as COLORS,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paragraph,
  RadioButton,
  RadioButtonGroup,
  Subheading,
  Toolbar,
  ToolbarAction,
  ToolbarContent,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class Settings extends React.Component {
  static displayName = 'Settings';

  static propTypes = {
    history: PropTypes.object,
  };

  state = {
    showMapThemeDialog: false,
    mapTheme: 'dark',
  };

  MAP_THEMES = {
    dark: 'Dark',
    light: 'Light',
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

  toggleMapThemeDialog = () =>
    this.setState({ showMapThemeDialog: !this.state.showMapThemeDialog });

  updateUserMapTheme = async mapTheme => {
    try {
      await AsyncStorage.setItem('@preferences:mapTheme', mapTheme);
      this.setState({ mapTheme });
    } catch (error) {
      // eslint-disable-next-line
      console.warn(
        `Error saving map theme preference of: ${mapTheme}, error: ${error}`,
      );
    }
  };

  render() {
    const { mapTheme } = this.state;
    return (
      <View style={styles.container}>
        <Toolbar>
          <ToolbarAction
            icon={
              <Icon
                color={COLORS.white}
                name="arrow-left"
                size={24}
                onPress={() => this.props.history.push('/')}
              />
            }
          />
          <ToolbarContent title="Settings" />
        </Toolbar>
        <TouchableRipple onPress={this.toggleMapThemeDialog}>
          <View style={styles.option}>
            <Subheading>Map Theme</Subheading>
            <Caption>{this.MAP_THEMES[mapTheme]}</Caption>
          </View>
        </TouchableRipple>
        <Dialog
          dismissable
          onDismiss={this.toggleMapThemeDialog}
          visible={this.state.showMapThemeDialog}
        >
          <DialogTitle>Map Theme</DialogTitle>
          <DialogContent>
            <RadioButtonGroup
              onValueChange={value => this.updateUserMapTheme(value)}
              value={mapTheme}
            >
              <View style={styles.radioOption}>
                <RadioButton value="dark" />
                <Paragraph style={styles.radioButtonText}>
                  {this.MAP_THEMES['dark']}
                </Paragraph>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="light" />
                <Paragraph style={styles.radioButtonText}>
                  {this.MAP_THEMES['light']}
                </Paragraph>
              </View>
            </RadioButtonGroup>
          </DialogContent>
          <DialogActions>
            <Button onPress={this.toggleMapThemeDialog}>Done</Button>
          </DialogActions>
        </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.grey50,
    height: '100%',
    width: '100%',
  },
  option: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey200,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  radioOption: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  radioButtonText: {
    marginLeft: 12,
  },
});
