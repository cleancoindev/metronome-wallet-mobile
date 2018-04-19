import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import theme from '../../theme';
import React from 'react';

export default class ConverterIcon extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string
  };

  render() {
    const { isActive, color = 'light', size = '24', ...other } = this.props;

    return (
      <Svg viewBox="0 0 24 24" width={size} height={size} {...other}>
        <Path
          opacity={isActive === false ? 0.5 : 1}
          fill={theme.colors[color]}
          d="M23.914 10.851L20.2 3.878h1.852v-.96H14.33a2.398 2.398 0 0 0-4.7 0H1.909v.96H3.76L.048 10.842h.01a.446.446 0 0 0-.058.22c0 2.303 2.014 4.317 4.317 4.317 2.302 0 4.316-2.014 4.316-4.317 0-.086-.029-.153-.057-.22h.01L4.872 3.878H9.65c.192.94.93 1.678 1.87 1.87v12.537c-2.609.211-4.796 2.13-4.796 4.298 0 .268.211.48.48.48h9.592c.269 0 .48-.212.48-.48 0-2.168-2.187-4.087-4.796-4.298V5.748a2.403 2.403 0 0 0 1.87-1.87h4.777l-3.712 6.964h.01a.446.446 0 0 0-.058.22c0 2.303 2.014 4.317 4.316 4.317 2.303 0 4.317-2.014 4.317-4.317-.029-.076-.058-.144-.086-.21zM4.307 4.894l3.04 5.698H1.277l3.031-5.698zm0 9.535c-1.727 0-3.07-1.448-3.319-2.887h6.628c-.24 1.439-1.582 2.887-3.309 2.887zm11.933 7.674H7.712c.317-1.439 2.043-2.878 4.26-2.878 2.215 0 3.951 1.44 4.268 2.878zM11.98 4.837a1.437 1.437 0 0 1-1.438-1.439c0-.796.643-1.439 1.439-1.439s1.439.643 1.439 1.44c0 .795-.643 1.438-1.44 1.438zm10.715 5.755h-6.071l3.04-5.698 3.031 5.698zm-3.04 3.837c-1.727 0-3.07-1.448-3.32-2.887h6.629c-.24 1.439-1.583 2.887-3.31 2.887z"
        />
      </Svg>
    );
  }
}
