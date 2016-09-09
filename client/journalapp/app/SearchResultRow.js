import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

var SearchResultRow = (props) => {

  return (
    <TouchableHighlight onPress={props.sendreq(props.id)}>
      <View style={styles.container}>
       <View style={ styles.row }>
        <Text style={styles.bodyText}>
        { props.fullname }
        </Text>
          <Text style={styles.subbodyText}>
          { props.username }
          </Text>
        <Image style={styles.image} source={require('./images/Add_Friend.png')}/>
        </View>
      </View>
    </TouchableHighlight>
  )
};


module.exports = SearchResultRow;

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
  subbodyText: {
    flexDirection: 'column',
    position:'relative',
    fontSize: 11,
    fontWeight: '300',
    color:"#999999",
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
  image: {
    height: 24,
    width:24,
    alignSelf:'flex-end',
    flexDirection: 'column',
    color:"#c7c7cc",
  }
});