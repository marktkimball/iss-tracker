import React from 'React';
import PropTypes from 'prop-types';
import {
  findNodeHandle,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { Colors as COLORS } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class MoreMenu extends React.Component {
  static displayName = 'MoreMenu';

  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func.isRequired,
  };

  icon = null;

  onError() {
    console.warn('Popup Error'); // eslint-disable-line
  }

  onPress = () => {
    if (this.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.icon),
        this.props.actions,
        this.onError,
        this.props.onPress,
      );
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Icon
            name="dots-vertical"
            size={24}
            color={COLORS.white}
            ref={r => (this.icon = r)}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
