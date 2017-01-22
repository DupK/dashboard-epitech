import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const header_style = StyleSheet.create({

  container: {

    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#2c3e50',

  },

  title: {

    margin: 10,
    color: '#ffffff'

  },

  sub_title: {

    fontWeight: 'bold'

  },

  sub_title_bis: {

  },

  info_logo: {

    margin: 12,
    width: 15,
    height: 15

  }

});

export default class HeaderDark extends Component {

  render() {

      return (

            <View style={header_style.container}>

                <Text style={header_style.title}>
                  <Text style={header_style.sub_title}>Epitech </Text>
                  <Text style={header_style.sub_title_bis}>Dashboard</Text>
                </Text>

                <Image style={header_style.info_logo} source={require('../../public/img/header_info_light.png')}/>

            </View>

      );

  }

}
