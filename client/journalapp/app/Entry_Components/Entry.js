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

var Entry = (props) => {
  return (
  <TouchableOpacity key={props.id + 'a'} onPress={() => props.navigator.push({title: 'CommentsScene', entryId: props.entryId, userId: props.userId})}>
    <View key={props.id + 'b'} style={ styles.container }>
      <View key={props.id + 'c'} style={ styles.row }>
        <View key={props.id + 'd'} style={ styles.rowHeader }>
          <Text key={props.id + 'e'} style={ styles.leftGroup }>
            <Text key={props.id + 'f'} style={ styles.username }>
              { props.username }
            </Text>
            <Text key={props.id + 'g'} style={ styles.date }>
              { parseDate(props.createdAt) }
            </Text>
          </Text>
          <Text key={props.id + 'h'} style={ styles.location }>
            { parseLocation(props.location) }
          </Text>
        </View>
        <View key={props.id + 'i'} style={ styles.rowBody }>
          <Text key={props.id + 'j'} style={ styles.entryText }>
            { parseText(props.text) }
          </Text>
        </View>
        <View key={props.id + 'k'} style= { styles.rowFooter }>
          <Text key={props.id + 'l'} style= {styles.filler}>
          </Text>
          { createTags(props) }
        </View>
      </View>
    </View>
  </TouchableOpacity>
  );
};
module.exports = Entry;


var createTags = (props) => {
  if (props.tags) {
    return props.tags.map(function(tag) {
      return (
          <Text key={props.id + 'm' + tag} style= { styles.tag }>
            { tag }
          </Text>
        );
    });
  }
};

var parseDate = (date) => {
  date = new Date(date);
  return DateFormatter(date, 'ddd, mmm d HH:MM');
};

var parseText = (text) => {
  return text.replace(/&/g, '')
}

var parseLocation = (xy) => {
  var retval = [];
  var dupe = JSON.parse(JSON.stringify(xy));
  var ll = dupe.split(', ');
  ll.forEach(function(l){
    if (Number.isFinite(Number(l))) {
      retval.push(parseInt(l));
    } else {
      retval.push(l);
    }
  });
  return retval.join(', ');
};

var click = function() {
  console.log('Entry Clicked');
};

