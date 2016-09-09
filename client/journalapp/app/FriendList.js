import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,

} from 'react-native';

import Friend from './Friend';

var FriendList = (props) => {

  return (

    <View>
    <Text style={ styles.subHeader } >Your Friends</Text>
      { props.friendList.map( (friend) => {
        return (
          <Friend

          username={ friend.username }
          fullname={ friend.fullname }
          id={ friend.id }
          navigator={ props.navigator }
          updateFriend={ props.updateFriend }/>
          );
      }) }

    </View>
  )
};

const styles = StyleSheet.create({
  subHeader: {
    fontSize: 12,
    fontWeight: '700',
    color:"#424242",
    marginLeft:12,
    marginBottom:12,
    marginTop:17
  }
});

module.exports = FriendList;