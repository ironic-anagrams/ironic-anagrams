import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Switch, 
  Slider, 
  Picker, 
  PickerIOS,
  AsyncStorage
} from 'react-native';

import Form from 'react-native-form'
import Button from 'react-native-button';

var inputStyle = {
  height: 20, borderColor: 'gray', borderWidth: .5
};

export default class SignupTab extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      username: '',
      fullname: '',
      password: ''
    };
  }

  submitUser() {  
    var newUser = JSON.stringify({
      username: this.state.username,
      fullname: this.state.fullname,
      password: this.state.password
    });

    fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newUser
    })
    .then( resp => { resp.json()
      .then( json => {
        try {
          AsyncStorage.setItem('@MySuperStore:token', json.token, (err) => { 
            if ( err ){ console.warn(err); } 
            this.props.updateStatus(true);
          });
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
      });
    });

  }

  updateFullname(val) {
    var newProp = {'fullname': val.text};
    this.setState(newProp);
  }

  updateUsername(val) {
    var newProp = {'username': val.text};
    this.setState(newProp);
  }

  updatePassword(val) {
    var newProp = {'password': val.text};
    this.setState(newProp);
  }

  render() {

    return (
      <View>
        <Form ref={'signupForm'}>
          <Text> Enter your full name: </Text>
          <TextInput 
            onChangeText= { (text) => this.updateFullname({text}) }
            style= { inputStyle } 
            name="fullname" 
            type="TextInput"/> 

          <Text> Enter a username: </Text>
          <TextInput 
            onChangeText= { (text) => this.updateUsername({text}) }
            style= { inputStyle } 
            name="username" 
            type="TextInput"/> 

          <Text> Enter a password: </Text>
          <TextInput 
            secureTextEntry={ true }
            onChangeText= { (text) => this.updatePassword({text}) }
            style= { inputStyle } 
            name="password" 
            type="TextInput"/> 

        </Form>
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={ () => this.submitUser() }>
          Submit
        </Button>
      </View>


    );
  }
}
