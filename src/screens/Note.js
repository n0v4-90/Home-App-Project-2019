import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Image
} from 'react-native';
import firebase from 'react-native-firebase';



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

  },
  description: {
      textAlignVertical: 'bottom',
       includeFontPadding: false,
       flex: 1.1,
       fontWeight: 'bold',
       fontSize: 20,
       color: 'black'
  }

})




export default class Note extends Component {


    render() {

        return (

          <TouchableOpacity
            >
            <View
            key={this.props.keyval}
            style={styles.container}>

            <View styele={styles.contentContainer}>
              <View style={styles.iamgeContainer}>
                <ImageBackground
                  style={{width: '100%', height: 230, paddingBottom: 20, backgroundColor:'lightgrey'}}>
                    <Image style={{width: '100%', height: 230}} source={{uri : (this.props.val.uri)}} />
                </ImageBackground>
              </View>

                <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Boligtype: {this.props.val.boligtype}</Text>
                <Text style={styles.textStyle}>Månedsleie: {this.props.val.leiepris}</Text>
                <Text style={styles.textStyle}>Soverom: {this.props.val.antallsoverom}</Text>
                </View>

                <View style={styles.description1}>
                <Text style={styles.description}>{this.props.val.annonseoverskrift}</Text>
                </View>
                
                </View>

                {/*
                <Text style={styles.textStyle}>{this.props.val.addresse}</Text>
                <Text style={styles.textStyle}>{this.props.val.postnr}</Text>
                <Text style={styles.textStyle}>{this.props.val.poststed}</Text>
                <Text style={styles.textStyle}>{this.props.val.etasje}</Text>

                <Text style={styles.textStyle}>{this.props.val.leiesutfra}</Text>
                <Text style={styles.textStyle}>{this.props.val.leiesuttil}</Text>
                <Text style={styles.textStyle}>{this.props.val.annonseoverskrift}</Text>
                <Text style={styles.textStyle}>{this.props.val.fasiliteter}</Text>



                <TouchableOpacity onPress={this.props.deleteMethod}>
                    <Text>D</Text>
                </TouchableOpacity>
                */}
            </View>


            </TouchableOpacity>
        );
    }
}
