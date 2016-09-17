import React, { Component } from 'react';
import DateFormatter from 'dateformat';

import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import styles from '../styles/EntryStyles';

var Comment = (props) => (
  <View style={ styles.container }>
      <View style={ styles.row }>
        <View style={ styles.rowHeader }>
          <Text style={ styles.date }>
            { parseDate(props.createdAt) }
          </Text>
          <Text style={ styles.location }>
            { props.location }
          </Text>
        </View>
        <View style={ styles.rowBody }>
          <Text style={ styles.entryText }>
            { props.text }
          </Text>
        </View>
      </View>
  </View>
);

module.exports = Comment;

var parseDate = (date) => {
  date = new Date(date);
  return DateFormatter(date, "ddd, mmm d");
};
