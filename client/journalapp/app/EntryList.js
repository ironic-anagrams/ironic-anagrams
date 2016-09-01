import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native';

class EntryList extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <ListView
         dataSource={this.props.entries}
         renderRow={(rowData) => <Text>{rowData}</Text>}
       />
    );
  }
}

module.exports = EntryList;


