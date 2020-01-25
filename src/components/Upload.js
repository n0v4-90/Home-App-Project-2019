import {Image, StyleSheet, Text, TextInput, View, Button } from 'react-native'
const React = require('react')
//import firebase, { storage, database } from '../firebase'
import firebase from 'react-native-firebase'
class Upload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: this.props.user,
      file: null,
      url: null,
      images: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.storePhoto = this.storePhoto.bind(this)
    this.deletePhoto = this.deletePhoto.bind(this)
  }
  handleChange(e) {
    this.setState({
        file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0])
    })
  }
  storePhoto() {
    const key = firebase.database().ref().child(this.state.user.uid).push().key
    const img = firebase.storage().ref().child(this.state.user.uid).child(key)
    img.put(this.state.file).then((snap) => {
      firebase.database().ref().child(this.state.user.uid).child(key).set({
        "url" : snap.metadata.downloadURLs[0]
      })
    })

    this.setState({
      file: null,
      url: null,
    })
  }
  deletePhoto(event) {
    let uid = this.state.user.uid
    let img = event.target.name
    firebase.storage().ref().child(uid).child(img).delete()
    firebase.database().ref().child(uid).child(img).remove()
  }
  componentDidMount() {
    const ref = firebase.database().ref().child(this.state.user.uid)
    ref.on('child_added', (child) => {
      let images = this.state.images.slice()
      images.push({
        key: child.key,
        url: child.val().url
      })
      this.setState({images})
    })
    ref.on('child_removed', (child) => {
      let images = this.state.images.filter((image) => {
        return image.url != child.val().url
      })
      this.setState({images})
    })
  }
  render() {
    const previewStyle = {
      Height: 100,
      Width: 100
    }
    const imgStyle = {
      Height: 400,
      Width: 400
    }
    return (
      <View>

        <Image src={this.state.url} style={previewStyle}/>
        <Button onClick={this.storePhoto}
        title={'upload'}
        />
        {this.state.images.map((image) =>
          <View key={image.key}>
            <Image src={image.url} style={imgStyle}/>
            <Button onClick={this.deletePhoto}
               name={image.key}
               title={'remove'}
               />
          </View>
        )}
      </View>
    );
  }
}
module.exports = Upload
