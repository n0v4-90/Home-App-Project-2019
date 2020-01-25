import React, {Component} from 'react';
import { View, Text, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';


export default class Upload2 extends Component {

  constructor(props){
    super(props);
    this.state ={
      imgUrl: "",
    };
    //this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    const  options = {
      width: 105,
      height: 105,
     compressImageMaxWidth: 400,
     compressImageMaxHeight: 400,
     ompressImageQuality: 0.8,
     mediaType: 'photo',
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
        imgUrl: source
      })
        const uid =  firebase.auth().currentUser.uid;
        const key = firebase.database().ref().child('userAd/' + uid).push().key
        const imgRef = firebase.storage().ref('image/').child(uid).child(key)
        imgRef.put(response.uri)
        .then("state_changed", (snapshot) =>{
        firebase.storage().ref('image/').child(uid).child(key).getDownloadUrl()
        })
      }
    });
  }


  render(){
    const {imgUrl} = this.state;
    return(
      <View>
      <Button
        onPress={this.handleChange}
        title={'velg bilde'}
        />
        <Button
          onPress={this.handleImageUpload}
          title={'Lagre'}
          />
          <Image source={{uri: imgUrl.uri}}/>

      </View>
    )
  }
}
