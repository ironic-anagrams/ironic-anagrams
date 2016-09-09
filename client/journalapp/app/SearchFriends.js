import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  Navigator,
  ListView,
  Dimensions
} from 'react-native';

import SearchResultsList from './SearchResultsList'

export default class SearchFriends extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      text: '',
      results: [],

    }

  };

  findMatching(query) {
    console.log(query, typeof query, 'this ma query');
    var url = 'http://localhost:3000/api/users' + "/?username=" + query;
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch(url , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then( resp => { resp.json()
        .then( json => {
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            text: query,
            results: json
          })
        })
        .catch((error) => {
          console.warn("fetch error on getrequest:", error)
        });
      });
    });
  };

  sendFriendReq(id) {
     AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
       var message = {requestReceiver:id};
       fetch('http://localhost:3000/api/friendreq', {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
         },
         body: JSON.stringify(message)
       })
         .then((response) => {
           console.log(response)
         })
           .catch((error) => {
             console.warn("fetch error:", error)
           });
     });

  }




  // Use lodash throttling (recastly sprint) to prevent blowing up the server
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          placeholder= 'Search for your friend by username'
          onChangeText={(text) => this.findMatching(text)} />
        <SearchResultsList results={this.state.results} sendreq={this.sendFriendReq.bind(this)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    flexDirection:'column',
    justifyContent:'flex-start',
    marginTop:60,
    backgroundColor: '#f5f6f6'
  },
  textinput: {
    height: 36,
    paddingLeft:12,
    borderColor: 'grey',
    borderBottomWidth: 1,
    fontSize: 14,
    fontWeight: '400',
    color:"#666666",
  },

});