//
// import React, {Component} from 'react';
// import { StyleSheet, Platform, Image, Text, View, Button, TextInput, ScrollView, ImageBackground,TouchableOpacity   } from 'react-native';
// // //import FirebaseClient from './FirebaseClient'
// import RNFetchBlob from 'rn-fetch-blob'
// //import ImagePicker from 'react-native-image-picker';
// import firebase from 'react-native-firebase';
//
// var ImagePicker = NativeModules.ImageCropPicker;
// export default class UploadImage extends Component {
//
//
// constructor(props){
//   super(props);
//   this.state = {
//     loading: false,
//     dp: null
//   };
// }
//
// openPicker(){
//   this.setState({loading: true})
//   const Blob = RNFetchBlob.polyfill.Blob
//   const fs = RNFetchBlob.fs
//   window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
//   window.Blob = Blob
//   const  uid = "123"
//   ImagePicker.openPicker({
//     width: 105,
//     height: 105,
//     compressImageMaxWidth: 400,
//     compressImageMaxHeight: 400,
//     compressImageQuality: 0.8,
//     mediaType: 'photo',
//   }).then((image) => {
//     const imagePath = image.imagePath
//     const imageRef = firebase.storage().ref(uid).child('dp.jpg')
//     let mime = 'image/jpg'
//     fs.readFile(imagePath, 'base64')
//     .then((data) => {
//       return blob.build(data, {type: `${mime};BASE64`})
//     })
//     .then((blob) => {
//       uploadBlob = blob
//       return imageRef.put(blob, {contentType: mime})
//     })
//     .then(() =>{
//       uploadBlob.close()
//       return imageRef.getDownloadURL()
//     })
//     .then((url) =>{
//       let userData = {}
//       let obj = {}
//       obj["loading"] = false
//       obj["dp"] =url
//       this.setState(obj)
//     })
//     .catch((error) =>{
//       console.log(error)
//     })
//
//     })
//     .catch((error) => {
//       console.log(error)
//   })
// }
//
//   //
//   // constructor(){
//   //   super();
//   //   this.state ={
//   //
//   //   }
//   //   this.openPicker = this.openPicker.bind(this);
//   // }
//   //
//   //  openPicker() {
//   //
//   //   const { currentUser } = firebase.auth()
//   //   const Blob = RNFetchBlob.polyfill.Blob
//   //   const fs = RNFetchBlob.fs
//   //   window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
//   //   window.Blob = Blob
//   //
//   //   ImagePicker.openPicker({
//   //     width: 105,
//   //     height: 105,
//   //     compressImageMaxWidth: 400,
//   //     compressImageMaxHeight: 400,
//   //     compressImageQuality: 0.8,
//   //     cropping: true,
//   //     mediaType: 'photo'
//   //
//   //   })
//   //
//   //   .then(image => {
//   //     const imagePath = image.path
//   //     let uploadBlob = null
//   //     const imageRef = firebase.storage()
//   //       .ref(`/users/${currentUser.uid}`)
//   //       .child('profile.jpg')
//   //       let mime = 'image/jpg'
//   //       fs.readFile(imagePath, 'base64')
//   //
//   //       .then((data) => {
//   //         return Blob.build(data, { type: `${mime};BASE64` })
//   //     })
//   //     .then((blob) => {
//   //       uploadBlob = blob
//   //       return imageRef.put(blob, { contentType: mime })
//   //     })
//   //     .then(() => {
//   //       uploadBlob.close()
//   //       return imageRef.getDownloadURL()
//   //     })
//   //     .then((url) => {
//   //       let obj = {}
//   //       this.setState(obj)
//   //       this.addProfilePhotoDatabase() // this is where I'm attempting to upload the url to the database and where the problem is
//   //     })
//   //     .catch((error) => {
//   //       Alert.alert(error)
//   //     })
//   // })
//   // .catch((error) => {
//   //   Alert.alert(error)
//   // })
//   // }
//   //
//   // addProfilePhotoDatabase() {
//   //   const { currentUser } = firebase.auth();
//   //   firebase.database()
//   //     .ref(`/users/${currentUser.uid}/profile`)
//   //     .update({
//   //       ProfilePhoto: this.state.profilePhoto,
//   //     })
//   //   }
//
//
//
//       render() {
//         const dpr = this.state.dp ? (<TouchableOpacity onPress={ () => this.openPicker()}>
//         <Image source={{uri: this.state.dp}}/>
//         </TouchableOpacity>) :( <Button onPress={() => this.openPicker("dp")}
//         title={"add pic"}
//         />)
//         const dps = this.state.laoding ? <ActivityIndicator animating={this.state.laoding} /> : (<View>
//         <View>
//         {dpr}
//         </View>
//         </View>)
//           return (
//               <View>
//                 {dps}
//               </View>
//           )
//       }
// }
