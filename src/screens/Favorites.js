import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native';
import firebase from 'react-native-firebase';



export default class Favorites extends Component{
  static navigationOptions = {
  title: 'Dine Lagrede Annonser',
};
  render(){
    return(
      <View>
      <Text>Favorites</Text>
      </View>
    );
  }
}
