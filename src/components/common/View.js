import { spacing } from '../../utils'
import PropTypes from 'prop-types'
import theme from '../../theme'
import React from 'react'
import RN from 'react-native'

const isOldIOS =
  RN.Platform.OS === 'ios' && parseFloat(RN.Platform.Version) < 11

const View = props => {
  const {
    children,
    innerRef,
    opacity,
    justify,
    rowwrap,
    align,
    shrink,
    scroll,
    basis,
    order,
    style,
    self,
    grow,
    flex,
    safe,
    row,
    bg,
    ...other
  } = props

  const Component = scroll ? RN.ScrollView : RN.View

  return (
    <Component
      style={[
        opacity !== undefined && { opacity: opacity },
        shrink !== undefined && { flexShrink: shrink },
        basis !== undefined && { flexBasis: basis },
        order !== undefined && { order: order },
        grow !== undefined && { flexGrow: grow },
        flex !== undefined && { flex },
        justify && { justifyContent: justify },
        rowwrap && styles.rowwrap,
        align && { alignItems: align },
        self && { alignSelf: self },
        row && styles.row,
        bg && { backgroundColor: theme.colors[bg] },
        spacing(props),
        safe && isOldIOS && styles.safe,
        style
      ]}
      ref={innerRef}
      {...other}
    >
      {children}
    </Component>
  )
}

View.propTypes = {
  justify: PropTypes.oneOf([
    'space-between',
    'space-around',
    'space-evenly',
    'flex-start',
    'flex-end',
    'center'
  ]),
  children: PropTypes.node,
  opacity: PropTypes.number,
  rowwrap: PropTypes.bool,
  shrink: PropTypes.number,
  scroll: PropTypes.bool,
  basis: PropTypes.number,
  order: PropTypes.number,
  align: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'baseline',
    'stretch',
    'center'
  ]),
  self: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'baseline',
    'stretch',
    'center'
  ]),
  style: PropTypes.any,
  grow: PropTypes.number,
  flex: PropTypes.number,
  safe: PropTypes.bool,
  bg: PropTypes.oneOf(Object.keys(theme.colors)),
  ...spacing.propTypes
}

const styles = RN.StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  rowwrap: {
    flexWrap: 'wrap'
  },
  safe: {
    paddingTop: 20
  }
})

export default View
