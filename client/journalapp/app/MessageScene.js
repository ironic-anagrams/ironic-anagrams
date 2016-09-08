import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  Navigator,
  ListView, 
  Dimensions
} from 'react-native';

import Button from 'react-native-button';


const styles = StyleSheet.create({
  textinput: {
    height: 40, 
    maxWidth: Dimensions.get('window').width * .75 
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('window').width * .9,
    paddingTop: 70
  },
  fadedText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  }
});

export default class FriendScene extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  };

  componentDidMount(){
    this.props.updateEntry('');
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput
            keyboardType='default'
            keyboardAppearance='light' 
            placeholder= 'What did you do today?'
            style={ [styles.textinput, styles.fadedText] }
            maxLength={ 100 } 
            onChangeText={ (text) => this.props.updateEntry(text) } />
      </View>
    )
  }
}