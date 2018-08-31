import { Provider as ClientProvider } from './shared/hocs/clientContext'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import createClient from './client'
import createStore from './shared/createStore'
import Onboarding from './components/onboarding/Onboarding'
import Loading from './components/Loading'
import Router from './components/Router'
import config from './config'
import Login from './components/Login'
import React from 'react'
import Root from './shared/Root'
import RN from 'react-native'

RN.YellowBox.ignoreWarnings(['Setting a timer'])

// Enable LayoutAnimation on Android
// @see https://facebook.github.io/react-native/docs/animations
RN.NativeModules.UIManager.setLayoutAnimationEnabledExperimental &&
  RN.NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true)

const client = createClient(config, createStore)

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <ClientProvider value={client}>
        <RN.StatusBar barStyle="light-content" />
        <Provider store={client.store}>
          <Root
            OnboardingComponent={Onboarding}
            LoadingComponent={Loading}
            RouterComponent={Router}
            LoginComponent={Login}
          />
        </Provider>
      </ClientProvider>
    )
  }
}

RN.AppRegistry.registerComponent('MetronomeWallet', () => App)
