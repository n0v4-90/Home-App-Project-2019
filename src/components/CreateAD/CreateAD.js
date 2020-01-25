
3
import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, TextInput, ScrollView, ImageBackground, TouchableOpacity  } from 'react-native';
import firebase from 'react-native-firebase';

import DropdownMenu from '../../assets/DropdownMenu';
import ImagePicker from 'react-native-image-picker';



export default class CreateAD extends Component{

  static navigationOptions = {
  title: 'Ny Annonse',
};


constructor(props){
  super(props);
  this.state = {
        userPosts: [],
        imageUrl: '',
        boligtype: '',
        addresse: '',
        postnr: '',
        poststed: '',
        etasje: '',
        antallsoverom: '',
        leiepris: '',
        leiesutfra: '',
        leiesuttil: '',
        annonseoverskrift: '',
        fasiliteter: '',
        beskrivelse: '',
        url: null,
        imgUrl: null,
        public: true,
       isLoading: false,

      };
      this.opprettAnnonse = this.opprettAnnonse.bind(this);
      this.uploadTask = this.uploadTask.bind(this);
}
// componentDidMount(){
//   firebase.database()
//        .ref()
//        .child("userAd")
//        .on("child_added", snapshot => {
//            const data = snapshot.val();
//            if (data){
//                this.setState(prevState => ({
//                    userAd: [data, ...prevState.userAd]
//                }))
//                console.log(this.state.userAd);
//            }
//        })
//    }

   uploadTask(){

     const  options = {
       width: 105,
       height: 105,
       storageOptions:{
         skipBackup: true
       },
      // compressImageMaxWidth: 400,
      // compressImageMaxHeight: 400,
      // ompressImageQuality: 0.8,
      // mediaType: 'photo',
     };


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


         const uid =  firebase.auth().currentUser.uid;
         const key = firebase.database().ref().child('userPosts/' + uid).push().key
         const imgRef = firebase.storage().ref('image/').child(uid).child(key);
         imgRef.put(response.uri)
         .then((snapshot) => {
           imgRef.getDownloadURL()
           .then(url => {
             this.setState({
               uri: url
             })
            //firebase.database().ref().child('userAd/').set({url})
           })
       });
       this.setState({
         imgUrl: source
       });

     }
   })
}



   opprettAnnonse() {
     this.setState({
       isLoading: true,
     });


        const userId = firebase.auth().currentUser.uid;
        const newAd = firebase.database().ref()
        .child('userOwnedPosts/')//.child("postId")
        //.child(userId)
        .push();
        newAd.set({
          'boligtype': this.state.boligtype,
          'addresse': this.state.addresse,
          'postnr': this.state.postnr,
          'poststed': this.state.poststed,
          'etasje': this.state.etasje,
          'antallsoverom': this.state.antallsoverom,
          'leiepris': this.state.leiepris,
          'leiesutfra': this.state.leiesutfra,
          'leiesuttil': this.state.leiesuttil,
          'annonseoverskrift': this.state.annonseoverskrift,
          'fasiliteter': this.state.fasiliteter,
          'beskrivelse': this.state.beskrivelse,
          'uri': this.state.uri,
          'public': this.state.public,
          uid: userId,
        })
        .then(() => {
            this.setState({
              boligtype: '',
              addresse: '',
              postnr: '',
              poststed: '',
              etasje: '',
              antallsoverom: '',
              leiepris: '',
              leiesutfra: '',
              leiesuttil: '',
              annonseoverskrift: '',
              fasiliteter: '',
              beskrivelse: '',
              isLoading: false,
            });

       this.props.navigation.goBack();
     })
   // }
   // this.props.navigation.goBack();
   //   })
     }


  render(){

    return(
      <View style={{flex:1, flexDirection: 'column'}}>

        <ScrollView>

        <ImageBackground
        style={{width: '100%', height: 230, paddingBottom: 20, backgroundColor:'lightgrey'}}>

        <Image
        source={this.state.imgUrl}
        style={{width: '100%', height:230 }}/>

        </ImageBackground>


        <View>
          <Button
              title={'Gå Videre'}
              onPress={() => this.uploadTask()}/>
        </View>

        <View style={{paddingTop: 40, paddingBottom: 40}}>
          <DropdownMenu />
            <TextInput
              placeholder={'Boligtype'}
              onChangeText={(boligtype) => this.setState({boligtype})}
              value={this.state.boligtype}
            />

            <TextInput
              placeholder={'Addresse (Frivillig)'}
              value={this.state.addresse}
              onChangeText={(addresse) => this.setState({addresse})}
            />

            <View >
              <Text>Postnr</Text>
              <TextInput
                placeholder={'Postnr'}
                value={this.state.postnr}
                onChangeText={(postnr) => this.setState({postnr})}
                />
            </View>

            <TextInput
              placeholder={'Poststed'}
              value={this.state.poststed}
              onChangeText={(poststed) => this.setState({poststed})}
            />
            <TextInput
              placeholder={'Etasje'}
              value={this.state.etasje}
              onChangeText={(etasje) => this.setState({etasje})}
            />

            <TextInput
              placeholder={'Antall Soverom'}
              value={this.state.antallsoverom}
              onChangeText={(antallsoverom) => this.setState({antallsoverom})}
            />

            <TextInput
              placeholder={'Leiepris'}
              value={this.state.leiepris}
              onChangeText={(leiepris) => this.setState({leiepris})}
            />

            <TextInput
              placeholder={'Depositum'}
              value={this.state.depositum}
              onChangeText={(depositum) => this.setState({depositum})}
            />

            <TextInput
              placeholder={'Annonseoverskrift'}
              value={this.state.annonseoverskrift}
              onChangeText={(annonseoverskrift) => this.setState({annonseoverskrift})}
            />

            <TextInput
              placeholder={'Fasiliteter'}
              value={this.state.fasiliteter}
              onChangeText={(fasiliteter) => this.setState({fasiliteter})}
            />

            <TextInput
              placeholder={'Leies ut fra'}
              value={this.state.leiesutfra}
              onChangeText={(leiesutfra) => this.setState({leiesutfra})}
            />
            <TextInput
              placeholder={'Leies ut til'}
              value={this.state.leiesuttil}
              onChangeText={(leiesuttil) => this.setState({leiesuttil})}
            />

            <TextInput
              placeholder={'Beskrivelse'}
              value={this.state.beskrivelse}
              onChangeText={(beskrivelse) => this.setState({beskrivelse})}
            />

          </View>

        <View>
          <Button
              title={'Gå Videre'}
              onPress={() => this.opprettAnnonse()}
          />
        </View>
        </ScrollView>
      </View>
    );
  }
}
