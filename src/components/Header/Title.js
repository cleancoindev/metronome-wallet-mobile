import { withRouter } from 'react-router-native';
import { View, Text } from '../common';
import PropTypes from 'prop-types';
import React from 'react';
import RN from 'react-native';

const titlesByPath = {
  '/wallets/receive': 'Receive',
  '/wallets/send': 'Send',
  '/wallets': 'My wallet',

  '/auction': 'Auction',
  '/auction/buy': 'Buy Metronome',

  '/converter': 'Autonomous Converter',
  '/converter/convert': 'Convert',

  '/settings': 'Settings',
  '/tools': 'Recover wallet',
  '/help': 'Help'
};

class Title extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  };

  state = { title: '' };

  static getDerivedStateFromProps({ location: { pathname } }, prevState) {
    const newPathTitle = titlesByPath[pathname] || '';

    // Avoid updating anything if title didn't change
    if (newPathTitle === prevState.title) return null;

    // Schedule an animation for the title update
    RN.LayoutAnimation.easeInEaseOut();

    return { title: newPathTitle };
  }

  render() {
    const { title } = this.state;

    return (
      <View justify="center" align="center" grow={1} mr={4} px={1}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          color="light"
          size="large"
          key={title} // We need to re-mount the title for the animation to work
        >
          {title}
        </Text>
      </View>
    );
  }
}

export default withRouter(Title);
