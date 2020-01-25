import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';



export default class MyCreatedAds extends Component{
  constructor() {
      super();
      this.state = {
            userPosts: [],
        };
      }
  _keyExtractor = (item, index) => index.toString();

  componentDidMount(){
    this.getItems();
  }
  getItems = () => {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref()//.child('users').child(uid)
    .child('userOwnedPosts/').child(uid)//.child(uid)
    .once('value', snapshot => {
      const data = snapshot.val()
      if(snapshot.val()){
        const initUserAd = [];
        Object
        .keys(data)
        .forEach(ads => initUserAd.push(data[ads]));
        this.setState({userPosts: initUserAd,
          loading: false,
          refreshing: false,
        });
      }
      }).catch(error =>{
          this.setState({error, loading: false, refreshing: false})
    });
  }

  _renderItem = ({item}) => (

  <TouchableOpacity
    id={item.id}
    onPress={() => this.props.navigation.navigate('DetailsScreen', {itemId: item})}
  >
      <Image style={{width: '100%', height: 230}} source={{uri : (item.uri)}} />
    <View>
      <Text>Boligtype: {item.boligtype}</Text>
      <Text>Månedsleie: {item.leiepris}</Text>
      <Text>Soverom: {item.antallsoverom}</Text>
    </View>
  </TouchableOpacity>
  );


  render(){
    return(
      <View>
      <FlatList
        data={this.state.userPosts}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}

      />
      </View>
    );
  }
}
