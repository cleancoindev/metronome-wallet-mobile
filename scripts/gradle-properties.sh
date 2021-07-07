#!/bin/bash

cat > android/gradle.properties << EOF
android.useAndroidX=true
android.enableJetifier=true
VERSION_NAME=$1
VERSION_CODE=$TRAVIS_BUILD_NUMBER
METRONOME_RELEASE_STORE_FILE=$METRONOME_RELEASE_STORE_FILE
METRONOME_RELEASE_STORE_PASSWORD=$METRONOME_RELEASE_STORE_PASSWORD
METRONOME_RELEASE_KEY_ALIAS=$METRONOME_RELEASE_KEY_ALIAS
METRONOME_RELEASE_KEY_PASSWORD=$METRONOME_RELEASE_KEY_PASSWORD
FLIPPER_VERSION=0.75.1
EOF
