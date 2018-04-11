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
import { Notification } from '../notification';

export class Feedback extends React.Component {
  static displayName = 'Feedback';

  static propTypes = {
    history: PropTypes.object,
  };

  state = {
    error: null,
    showChangelogDialog: false,
  };

  EMAIL = 'mkengineeringdev@gmail.com';

  handleOpenPlayStorePress = () => {
    const playStoreUrl = 'market://details?id=com.isstracer';

    Linking.canOpenURL(playStoreUrl)
      .then(supported => {
        if (!supported) {
          this.setState({
            error: 'Unable to open Google Play Store. Please try again.',
          });
        } else {
          return Linking.openURL(playStoreUrl);
        }
      })
      .catch(() =>
        this.setState({
          error: 'Unable to open Google Play Store. Please try again.',
        }),
      );
  };

  handleEmailPress = () => {
    const emailLink = `mailto:${this.EMAIL}?subject=ISS Tracer Feedback`;
    Linking.canOpenURL(emailLink)
      .then(supported => {
        if (!supported) {
          this.setState({
            error: 'Unable to open email. Please try again.',
          });
        } else {
          return Linking.openURL(emailLink);
        }
      })
      .catch(() =>
        this.setState({
          error: 'Unable to open email. Please try again.',
        }),
      );
  };

  toggleChangelogDialog = () =>
    this.setState({ showChangelogDialog: !this.state.showChangelogDialog });

  render() {
    const { push } = this.props.history;
    const { error } = this.state;

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
        <Notification message={error} toolbarPadding type="error" />
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
              <Caption>Version 0.1.2</Caption>
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
            <Paragraph style={styles.dialogHeading}>Version 0.1.2</Paragraph>
            <Paragraph>- New Light map theme</Paragraph>
            <Paragraph>- New Settings page to toggle map theme</Paragraph>
            <Paragraph>- New Feedback & Support page</Paragraph>
            <Paragraph>- App logo</Paragraph>
            <Paragraph>- Splash screen</Paragraph>
            <Paragraph>- Link to Google Play Store added</Paragraph>
            <Paragraph>- Removes 2nd app icon when installed</Paragraph>
            <Paragraph>- Better error handling</Paragraph>
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
