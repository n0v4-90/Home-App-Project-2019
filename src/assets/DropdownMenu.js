import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, Picker } from 'react-native';
import firebase from 'react-native-firebase';



export default class DropdownMenu extends Component{
  state = {user: ''}
updateUser = (user) => {
   this.setState({ user: user })
}
  render() {
      return (
         <View>
            <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>
               <Picker.Item label = "Enebolig" value = "Enebolig" />
               <Picker.Item label = "Bofelleskap" value = "Bofelleskap" />
               <Picker.Item label = "Leilighet" value = "Leilighet" />
            </Picker>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   }
})
