// import { StyleSheet, Platform, Image, Text, View, Button, TextInput, ScrollView, ImageBackground,TouchableOpacity   } from 'react-native';
//
// const storage = firebase.storage()
// const database = firebase.database()
//
//
// componentDidMount() {
//     const ref = database.ref().child(this.state.user.uid)
//     ref.on('child_added', (child) => {
//        let images = this.state.images.slice()
//        images.push({
//           key: child.key,
//           url: child.val().url
//        })
//        this.setState({images})
//     })
// }
//
// 
// storePhoto() {
//    const key = database.ref().child(this.state.user.uid).push().key
//    const img = storage.ref().child(this.state.user.uid).child(key)
//    img.put(this.state.file).then((snap) => {
//       database.ref().child(this.state.user.uid).child(key).set({
//          "url" : snap.metadata.downloadURLs[0]
//       })
//    })
//    this.setState({
//       file: null,
//       url: null,
//    })
// }
//
// {this.state.images.map((image) =>
//      <View key={image.key}>
//           <Image src={image.url} style={imgStyle}/>
//           <Button onClick={this.deletePhoto}
//                name={image.key}>remove</button>
//      </View>
// )}
