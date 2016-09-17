import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  AsyncStorage,
  Navigator,
  Dimensions
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles/MessageSceneStyles';

// Note that this is a scene, not a tab view. In this case, that means the user clicked on "What did you do today?" in 
// EntriesTab.js. EntriesTab then tells Main.js to navigate to this scene. 
export default class FriendScene extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      dynamicHeight: () => { return {height: Dimensions.get('window').height - 49 - 70}; }
    };
  }

  componentDidMount() {
    this.props.updateEntry('');
  }

  // This shrinks the container to accommodate the keypad, when the user clicks the text input
  // to begin his/her entry. The footer is thus effectively pulled up the view. 
  moveUpForKeyboardShow() {
    setTimeout( ()=> {
      this.setState(
        { dynamicHeight: () => { return { height: Dimensions.get('window').height * .45 }; } }
      );
    }, 200); 
  }

  // When the user clicks out of the text input but remains on this view, this resets the container
  // back to its original size, effectively pushing the footer back down. 
  moveDownForKeyboardHide() {
    this.setState(
      { dynamicHeight: () => { return {height: Dimensions.get('window').height - 49 - 70}; } }
    );
  }

  render() {
    return (
      <ScrollView style={ styles.container } ref='scrollView'>
        <TextInput
            keyboardType='default'
            keyboardAppearance='light' 
            multiline={ true }
            placeholder= 'What did you do today?'
            style={ [this.state.dynamicHeight(), styles.bodyWidth, styles.fadedText] }
            maxLength={ 100 }
            onChangeText={ (text) => this.props.updateEntry(text) } //input from user here!
            onFocus= { this.moveUpForKeyboardShow.bind(this) }
            onBlur= { this.moveDownForKeyboardHide.bind(this) }/>
        <View style={ [styles.bodyWidth, styles.footer] }>
          <Icon style={ [styles.footerContent, styles.footerPadlock] /*part of input box footer*/ } name="lock-open"/>
          <Icon style={ [styles.footerContent, styles.footerArrow] /*part of input box footer*/} name="near-me"/>
          <Text style={ [styles.footerContent, styles.footerText] }>{ this.props.location /*why doesn't this show?*/ }</Text>
        </View>
      </ScrollView>
    );
  }
}