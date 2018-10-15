import withReceiptState from '../../shared/hocs/withReceiptState'
import RefreshControl from './RefreshControl'
import ConverterIcon from '../icons/ConverterIcon'
import DisplayValue from './DisplayValue'
import AuctionIcon from '../icons/AuctionIcon'
import PropTypes from 'prop-types'
import CopyIcon from '../icons/CopyIcon'
import TxIcon from '../icons/TxIcon'
import React from 'react'
import View from './View'
import Text from './Text'
import Btn from './Btn'
import RN from 'react-native'

class Receipt extends React.Component {
  static propTypes = {
    onExplorerLinkClick: PropTypes.func.isRequired,
    onRefreshRequest: PropTypes.func.isRequired,
    copyToClipboard: PropTypes.func.isRequired,
    confirmations: PropTypes.number.isRequired,
    refreshStatus: PropTypes.oneOf(['init', 'pending', 'success', 'failure'])
      .isRequired,
    refreshError: PropTypes.string,
    navigation: PropTypes.shape({
      setParams: PropTypes.func.isRequired
    }).isRequired,
    isPending: PropTypes.bool.isRequired,
    tx: PropTypes.object.isRequired
  }

  viewRef = null

  storeViewRef = element => {
    this.viewRef = element
  }

  onRefresh = () => {
    this.props.onRefreshRequest()
    this.viewRef.scrollTo({ y: 0, animated: true })
  }

  componentDidMount() {
    this.props.navigation.setParams({ onHeaderRightPress: this.onRefresh })
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.refreshStatus !== prevProps.refreshStatus &&
      this.props.refreshStatus === 'failure'
    ) {
      RN.Alert.alert('Error', this.props.refreshError)
    }
  }

  render() {
    const { confirmations, isPending, tx } = this.props

    return (
      <View
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshStatus === 'pending'}
            onRefresh={this.onRefresh}
          />
        }
        innerRef={this.storeViewRef}
        scroll
        grow={1}
        bg="dark"
        px={2}
      >
        {tx.txType !== 'unknown' && <AmountRow tx={tx} />}

        <TypeRow tx={tx} />

        {tx.txType === 'received' && (
          <RN.TouchableOpacity
            activeOpacity={0.75}
            onPress={() => this.props.copyToClipboard(tx.from)}
          >
            <View my={3}>
              <View row justify="space-between">
                <Text size="large">
                  {isPending ? 'Pending' : 'Received'} from
                </Text>
                <CopyIcon opacity={0.5} width="20" />
              </View>

              <Text size="small" opacity={0.8} mt={1}>
                {tx.from}
              </Text>
            </View>
          </RN.TouchableOpacity>
        )}

        {tx.txType === 'sent' && (
          <RN.TouchableOpacity
            activeOpacity={0.75}
            onPress={() => this.props.copyToClipboard(tx.to)}
          >
            <View my={3}>
              <View row justify="space-between">
                <Text size="large">{isPending ? 'Pending' : 'Sent'} to</Text>
                <CopyIcon opacity={0.5} width="20" />
              </View>
              <Text size="small" opacity={0.8} mt={1}>
                {tx.to}
              </Text>
            </View>
          </RN.TouchableOpacity>
        )}

        <View row my={3}>
          <Text size="large">Confirmations</Text>
          <View grow={1} align="flex-end">
            <Text size="large">{confirmations}</Text>
          </View>
        </View>

        <RN.TouchableOpacity
          activeOpacity={0.75}
          onPress={() => this.props.copyToClipboard(tx.hash)}
        >
          <View my={3}>
            <View row justify="space-between">
              <Text size="large">Transaction hash</Text>
              <CopyIcon opacity={0.5} width="20" />
            </View>
            <Text size="small" opacity={0.8} mt={1}>
              {tx.hash}
            </Text>
          </View>
        </RN.TouchableOpacity>

        <View row my={3} align="baseline">
          <Text size="large">Block number</Text>
          <View grow={1} align="flex-end" opacity={0.8}>
            <Text size={tx.blockNumber ? 'large' : 'small'}>
              {tx.blockNumber ? tx.blockNumber : 'Waiting to be mined'}
            </Text>
          </View>
        </View>

        <View row my={3}>
          <Text size="large">Gas used</Text>
          <View grow={1} align="flex-end">
            <Text size={tx.gasUsed ? 'large' : 'small'} opacity={0.8}>
              {tx.gasUsed ? tx.gasUsed : 'Waiting to be mined'}
            </Text>
          </View>
        </View>

        <View my={4}>
          <Btn
            onPress={() => this.props.onExplorerLinkClick(tx.hash)}
            label="View in Explorer"
          />
        </View>
      </View>
    )
  }
}

const AmountRow = ({ tx }) => (
  <View row my={3}>
    <Text size="large">Amount</Text>
    <View grow={1} align="flex-end">
      {tx.txType === 'auction' ? (
        <React.Fragment>
          <DisplayValue
            value={tx.ethSpentInAuction}
            size="large"
            post=" ETH"
            color="primary"
          />
          {tx.mtnBoughtInAuction && (
            <React.Fragment>
              <Text mr={2} color="primary" mx={2} size="xLarge">
                &darr;
              </Text>
              <DisplayValue
                size="large"
                value={tx.mtnBoughtInAuction}
                post=" MET"
                color="primary"
              />
            </React.Fragment>
          )}
        </React.Fragment>
      ) : tx.txType === 'converted' ? (
        <React.Fragment>
          <DisplayValue
            value={tx.fromValue}
            size="large"
            post={tx.convertedFrom === 'ETH' ? ' ETH' : ' MET'}
            color="primary"
          />
          {tx.toValue && (
            <React.Fragment>
              <Text mx={2} size="xLarge" color="primary">
                &darr;
              </Text>
              <DisplayValue
                value={tx.toValue}
                size="large"
                post={tx.convertedFrom === 'ETH' ? ' MET' : ' ETH'}
                color="primary"
              />
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <DisplayValue
          value={tx.value}
          post={` ${tx.symbol}`}
          size="large"
          color="primary"
        />
      )}
    </View>
  </View>
)

AmountRow.propTypes = {
  tx: PropTypes.object.isRequired
}

const TypeRow = ({ tx }) => (
  <View row my={3} justify="space-between">
    <Text size="large">Type</Text>
    <View shrink={1} align="center" row opacity={0.8}>
      {['sent', 'received'].includes(tx.txType) && <TxIcon size="20" />}
      {tx.txType === 'converted' && <ConverterIcon size="20" />}
      {tx.txType === 'auction' && <AuctionIcon size="20" />}
      <Text size="large" ml={1.5}>
        {tx.isCancelApproval
          ? 'Allowance canceled'
          : tx.isApproval
            ? 'Allowance set'
            : tx.txType.toUpperCase()}
      </Text>
    </View>
  </View>
)

TypeRow.propTypes = {
  tx: PropTypes.shape({
    isCancelApproval: PropTypes.bool,
    isApproval: PropTypes.bool,
    txType: PropTypes.string.isRequired
  }).isRequired
}

export default withReceiptState(Receipt)