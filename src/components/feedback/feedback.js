import React from 'React';
import PropTypes from 'prop-types';
import { Linking, StyleSheet, View } from 'react-native';
import {
  Button,
  Caption,
  Colors as COLORS,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paragraph,
  Subheading,
  Toolbar,
  ToolbarAction,
  ToolbarContent,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class Feedback extends React.Component {
  static displayName = 'Feedback';

  static propTypes = {
    history: PropTypes.object,
  };

  state = {
    showChangelogDialog: false,
  };

  EMAIL = 'mkengineeringdev@gmail.com';

  handleOpenPlayStorePress = () => {
    const playStoreUrl = 'market://'; // TODO: Update to actual Play Store route

    Linking.canOpenURL(playStoreUrl)
      .then(supported => {
        if (!supported) {
          console.warn(`Can't handle url: ${playStoreUrl}`); // eslint-disable-line
        } else {
          return Linking.openURL(playStoreUrl);
        }
      })
      .catch(err => console.error(`An error occurred: ${err}`)); // eslint-disable-line
  };

  handleEmailPress = () => {
    const emailLink = `mailto:${this.EMAIL}?subject=ISS Tracker Feedback`;
    Linking.canOpenURL(emailLink)
      .then(supported => {
        if (!supported) {
          console.warn(`Can't handle url: ${emailLink}`); // eslint-disable-line
        } else {
          return Linking.openURL(emailLink);
        }
      })
      .catch(err => console.error(`An error occurred: ${err}`)); // eslint-disable-line
  };

  toggleChangelogDialog = () =>
    this.setState({ showChangelogDialog: !this.state.showChangelogDialog });

  render() {
    const { push } = this.props.history;

    return (
      <View style={styles.container}>
        <Toolbar>
          <ToolbarAction
            icon={
              <Icon
                color={COLORS.white}
                name="arrow-left"
                size={24}
                onPress={() => push('/')}
              />
            }
          />
          <ToolbarContent title="Feedback & Support" />
        </Toolbar>
        <View>
          <Paragraph style={styles.heading}>Support</Paragraph>
          <TouchableRipple onPress={this.handleOpenPlayStorePress}>
            <View style={styles.option}>
              <Subheading>Like the app?</Subheading>
              <Caption>Rate it on Google Play</Caption>
            </View>
          </TouchableRipple>
        </View>
        <View>
          <Paragraph style={styles.heading}>About</Paragraph>
          <TouchableRipple onPress={this.handleEmailPress}>
            <View style={styles.option}>
              <Subheading>Author</Subheading>
              <Caption>{this.EMAIL}</Caption>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={this.toggleChangelogDialog}>
            <View style={styles.option}>
              <Subheading>Changelog</Subheading>
              <Caption>Version 0.1.0</Caption>
            </View>
          </TouchableRipple>
        </View>
        <Dialog
          dismissable
          onDismiss={this.toggleChangelogDialog}
          visible={this.state.showChangelogDialog}
        >
          <DialogTitle>{`What's New`}</DialogTitle>
          <DialogContent>
            <Paragraph style={styles.dialogHeading}>Version 0.1.0</Paragraph>
            <Paragraph>- New Light map theme</Paragraph>
            <Paragraph>- New Settings page to toggle map theme</Paragraph>
            <Paragraph>- New Feedback & Support page</Paragraph>
            <Paragraph>- App logo</Paragraph>
            <Paragraph>- Splash screen</Paragraph>
          </DialogContent>
          <DialogActions>
            <Button onPress={this.toggleChangelogDialog}>Ok</Button>
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
  heading: {
    color: COLORS.deepPurple500,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
  dialogHeading: {
    color: COLORS.deepPurple500,
    fontWeight: 'bold',
  },
  option: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey200,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
