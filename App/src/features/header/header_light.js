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
    backgroundColor: '#ffffff',

  },

  title: {

    margin: 10,
    color: '#2c3e50',
    fontFamily: 'weblysleekuil'

  },

  sub_title: {

    fontWeight: 'bold',


  },

  sub_title_bis: {


  },

  info_logo: {

    margin: 12,
    width: 15,
    height: 15

  }

});

export default class HeaderLight extends Component {

  render() {

      return (

            <View style={header_style.container}>

                <Text style={header_style.title}>
                  <Text style={header_style.sub_title}>Epitech </Text>
                  <Text style={header_style.sub_title_bis}>Dashboard</Text>
                </Text>

                <Image style={header_style.info_logo} source={require('../../public/img/header_info_dark.png')}/>

            </View>

      );

  }

}
