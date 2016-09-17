import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ListView,
  AsyncStorage,
  Navigator,
  Dimensions
} from 'react-native';

import CommentList from './CommentList';
import styles from '../styles/MessageSceneStyles';
import stylesEntriesTab from '../styles/EntriesTabStyles';

export default class CommentsScene extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      dynamicHeight: () => { return {height: Dimensions.get('window').height - 49 - 500};},
      comment: '',
      entryId: this.props.entryId,
      userId: this.props.userId,
      location: this.props.location,
      comments: [],
      maxLength: 100
    };

  }

  componentDidMount() {

    var id = JSON.stringify(this.state.entryId);

    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch(`http://localhost:3000/api/comments?entryId=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        query: id
      })
      .then( resp => { resp.json()
        .then( comments => {
          this.setState({
            comments: this.state.comments.concat(comments)
          });
        })
        .catch((error) => {
          console.warn("fetch error on get request:", error);
        });
      });
    });
  }

  updateComment(text) {
    this.setState({
      comment: text
    });
  }

  publishComment() {

    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {

      var newComment = {
        text: this.state.comment,
        location: this.state.location,
        userId: this.state.userId,
        entryId: this.state.entryId};

      fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
         'x-access-token': token
        },
        body: JSON.stringify(newComment)
      })
      .then( resp => { resp.json()
        .then( comment => {

          this.refs.textBox.setNativeProps({text: ''});
          this.state.comments.push(comment);

          this.setState({
            comment: '',
            comments: this.state.comments
          });

        })
        .catch((error) => {
          console.warn("fetch error: ", error);
        });
      });
    });
  }

  makeDataSource(data) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(data);
  }

  charsLeft(str) {
    return this.state.maxLength - str + ' characters left';
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={
          {marginTop: 0,
            marginLeft: 0,
            borderBottomWidth: 0.5,
            borderColor: '#cccccc',
            paddingBottom: 49}}>
          <TextInput
              ref={'textBox'}
              keyboardType='default'
              keyboardAppearance='light'
              multiline={ true }
              placeholder= 'Comment...'
              onChangeText={ (text) => this.updateComment(text) }
              style={ [this.state.dynamicHeight(), styles.bodyWidth, styles.fadedText] }
              maxLength={ this.state.maxLength }/>
          <View style={ [styles.bodyWidth, styles.footer] }>
            <Text style={ [styles.footerContent, styles.footerText] }>{ this.charsLeft(this.state.comment) }</Text>
            <Text style={ [styles.footerContent, styles.footerArrow]} onPress={ () => { this.publishComment() } }>{ 'Publish' }</Text>
          </View>
        </View>
        <View style={{
            position: 'relative',
            height: Dimensions.get('window').height - 70,
            width: Dimensions.get('window').width * .93,
            marginLeft: Dimensions.get('window').width * .035,
            marginRight:Dimensions.get('window').width * .035}}>
          <CommentList entries={this.makeDataSource(this.state.comments)}/>
        </View>
      </View>
    )
  }
}

