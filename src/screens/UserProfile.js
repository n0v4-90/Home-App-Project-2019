import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, TouchableOpacity,TouchableHighlight, FlatList } from 'react-native';
import firebase from 'react-native-firebase';

import SignUp from '../components/SignUp';
import { SignedOut, SignedIn } from "../../App";


export default class UserProfile extends Component{


 state = { currentUser: null,  }


  componentDidMount() {
    const {currentUser}  = firebase.auth()
    // const userId = firebase.auth().currentUser.uid;
    // const user = firebase.database().ref('users/' + userId).child('account/').child('username/');
    // //const usrID = user1.child('account');
    // const userRef = user.child('username');
    this.setState({ currentUser });

  }



  renderComponent(){
    if(this.state.currentUser){
      return(<Button title="Sign out"
      onPress={() => firebase.auth().signOut()}
      />
    );
  } else {
    return (<SignUp />)
  }
}


  render(){

  const { currentUser} = this.state;
    return(
      <View style={{flex:1, flexDirection:'column' }}>

        <View style={{flex:0.80, flexDirection: 'column', alignItems: 'center', backgroundColor: '#F87123'}}>
          <View style={{paddingTop: 30, paddingBottom:15}}>
            <Image
               style=
               {{
                 width: 100,
                 height: 100,
                 borderRadius: 400/ 2,
                 backgroundColor:'blue',
               }}
            />
          </View>

          <Text style={{ fontWeight: 'bold', fontSize: 18}}>
          {currentUser && currentUser.email}
          </Text>


          <Text style={{ fontWeight: 'bold', fontSize: 10}}>
            Verifisert
          </Text>

          <Text style={{ fontWeight: 'bold', fontSize: 30}}>
          {this.state.username}
          </Text>

        </View>

        <View style={{flex:1.3}}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 10, paddingBottom:10, paddingLeft:10}}>
          Epost
        </Text>

        <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 10, paddingBottom:10, paddingLeft:10}}>
          Telefonnr
        </Text>


        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('MyCreatedAds')}
          >
          <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 10, paddingBottom:10, paddingLeft:10}}>
            Mine Annonser
          </Text>
        </TouchableOpacity>

        <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 10, paddingBottom:10, paddingLeft:10}}>
          Kontakt oss
        </Text>


        <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 10, paddingBottom:10, paddingLeft:10}}>
          Gi oss tilbakemelding
        </Text>

        <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 10, paddingBottom:10, paddingLeft:10}}>
          Brukervilkår
        </Text>

        <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 10, paddingBottom:10, paddingLeft:10}}>
          Om Appen
        </Text>

          {this.renderComponent()}
          </View>
      </View>
    );
  }
}
