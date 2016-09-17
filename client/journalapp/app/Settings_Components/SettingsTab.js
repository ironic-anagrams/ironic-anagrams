// app/index.js

import React, { Component } from 'react';
import {
  Alert, 
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  AsyncStorage,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/SettingsTabStyles';
import Prompt from 'react-native-prompt';

var warningMessage = 'Once you delete all entries, you can\'t undo this. Are you sure you\'d like to proceed?';

// () => this.props.deleteEntries(this.state.username)
export default class SettingsTab extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      username: '',
      deletePromptVis: false,
      password: ''
    };

    AsyncStorage.getItem('@MySuperStore:username')
    .then( username => {
      this.setState({
        username: username
      });
      return AsyncStorage.getItem('@MySuperStore:password');
    })
    .then( password => {
      this.setState({
        password: password
      });
    })
    .done();
  }

  deleteAcct() {
    var toDelete = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    });
    
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {

      fetch('http://localhost:3000/api/account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: toDelete
      })
      .then(resp => {
        console.log('delete user successful');
        resp.json();
      })
      .catch(err => console.log('Error: ', err));
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.subHeader }>Profile information</Text>
        <TouchableHighlight>
          <View style={ styles.rowContainer }>
            <View style={ styles.row }>
              <Text style={ styles.bodyText }>Username: { this.state.username }</Text>
              <Icon style= {styles.arrow} name="navigate-next" ></Icon>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.setState({deletePromptVis: true}) }>
          <View style={ styles.rowContainer }>
            <View style={ styles.row }>
              <Text style= { styles.bodyText }>Delete All Entries
              </Text>
              <Icon style= {styles.arrow} name='speaker-notes-off'/>
            </View>
          </View>
        </TouchableHighlight>

        <Prompt
            title="Type Reset to Confirm"
            visible={this.state.deletePromptVis}
            onCancel={() => this.setState({ deletePromptVis: false})}
            onSubmit={(secret) => {
              this.props.deleteEntries(this.state.username, secret);
              this.setState({ deletePromptVis: false});
            }
            }/>

        <Button onPress= { () => this.props.signOut() } style={ {marginTop: 10, padding: 20, backgroundColor: 'white'} }>Sign Out</Button>
        <Button onPress= { () => { this.deleteAcct(); this.props.signOut(); } } style={ {marginTop: 10, padding: 20, color: 'red', backgroundColor: 'white'} }>Delete Account</Button>
      </View>
   );
  }
}

