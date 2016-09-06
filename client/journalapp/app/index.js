import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native';

import Tabs from 'react-native-tabs';

import LoginTab from './LoginTab';
import SignupTab from './SignupTab';
import EntriesTab from './EntriesTab';
import FriendsTab from './FriendsTab';
import SettingsTab from './SettingsTab';

// Refactored require to use import, for consistency
import EntryList from './EntryList';

// var STORAGE_KEY = '';

export default class Journalapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'EntriesTab'
    };
  }

  renderTab() {
    if (this.state.page === "EntriesTab") return <EntriesTab />;
    if (this.state.page === "FriendsTab") return <FriendsTab/>;
    if (this.state.page === "SettingsTab") return <SettingsTab/>;
    if (this.state.page === "SignupTab") return <SignupTab/>;
    if (this.state.page === "LoginTab") return <LoginTab/>;
  }

  render() {
    const { page } = this.state;

      return (

        <View style={styles.container}>
        <Text>{page}</Text>

        {this.renderTab()}

          <Tabs
            selected={page}
            style={styles.tabbar}
            selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
              <Text name="EntriesTab">Entries</Text>
              <Text name="FriendsTab">Friends</Text>
              <Text name="SettingsTab">Settings</Text>
              <Text name="SignupTab">Sign Up</Text>
              <Text name="LoginTab">Log In</Text>
          </Tabs>

        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabbar: {
    backgroundColor:'white',
    height: 64,
    borderTopColor: 'red',
    borderTopWidth: 2
  },
  textinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1

  }
});

