import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  Alert,
  View,
  Switch,
  Slider,
  Picker,
  PickerIOS,
  AsyncStorage,
  Dimensions
} from 'react-native';

import Form from 'react-native-form'
import Button from 'react-native-button';

import styles from '../styles/AuthGeneralStyles';


export default class SignupTab extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      username: '',
      fullname: '',
      password: '',
      phoneNumber: ''
    };
  }

  submitUser() {
    var newUser = JSON.stringify({
      username: this.state.username,
      fullname: this.state.fullname,
      password: this.state.password,
      phoneNumber: this.state.phonenumber
    });
    console.log(newUser);
    if (this.formStatus()) {

      fetch(`${this.props.url}api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: newUser
      })
      .then( resp => { 
        resp.json()
        .then( json => {
          console.log(json, '!');
            if (json.token) {
              try {
                AsyncStorage.multiSet([['@MySuperStore:token', json.token], ['@MySuperStore:username', this.state.username]], (err) => {
                  if ( err ) { console.warn(err); }
                  this.props.updateStatus(true);
                });
              } catch (error) {
                console.log('AsyncStorage error: ' + error.message);
              }
          } else {
            Alert.alert('Email in use already');
          }
        });
      });
    }
  }

  formStatus() {
    var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    var phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if (emailRegex.test(this.state.username) && this.state.fullname.length !== 0 && this.state.password.length !== 0  && phoneRegex.test(this.state.phonenumber)) {
      return true;
    } else {
      return false;
    }
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

  updatePhone(val) {
    var newProp = {'phonenumber': val.text};
    this.setState(newProp);
  }

  render() {

    return (
      <View style={styles.viewContainer} >
        <Form style={styles.formContainer} ref={'signupForm'}>

          <View style={styles.fieldContainer}>
          <Text style={styles.subHeader} > Username </Text>
          <TextInput
            onChangeText= { (text) => this.updateFullname({text}) }
            style= { styles.container }
            name="fullname"
            type="TextInput"/>
          </View>

          <View style={styles.fieldContainer}>
          <Text style={styles.subHeader} > Email </Text>
          <TextInput
            onChangeText= { (text) => this.updateUsername({text}) }
            style= { styles.container }
            name="username"
            type="TextInput"/>
          </View>

          <View style={styles.fieldContainer}>
          <Text style={styles.subHeader}> Password </Text>
          <TextInput
            secureTextEntry={ true }
            onChangeText= { (text) => this.updatePassword({text}) }
            style= { styles.container }
            name="password"
            type="TextInput"/>
          </View>
          <View style={styles.fieldContainer}>
          <Text style={styles.subHeader}> Phone Number </Text>
          <TextInput
            secureTextEntry={ true }
            onChangeText= { (text) => this.updatePhone({text}) }
            style= { styles.container }
            name="phonenumber"
            type="TextInput"/>
          </View>
        </Form>

        <Button
          style={ this.formStatus() ? styles.button : styles.disabledbutton}
          onPress={ () => this.submitUser() }>
          Sign Up
        </Button>
      </View>


    );
  }
}