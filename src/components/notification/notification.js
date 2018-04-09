import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Colors as COLORS, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class Notification extends React.Component {
  static displayName = 'Notification';

  static propTypes = {
    message: PropTypes.string,
    timeout: PropTypes.number,
    toolbarPadding: PropTypes.bool,
    type: PropTypes.oneOf(['error', 'info', 'success']).isRequired,
  };

  state = {
    show: false,
  };

  componentWillReceiveProps({ message }) {
    if (message) {
      this.toggleShow();
      this.timeout = setTimeout(
        () => this.toggleShow(),
        this.props.timeout || 5000,
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getColor = () => {
    switch (this.props.type) {
      case 'error':
        return COLORS.red600;
      case 'success':
        return COLORS.green600;
      // default to 'info'
      default:
        return COLORS.blue600;
    }
  };

  toggleShow = () => this.setState({ show: !this.state.show });

  render() {
    if (this.state.show) {
      const { message, toolbarPadding } = this.props;
      return (
        <View
          style={[
            styles.notification,
            { backgroundColor: this.getColor() },
            { top: toolbarPadding ? 56 : 0 },
          ]}
        >
          <Icon
            color={COLORS.white}
            name="exclamation"
            size={24}
            style={styles.icon}
          />
          <Paragraph style={styles.message}>{message}</Paragraph>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
  message: {
    color: COLORS.white,
    flex: 1,
  },
  notification: {
    alignItems: 'center',
    elevation: 1,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'flex-start',
    left: 0,
    opacity: 0.9,
    paddingHorizontal: 20,
    paddingVertical: 8,
    position: 'absolute',
    right: 0,
    width: '100%',
  },
});
