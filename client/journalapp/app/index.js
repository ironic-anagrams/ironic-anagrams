
// app/index.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native';
// import React, { Component, View, Text, StyleSheet } from 'react-native';
import Tabs from 'react-native-tabs';
//import EntryList from "./EntryList"
var EntryList = require('./EntryList')

export default class Journalapp extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      page: 'first',
      text: 'What did you do today?',
      //entries:[]
      entries: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }

  // componentDidMount() {
  //   this.getEntries();
  // }

  getEntries(){
    console.log('does my get entires get called?')
    fetch('http://zpdubmisbk.localtunnel.me/api/entries')
      .then( (result) => {
        console.log("get request", result);
        this.setState({
          entries:ds.cloneWithRows(result)
        })
      })
      .catch((error) => {
        console.warn("fetch error on getrequest:", error)
      })
  }

  handleMessageSubmit() {
    var message = {text:this.state.text};
    console.log("Does this get ran?",this.state.text);

    fetch('http://zpdubmisbk.localtunnel.me/api/entries', {
       method: 'POST',
       headers: {
         //'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(message)
     })
      .then((response) => {
        console.log(response)
        this.getEntries();
      })
       .catch((error) => console.warn("fetch error:", error))
       .then((response) => {
         console.log(response)
         //return response.json()
       }
       )
    //   .then(fetch('get request api endpoint'))

  }


render() {
 const { page } = this.state;

   return (

       <View style={styles.container}>
       <TextInput
           style={styles.textinput}
           value={this.state.text}
           onChangeText={(text) => this.setState({text})}
           onSubmitEditing= {this.handleMessageSubmit.bind(this)}
        />

        <EntryList
          entries = {this.state.entries}
        />

         <Tabs
           selected={page}
           style={styles.tabbar}
           selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}
         >
             <Text name="first">First</Text>
             <Text name="second">Second</Text>
             <Text name="third">Third</Text>
         </Tabs>

         <Text>CodeSharing App</Text>
         <Text>{page}</Text>
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
  tabbar: {
    backgroundColor:'white',
    height: 64,
    borderTopColor: 'red',
    borderTopWidth: 2
  },
  textinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1

  }
});


