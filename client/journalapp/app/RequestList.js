import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native';

import Request from './Request';

var RequestList = (props) => {
  if (props.requestList.length > 0){

    return (

      <View>
      <Text style={ styles.subHeader } >Pending Friend Requests</Text>
        { props.requestList.map( (request) => {
          return ( <Request fullname={ request.user.fullname } username={ request.user.username } requestId={request.id} acceptFriend={props.acceptFriend} navigator={props.navigator}/> );
        }) }

      </View>

    )
  } else {
    return(
      <View></View>
      )
  }
};

const styles = StyleSheet.create({
  subHeader: {
    fontSize: 12,
    fontWeight: '700',
    color:"#424242",
    marginLeft:12,
    marginBottom:12,
    marginTop:18
  }
});

module.exports = RequestList;