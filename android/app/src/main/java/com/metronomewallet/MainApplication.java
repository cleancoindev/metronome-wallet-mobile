package com.metronomewallet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import io.sentry.RNSentryPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.oblador.keychain.KeychainPackage;
import org.reactnative.camera.RNCameraPackage;
import com.horcrux.svg.SvgPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new GoogleAnalyticsBridgePackage(),
            new RNSentryPackage(),
            new ReactNativeRestartPackage(),
            new SplashScreenReactPackage(),
            new KeychainPackage(),
            new RNCameraPackage(),
            new SvgPackage(),
            new RandomBytesPackage(),
            new RNSecureKeyStorePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
