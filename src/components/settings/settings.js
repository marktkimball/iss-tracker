import React from 'React';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
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
  };

  toggleMapThemeDialog = () =>
    this.setState({ showMapThemeDialog: !this.state.showMapThemeDialog });

  render() {
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
            <Caption>Dark</Caption>
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
              onValueChange={value => console.warn('VALUE', value)}
              value={'dark'}
            >
              <View style={styles.radioOption}>
                <RadioButton value="dark" />
                <Paragraph style={styles.radioButtonText}>Dark</Paragraph>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="light" />
                <Paragraph style={styles.radioButtonText}>Light</Paragraph>
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
