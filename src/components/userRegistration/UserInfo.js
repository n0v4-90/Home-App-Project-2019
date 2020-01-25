import React from 'react';
import {ActivityIndicator, TouchableHighlight, View, Text,TextInput, Button, ScrollView, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';


export default class UserInfo extends React.PureComponent {

  constructor() {
  super();
  this.ref = firebase.database().collection('users');
  this.state = {
    fornavn: '',
    etternavn: '',
    tlf: '',
    isLoading: false,
  };
}

updateTextInput = (text, field) => {
  const state = this.state
  state[field] = text;
  this.setState(state);
}

saveBoard() {
  this.setState({
    isLoading: true,
  });
  this.ref.add({
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    tlf: this.state.tlf
  }).then((docRef) => {
    this.setState({
      firstName: '',
      lastName: '',
      tlf: '',
      isLoading: false,
    });
    this.props.navigation.goBack();
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
    this.setState({
      isLoading: false,
    });
  });
}
onImageUpload = async () => {
   const { status: cameraRollPerm } = await Permissions.askAsync(
     Permissions.CAMERA_ROLL
   );
   try {
     // only if user allows permission to camera roll
     if (cameraRollPerm === 'granted') {
       let pickerResult = await ImagePicker.launchImageLibraryAsync({
         allowsEditing: true,
         aspect: [4, 3],
       });
       console.log(
         'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
       );

       var wantedMaxSize = 150;
       var rawheight = pickerResult.height;
       var rawwidth = pickerResult.width;
       var ratio = rawwidth / rawheight;
       var wantedwidth = wantedMaxSize;
       var wantedheight = wantedMaxSize/ratio;
       // check vertical or horizontal
       if(rawheight > rawwidth){
           wantedwidth = wantedMaxSize*ratio;
           wantedheight = wantedMaxSize;
       }
       let resizedUri = await new Promise((resolve, reject) => {
         ImageEditor.cropImage(pickerResult.uri,
         {
             offset: { x: 0, y: 0 },
             size: { width: pickerResult.width, height: pickerResult.height },
             displaySize: { width: wantedwidth, height: wantedheight },
             resizeMode: 'contain',
         },
         (uri) => resolve(uri),
         () => reject(),
         );
       });
       let uploadUrl = await firebaseSvc.uploadImage(resizedUri);
       this.setState({avatar: uploadUrl});
       await firebaseSvc.updateAvatar(uploadUrl);
     }
   } catch (err) {
     console.log('onImageUpload error:' + err.message);
     alert('Upload image error:' + err.message);
   }
 };



render() {
  if(this.state.isLoading){
    return(
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
        <TextInput
            placeholder={'Fornavn'}
            value={this.state.firstName}
            onChangeText={(text) => this.updateTextInput(text, 'firstName')}
        />
      </View>
      <View style={styles.subContainer}>
        <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Etternavn'}
            value={this.state.lastName}
            onChangeText={(text) => this.updateTextInput(text, 'lastName')}
        />
      </View>
      <View style={styles.subContainer}>

        <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Telefonr'}
            value={this.state.tlf}
            onChangeText={(text) => this.updateTextInput(text, 'Telefonr')}
        />
      </View>
      <View style={styles.button}>
        <Button
          large
          leftIcon={{name: 'save'}}
          title='Save'
          onPress={() => this.saveBoard()} />
          <Button
          title="Upload Avatar Image 2"
          style={styles.buttonText}
          onPress={this.onImageUpload}
        />
      </View>
    </ScrollView>
  );
}
    // render() {
    //     return (
    //       <View>
    //       <TextInput
    //         type='text'
    //         name='fornavn'
    //         placeholder='Fornavn'
    //         onChange={this.updateInput}
    //         value={this.state.fornavn}
    //       />
    //       <TextInput
    //         type='text'
    //         name='etternavn'
    //         placeholder='Etternavn'
    //         onChange={this.updateInput}
    //         value={this.state.etternavn}
    //       />
    //       <TextInput
    //         type='text'
    //         name='epost'
    //         placeholder='Epost'
    //         onChange={this.updateInput}
    //         value={this.state.epost}
    //       />
    //       <Button
    //         title='Neste'
    //         type="submit"
    //          onSubmit={this.saveUser
    //          }/>
    //       </View>
    //     );
    // }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
