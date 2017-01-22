/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

/* Component */

import HeaderDark from './android/app/features/header/header_dark';
import HeaderLight from './android/app/features/header/header_light';

import Login from './android/app/features/login/login';

/* Modules */

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Main from './android/app/features/Main';

AppRegistry.registerComponent('App', () => Main);
