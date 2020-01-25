import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';
import Note from './Note'


import AdButton from '../components/CreateAD/Button/AdButton';

export default class Feed extends Component{
  static navigationOptions = {
  title: 'Feed',
};

  constructor() {
      super();
      this.state = {
            userPosts: [],
            loading: false,
            refreshing: false,
            page: 1,
        };
      }

_keyExtractor = (item, index) => index.toString();

componentDidMount(){
  this.getItems();
}
getItems = () => {
this.setState({loading: true});
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref().child('userOwnedPosts')
  //.child(uid)
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

handleRefresh = () => {
  this.setState({
    refreshing: true,
  }, () => {
    this.getItems();
  })

};


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
    let notes = this.state.userPosts.map((val, key ) =>{
            return <Note key={key} keyval={key} val={val}
                    deleteMethod={()=>this.deleteNote(key)}/>
                     });

    return(
      <View style={{flex: 1}}>


      <Button
        title="Ny Annonse"
        onPress={() => this.props.navigation.navigate('CreateAD')}
      />

      <FlatList
        data={this.state.userPosts}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />
      </View>
    );
  }

  deleteNote(key){
        this.state.userAd.splice(key, 1);
        this.setState({userAd: this.state.userAd});
      }
}
