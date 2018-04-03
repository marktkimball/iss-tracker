import React from 'React';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Colors as COLORS,
  Toolbar,
  ToolbarAction,
  ToolbarContent,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class Settings extends React.Component {
  static displayName = 'Settings';

  static propTypes = {
    history: PropTypes.object,
  };

  render() {
    return (
      <View>
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
      </View>
    );
  }
}
