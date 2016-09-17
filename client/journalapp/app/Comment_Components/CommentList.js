import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native';

// VB: Refactored require to use import, for consistency
import Comment from './Comment';
import styles from '../styles/EntryListStyles';

var CommentList = (props) => (
    <ListView style ={styles.container}
       enableEmptySections={true}
       dataSource={props.entries}
       renderRow={ (rowData) =>
          <Comment text={ rowData.text } createdAt={ rowData.createdAt } location={ rowData.location } user = {rowData.username}/>
        }/>
)

module.exports = CommentList;

