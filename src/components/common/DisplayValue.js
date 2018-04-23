import { withClient } from '../../shared/hocs/clientContext'
import { smartRound } from '../../shared/utils'
import PropTypes from 'prop-types'
import React from 'react'
import Text from './Text'

class DisplayValue extends React.Component {
  static propTypes = {
    client: PropTypes.shape({
      fromWei: PropTypes.func.isRequired
    }).isRequired,
    value: PropTypes.string,
    toWei: PropTypes.bool,
    post: PropTypes.string,
    pre: PropTypes.string
  }

  render() {
    const { toWei, value, post, pre, client, ...other } = this.props

    let formattedValue

    try {
      const weiValue = toWei ? client.toWei(value) : value
      formattedValue = smartRound(client, weiValue)
    } catch (e) {
      formattedValue = null
    }

    return (
      <Text numberOfLines={1} adjustsFontSizeToFit {...other}>
        {pre}
        {formattedValue || '?'}
        {post}
      </Text>
    )
  }
}

export default withClient(DisplayValue)
