import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class Todo extends Component {


  componentDidMount(){
    firebase.database()
        .ref()
        .child("todo")
        .on("child_added", snapshot => {
            const data = snapshot.val();
            if (data){
                this.setState(prevState => ({
                    userAd: [data, ...prevState.userAd]
                }))
                console.log(this.state.userAd);
            }

        });
    }
    addNote(){
        // firebase function here to send to the database
        if (!this.state.noteText) return;
        var d = new Date();
        const newNote =  firebase.database().ref()
                              .child("todo")
                              .push ();
        newNote.set({
            'date':d.getFullYear()+
            "/"+(d.getMonth()+1) +
            "/"+ d.getDate(),
            'note': this.state.noteText
        });
        this.setState({noteText:''});
    }

    render() {
        return (
            <View key={this.props.keyval} >
                <Text>{this.props.val.date}</Text>
                <Text >{this.props.val.note}</Text>
                <TouchableOpacity onPress={this.props.deleteMethod}>
                    <Text>D</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
