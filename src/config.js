export default {
  MTN_TOKEN_ADDR:
    process.env.REACT_APP_MTN_TOKEN_ADDR ||
    '0x825a2ce3547e77397b7eac4eb464e2edcfaae514',
  CONVERTER_ADDR:
    process.env.REACT_APP_CONVERTER_ADDR ||
    '0x25d99454d94d9459f0abb06009840a48bd04ca44',
  MTN_EXPLORER_URL:
    process.env.REACT_APP_MTN_EXPLORER_URL ||
    'http://explorer.mtn.bloqrock.net',
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
  ETH_DEFAULT_GAS_LIMIT: '21000',
  MET_DEFAULT_GAS_LIMIT: '2000000',
  DEFAULT_GAS_PRICE: '1000000000',
  REQUIRED_PASSWORD_ENTROPY: 72
}