import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native';

import Request from './Request';
import styles from '../styles/RequestListStyles';

var RequestList = (props) => {
  if (props.requestList.length > 0){
    return (

      <View>
      <Text style={ styles.subHeader } >Pending Friend Requests</Text>
        { props.requestList.map( (request) => {
            return ( <Request fullname={ request.user.fullname } 
                              username={ request.user.username } 
                              key={ request.id }
                              requestId={ request.id } 
                              acceptFriend={ props.acceptFriend } 
                              rejectFriend={ props.rejectFriend }
                              navigator={ props.navigator }/> );
                  }) 
        }
      </View>

    )
  } else {
    return(
      <View></View>
      )
  }
};

module.exports = RequestList;