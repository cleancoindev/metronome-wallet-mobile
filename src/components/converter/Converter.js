import { MenuBtn, Text, View, Btn } from '../common'
import withConverterState from '../../shared/hocs/withConverterState'
import PropTypes from 'prop-types'
import Stats from './Stats'
import React from 'react'
import RN from 'react-native'

class Converter extends React.Component {
  static propTypes = {
    convertDisabledReason: PropTypes.string,
    converterPriceUSD: PropTypes.string.isRequired,
    convertDisabled: PropTypes.bool.isRequired,
    converterStatus: PropTypes.object,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  }

  render() {
    const {
      convertDisabledReason,
      converterPriceUSD,
      converterStatus,
      convertDisabled,
      navigation
    } = this.props

    return (
      <View bg="dark" flex={1} px={2} py={4} justify="space-between">
        {converterStatus ? (
          <React.Fragment>
            <Stats
              converterPriceUSD={converterPriceUSD}
              converterStatus={converterStatus}
            />
            <View>
              {convertDisabledReason && (
                <Text opacity={0.8} align="center" size="small" my={2}>
                  {convertDisabledReason}
                </Text>
              )}
              <Btn
                disabled={convertDisabled}
                onPress={() => navigation.navigate('ConvertDrawer')}
                label="Convert"
                block
              />
            </View>
          </React.Fragment>
        ) : (
          <View flex={1} justify="center" align="center">
            <Text size="medium" mb={2}>
              Waiting for converter status...
            </Text>
            <RN.ActivityIndicator />
          </View>
        )}
      </View>
    )
  }
}

const EnhancedComponent = withConverterState(Converter)

EnhancedComponent.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Converter',
  headerBackTitle: null,
  headerLeft: <MenuBtn onPress={navigation.openDrawer} />
})

export default EnhancedComponent
