/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import Main from './src/features/main';
import monitorNetworkConnection from './src/shared/NetworkConnection';

//observe any network changes and let ui react according to these changes
monitorNetworkConnection();

/* Modules */

AppRegistry.registerComponent('App', () => Main);
