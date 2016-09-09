import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'

var Friend = (props) => {

  return (
    <TouchableHighlight onPress={()=>{ props.navigator.push({title: 'FriendPage', friendId: props.id });
                                                               props.updateFriend(props.fullname) }}>
      <View style={styles.container}>
        <View style={ styles.row }>
          <Text style={ styles.bodyText } >
          { props.fullname }
          </Text>

          <Icon style= {styles.arrow} name="navigate-next" ></Icon>
        </View>
      </View>
    </TouchableHighlight>

  )
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    flexDirection: 'column',
  },
  bodyText: {
    flexDirection: 'column',
    position:'relative',
    fontSize: 14,
    fontWeight: '400',
    color:"#666666",
    alignSelf:'center'
  },
  row: {
    flexDirection: 'row',
    paddingTop:12,
    paddingBottom:12,
    marginLeft:12,
    marginRight:12,
    borderBottomWidth: 0.5,
    borderColor: '#cccccc',
    justifyContent:'space-between'
  },
  arrow: {
    alignSelf:'flex-end',
    flexDirection: 'column',
    fontSize:24,
    color:"#c7c7cc",
  }
});

module.exports = Friend;