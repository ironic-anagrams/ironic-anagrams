
// app/index.js

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  AsyncStorage,
  Dimensions, 
  Image
} from 'react-native';

import DateFormatter from 'dateformat';
import Button from 'react-native-button';
import EntryList from './EntryList';

import GeoCoder from 'react-native-geocoder';

import styles from '../styles/EntriesTabStyles';

export default class EntriesTab extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    this.props.getEntries();
    //swipeout enabled
  }
  //delete button gets prop of msgId

  render() {

    // Note that the posting of a new message to the database actually occurs in Main.js. When the user 
    // wants to enter a new message, the navigator scene here tells the Navigator in Main.js to render
    // the post new entry view. The onPress method of the Button here sets this off. 
    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <TextInput
              keyboardType='default'
              keyboardAppearance='light'
              placeholder= 'Search tags'
              style={ {height: 50, textAlign: 'center', borderWidth: 1, borderColor: '#cccccc', marginBottom: 16} }
              onChangeText={ (text) => this.props.filterTags(text) }/>
          <Text style={ styles.date }>{ DateFormatter(new Date(), 'ddd, mmm d') }</Text>
          <Button style={ styles.headerButton } 
                  onPress={ () => this.props.navigator.push({ title: 'MessageScene'}) }>
            <Text style={ styles.buttonText }>What do you want to broadcast?</Text>
            <Image style={ styles.tabbarimage } source={require('./../images/Pen_Icon.png')}/>
          </Button>
        </View>
        <EntryList deleteEntries={ this.props.deleteEntries } entries={ this.props.entries } navigator={ this.props.navigator }/>
      </View>

     );
  }
}

