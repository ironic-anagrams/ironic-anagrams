
// app/index.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  AsyncStorage
} from 'react-native';

// Refactored to use import instead of ES2015 require, for consistency 
import EntryList from './EntryList';

export default class EntriesTab extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      text: 'What did you do today?',
      //entries:[]
      entries: ds.cloneWithRows([{"id":1,"user_id":123,"text":"OMG OMG OMG... So much stuff happened today, OMG. OMG!","createdAt":"2016-09-01T21:59:59.834Z","updatedAt":"2016-09-01T21:59:59.834Z"},
        {"id":2,"user_id":123,"text":"OMG OMG OMG... So much stuff happened today, OMG. OMG!","createdAt":"2016-09-01T22:10:57.683Z","updatedAt":"2016-09-01T22:10:57.683Z"},
        {"id":3,"user_id":123,"text":"hello worls","createdAt":"2016-09-01T22:11:04.765Z","updatedAt":"2016-09-01T22:11:04.765Z"},
        {"id":4,"user_id":123,"text":"hello world!!!","createdAt":"2016-09-01T22:16:38.743Z","updatedAt":"2016-09-01T22:16:38.743Z"},
        {"id":5,"user_id":123,"text":"OMG OMG OMG... So much stuff happened today, OMG. OMG!","createdAt":"2016-09-01T22:17:31.103Z","updatedAt":"2016-09-01T22:17:31.103Z"}])
    };
  }

    // componentWillMount() {
    //   this.getEntries();
    // }

    getEntries(){

      AsyncStorage.getItem('@MySuperStore:key', (err, token) => {

        console.log("*** FIRING GET ENTRIES ");
        fetch('http://localhost:3000/api/entries', {
          method: 'GET',
          // params: { 'userId': 30},
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        })    
        .then( resp => { resp.json()
          .then( json => {
            console.log("~~~~~***** get request", json);
            ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              entries: ds.cloneWithRows(json)
            })
          })
          .catch((error) => {
            console.warn("fetch error on getrequest:", error)
          });
        });
      });
    
    }

    handleMessageSubmit() {

      AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
        var message = {text:this.state.text};

        fetch('http://localhost:3000/api/entries', {
          method: 'POST',
          headers: {
             //'Accept': 'application/json',
           'Content-Type': 'application/json',
           'x-access-token': token
          },
          body: JSON.stringify(message)
        })
          .then((response) => {
            console.log(response)
            this.getEntries();
          })
            .catch((error) => {
              console.warn("fetch error:", error)
            });
      });

    }


  render() {
   const { page } = this.state;

     return (
        <View>
         <TextInput
             style={styles.textinput}
             value={this.state.text}
             onChangeText={(text) => this.setState({text})}
             onSubmitEditing= {this.handleMessageSubmit.bind(this)} />
          <EntryList entries = {this.state.entries} />
        </View>

     )
   }
  }

const styles = StyleSheet.create({
  textinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1

  }
});
