import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'
import {SignedOut} from '../../../App';


export default class SignUp extends React.Component {

  static navigationOptions = {
  title: 'Sign Up',
};

  state = { email: '', password: '', username: '', errorMessage: null, }

  handleSignUp = () => {
    const { email, password, username, validate } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      // .then(function(user_id) {
      //   let root = firebase.database().ref();
      //   let uid = user_id.uid;
      //   let newUsers = {
      //     email,
      //     username
      //   };
      //   root.child('users').child(uid).set({newUsers});
      // })
      .then(()=> {
          let account = {}
          account.email = email
          account.username = username
          //firebase.database().ref('users/' + firebase.auth().currentUser.uid).push(acc)
          const userId = firebase.auth().currentUser.uid;
          firebase.database().ref('users/' + userId).child('profile')
          .push()
          .set({account})
        }).then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName : username
          })

        // let accountInfo = {}
        // // accountInfo.email = email
        // // accountInfo.uid = authData.uid
        // // accountInfo.username = username
        // firebase.database().ref('users/').child(authData.uid).set({accountInfo})

            //.then(() => {
            // ******** Now we need to grap a snapshot from the DB to validate account creation and update the redux store locally ********
            // firebase.database().ref('users/' + authData.uid).once('value').then(function (snapshot) {
            //     let updatedUser = snapshot.val();
            // }).then(() => {
            //     dispatch(userSet(updatedUser));
            //
            // })
      // .then(user => this.props.navigation.navigate('UserInfo'))
      // .catch(error => this.setState({ errorMessage: error.message }))
})
//})
}

  render() {

    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          <TextInput
            placeholder="username"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
