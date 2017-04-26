/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Main from './src/features/main';
import monitorNetworkConnection from './src/shared/NetworkConnection';

//observe any network changes and let ui react according to these changes
monitorNetworkConnection();

AppRegistry.registerComponent('Dashboard', () => Main);
