import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native';

import SearchResultRow from './SearchResultRow';

var SearchResultsList = (props) => {
  return (

    <View>
      { props.results.map( (friend) => {
        return ( <SearchResultRow username={ friend.username } fullname={ friend.fullname } id={ friend.id } sendreq={props.sendreq} navigator={props.navigator}/> );
      }) }

    </View>

  )
};

module.exports = SearchResultsList;