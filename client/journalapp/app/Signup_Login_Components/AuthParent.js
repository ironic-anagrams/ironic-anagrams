import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  Image
} from 'react-native';

import Tabs from 'react-native-tabs';

import SignupTab from './SignupTab';
import LoginTab from './LoginTab';

import styles from '../styles/AuthParentStyles';

var SplashScreen = require('./SplashScreen')

export default class AuthParent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 'Splash'
    };
  }

  renderTab() {
    if (this.state.page === "Splash") return <SplashScreen/>;
    if (this.state.page === "SignupTab") return <SignupTab updateStatus={this.props.updateStatus} url={this.props.url}/>;
    if (this.state.page === "LoginTab") return <LoginTab updateStatus={this.props.updateStatus} url={this.props.url}/>;

  }

  render() {

    const { page } = this.state;

    return (
        <View style={styles.container}>
          <View style={styles.fixit}>
            <Image source={require('../images/foggytower2.jpg')} style={styles.backgroundImage} />
          </View>
          {this.renderTab()}
          <Tabs
            selected={page}
            style={styles.tabbar}
            selectedStyle={{color:'#e3ddcc'}} onSelect={el=>this.setState({page:el.props.name})}>
              <Text style={styles.tabbartext} name="SignupTab">Sign Up</Text>
              <Text style={styles.tabbartext} name="LoginTab">Login</Text>
          </Tabs>

        </View>
    );
  }

};
