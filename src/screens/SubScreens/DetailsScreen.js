import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';



export default class DetailsScreen extends Component {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render(){
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    return(
      <ScrollView>
      <View style={styles.container}>
              <View styele={styles.contentContainer}>
              <View>
                <Image style={{width: '100%', height: 230}} source={{uri : (itemId.uri)}} />
              </View>

              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems:'flex-start',
                marginTop: 20,
                marginBottom: 15
              }}>
              <View Style={{flexDirection: 'column'}}>
                  <Text style={styles.textStyle}>Poststed: {itemId.poststed}</Text>
                  <Text style={styles.textStyle}>Boligtype: {(itemId.boligtype)}</Text>
                  </View>
              </View>


                <View style={styles.textContainer}>
                <View>
                  <Text style={styles.textStyle}>Månedsleie: {(itemId.leiepris)}</Text>
                  <Text style={styles.textStyle}>Depositum: {itemId.depositum}</Text>
                </View>
                <View>
                  <Text style={styles.textStyle}>Etasjer: {itemId.etasje}</Text>
                  <Text style={styles.textStyle}>Soverom: {(itemId.antallsoverom)}</Text>
                  </View>
                </View>

                <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />

                <View style={styles.descriptionContiner}>
                  <Text style={styles.description}>{(itemId.annonseoverskrift)}</Text>
                </View>

                <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />

                <View style={styles.fasilitContainer}>
                  <Text style={styles.textStyle}>Fasiliteter</Text>
                    <Text>
                      {itemId.fasiliteter}
                    </Text>
                </View>

                <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />

                <View style={styles.adressContainer}>
                  <Text style={styles.textStyle}>Adresse: {itemId.addresse}</Text>
                  <Text style={styles.textStyle}>Post nummer: {itemId.postnr}</Text>
                  <Text style={styles.textStyle}>Leies ut fra: {itemId.leiesutfra}</Text>
                  <Text style={styles.textStyle}>Leies ut til:{itemId.leiesuttil}</Text>
                </View>

                <View style={styles.beskrivelseContainer}>
                  <Text style={styles.textStyle}>Beskrivelse</Text>
                  <Text>
                    {itemId.beskrivelse}
                  </Text>
                </View>
                <View>
                  <Button
                    title='Send Melding'

                  />
                </View>
              </View>
        </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6
  },
  contentContainer:{
     elevation: 1,
  },
  iamgeContainer:{

  },
  textContainer: {
        paddingTop:5,
        paddingBottom:5,
        flex:1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent:'space-between'
  },
  textStyle: {
      fontSize: 13.25,
      fontWeight: 'bold',

  },
  descriptionContiner: {
    marginTop: 5,
    marginBottom: 10,
  },
  description: {
      //textAlignVertical: 'bottom',
       includeFontPadding: false,
       flex: 1.1,
       fontWeight: 'bold',
       fontSize: 20,
       color: 'black'
  },
  fasilitContainer: {
    flex:2,
    marginTop:10,
    marginBottom:10
  },
  adressContainer: {
    flex: 3
  },
  beskrivelseContainer:{
    flex:3,
    marginTop:10,
    marginBottom:10
  },
  secondContainer: {


  }

})
