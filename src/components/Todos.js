import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, FlatList, ScrollView,TextInput } from 'react-native';
import firebase from 'react-native-firebase';

class Todos extends React.Component {
  constructor() {
      super();
      this.ref = firebase.firestore().collection('todos');
      this.state = {
          textInput: '',
      };
  }
  updateTextInput(value) {
    this.setState({ textInput: value });
}

addTodo() {
  this.ref.add({
    title: this.state.textInput,
    complete: false,
  });

  this.setState({
    textInput: '',
  });
}

  render() {
    return (
    <View>
      <ScrollView>
        <Text>List of TODOs</Text>
      </ScrollView>
      <TextInput
    placeholder={'Add TODO'}
    value={this.state.textInput}
    onChangeText={(text) => this.updateTextInput(text)}
/>
<Button
    title={'Add TODO'}
    disabled={!this.state.textInput.length}
    onPress={() => this.addTodo()}
/>


    </View>
  )
  }
}

export default Todos;
