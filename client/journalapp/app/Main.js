
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Alert,
  TextInput,
  ListView,
  View,
  NetInfo,
  Navigator,
  AsyncStorage,
  Dimensions,
  Image,
  TouchableHighlight,
  Linking
} from 'react-native';

import Tabs from 'react-native-tabs';
import EntriesTab from './Entry_Components/EntriesTab';
import FriendsTab from './Friend_Components/FriendsTab';
import SettingsTab from './Settings_Components/SettingsTab';
import FriendScene from './Friend_Components/FriendScene';
import MessageScene from './Entry_Components/MessageScene';
import SearchFriends from './Friend_Components/SearchFriends';
import CommentsScene from './Comment_Components/CommentsScene';
import FeedTab from './Friend_Components/FeedTab';
import GeoCoder from 'react-native-geocoder';
GeoCoder.fallbackToGoogle('AIzaSyDQeWhbhQK8oS2sJwwobh1LIBdcnSfw0Go');
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Communications from 'react-native-communications';
import styles from './styles/MainStyles';
import NetworkInfo from 'react-native-network-info';
import helpers from './helper.js';
import Swiper from 'react-native-swiper'
helper = new helpers();

NetworkInfo.getSSID(ssid =>{
  console.log(ssid);
});

var _ = require('underscore');

// Linking.openURL('sms://open?addresses=6503846438,4083962431');
// Communications.text('6503846438, 4083962431', 'test');
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      page: 'EntriesTab',
      entries: ds.cloneWithRows([]),
      allEntries: [],
      newEntry: '',
      friendName: '',
      location: '',
      slideView: ['EntriesTab', 'FeedTab', 'FriendsTab', 'SettingsTab'],
      load: false
    };
  }

  // This is used inside MessageScene, where the user's input updates the Main component's newEntry state.
  // The update occurs here, instead of in MessageScene, so that the "Publish" text's onpress method in
  // Main can access the new entry and post it to the server.
  updateEntry(text){
    this.setState({
      newEntry: text
    });
  }

  // The friend's name is stored here so that it can be used as a title in the nav bar in Main. The assignment
  // of the name occurs in Friend.js.
  updateFriend(name){
    this.setState({
      friendName: name
    });
  }

  processDelete(msgId) {

    var curState = this.state.entries.slice();

    var result = curState.filter(function(entry) {
      return entry.id !== msgId;
    });

    this.setState({
      allEntries: result
    })
  }

  // Use this to keep track of the user's last location.
  watchID: ?number = null;

  // All logic here is grabbed from the testGeo.js file; integrates user's location
  // into the app.
  // NOTE: React Native unfortunately uses navigator as a variable in their geolocation. This does not refer to
  // the Navigator component, nor an instance of it.
  componentDidMount() {
    NetInfo.addEventListener('change', helper.netListener);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var latLng = {lat: position.coords.longitude, lng: position.coords.latitude};
        // The GeoCoder needs Xcode configuration to work. For now, use dummy data.
        // to establish connection with server.
        // GeoCoder.geocodePosition(latLng)
        //   .then( (res) => {
        //     this.setState({location: res.locality + ', ' + res.adminArea});
        //   })
        //   .catch( err => {
        //     console.dir(err) 
            this.setState({location: latLng['lat'] + ', ' +  latLng['lng']});
        //   });

        // this.setState({location: 'San Franpsycho, CA'});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true}
    );
  }

  // These lines clear the location that's being watched when the component unmounts.
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    NetInfo.removeEventListener('change', helper.netListener);
  }

  // This method is passed down to EntriesTab.js, where it is used to get the list of all entries for
  // either the signed in user, when he/she is at his/her profile, or all the entries for a selected friend,
  // if the user has navigated over to that friend's profile. Note that it will be called on the entry tab's
  // mount and also after the user makes a new entry (so it'll autorefresh the entry list).
  getEntries(tabs){
    //tabs is an array of strings like ['#hash', '#test']
    tabs = JSON.stringify(tabs) || '[]';
    AsyncStorage.multiGet(['@MySuperStore:token', '@MySuperStore:url'], (err, store) => {
      //AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      var token = store[0][1];
      var url = store[1][1];
      console.log(token);
      fetch(`${ url }api/entries?tags=${tabs}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        query: JSON.stringify(tabs)
      })
      .then( resp => { resp.json()
        .then( json => {
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            entries: ds.cloneWithRows(json), //cloneWithRows updates data in DataSource
            allEntries: json
          });
        })
        .catch((error) => {
          console.warn("fetch error on get request:", error);
        });
      });
    });
  }

  // Enter a new entry for the user. This method is here rather than in EntryTab.js so that the user may use the
  // publish onPress method.
  postEntry(navigator){
    var text = this.state.newEntry;
    var data = helper.parseText(text);
    data.ats.forEach(function(at, index, ats) {
      var phoneNum = helper.parsePhoneNumber(at);
      if (phoneNum) {
        helper.phoneAlert(phoneNum);
        // Communications.text(phoneNum[1] + phoneNum[3] + phoneNum[4], data.inputs[0].toString().slice(1));
      } else {
        var email = helper.parseEmail(at);
        if(email) {
          Communications.email(ats, null, null, null, data.inputs[0].toString().slice(1));
        } else {
          var web = helper.parseWeb(at);
          if (web) {
            Communications.web(web[0]);
          } else {
            var specialAt = helper.parseSpecial(at);
            if (specialAt) {
              specialAt();
            }
          }
        }
      }
    });
    AsyncStorage.multiGet(['@MySuperStore:token', '@MySuperStore:url'], (err, store) => {
      var token = store[0][1];
      var url = store[1][1];
      var newEntry = { text: this.state.newEntry, location: this.state.location, tags: data.tags};
      fetch(`${ url }api/entries`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
         'x-access-token': token
        },
        body: JSON.stringify(newEntry)
      })
        .then((response) => {
          console.log(response);
          this.getEntries();
          navigator.pop();
        })
          .catch((error) => {
            console.warn("fetch error:", error);
          });
    });
  }

  //TODO: CBELLE
  deleteEntries(username, secret, msgId) {
    var userEntries = this.state.entries.getRowData(0,0);
    console.log('delete entries invoked');
    var toBeDeleted = {
      userId: userEntries.userId
    }

    AsyncStorage.multiGet(['@MySuperStore:token', '@MySuperStore:url'], (err, store) => {
      var token = store[0][1];
      var url = store[1][1];
      var queryUrl = '';

      if (msgId) {
        queryUrl = '?messageId=' + msgId;
      } 
      
      if (secret && secret.toUpperCase() === 'RESET') {

          //set load to true
          this.setState({load: true});
          fetch(`${ url }api/entries${ queryUrl }`, {
            method: 'DELETE',
            headers: {
             'Content-Type': 'application/json',
             'x-access-token': token
            },
            body: JSON.stringify(toBeDeleted)
          })
            .then((response) => {
              //load to false
              const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

              this.processDelete(msgId);

              this.setState({load: false, entries: this.state.allEntries});
              console.log('Delete all entries of user ' + username);

              response.json();
            })
            .catch((error) => {
              // load to false
              this.setState({load: false});
              console.warn("fetch error:", error);   
          });
      }
    });
  }


  filterTags(str) {

    var tags = str.toLowerCase().split(' ');

    var filteredTags = tags.filter(function(tag) {
      return tag !== '';
    }).map(function(tag) {
      return '#' + tag;
    });
    
    console.log('Fetching new posts based on tag filtering');
    this.getEntries(filteredTags);
    
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  //THIS IS NOT USED ANYMORE, SEE SWIPER FOR HOW MAIN SCENE NAVIGATION WORKS
  //
  // According to the state's current page, return a certain tab view. Tab views are all stateful, and will
  // potentially contain logic to interact with the server, or navigate to scenes using the Navigator. This
  // is essentially the tab's router.

  // renderTab(navigator) {
  //   if (this.state.page === "EntriesTab") return <EntriesTab
  //                                                   navigator={navigator}
  //                                                   getEntries={ this.getEntries.bind(this) }
  //                                                   entries={ this.state.entries }/>;
  //   if (this.state.page === "FriendsTab") return <FriendsTab
  //                                                   navigator={navigator}
  //                                                   updateFriend={ this.updateFriend.bind(this) }/>;
  //   if (this.state.page === "SettingsTab") return <SettingsTab
  //                                                   signOut={ this.props.signOut } deleteEntries={this.deleteEntries.bind(this)}/>;
  //   if (this.state.page === "FeedTab") return ( <Swiper style={styles.wrapper} showsButtons={true}>
  //                                                 <View style={styles.slide1}>
  //                                                   <Text style={styles.text}>Hello Swiper</Text>
  //                                                 </View>
  //                                                 <View style={styles.slide2}>
  //                                                   <FeedTab
  //                                                   navigator={ navigator }
  //                                                   filterTags= {this.filterTags.bind(this) }/>
  //                                                 </View>
  //                                                 <View style={styles.slide3}>
  //                                                   <Text style={styles.text}>And simple</Text>
  //                                                 </View>
  //                                               </Swiper>);

  // }

  // This logic applies routing according the title of the current route. It will be activated whenever the
  // Navigator is altered (via push, pop, etc), will check to see the title of the current route (note that
  // a Navigator is a stack of scenes, so the current route will be the last route in the stack), and will then
  // return the appropriate Component(s).

  //KEEPING THIS STUFF JUST IN CASE, FOR NOW

  //this was right below the inital View
  //{this.renderTab(navigator)}
          /*<Tabs
            selected={page}
            style={styles.tabbar}
            selectedStyle={{ opacity: 1 }} onSelect={el=>this.setState({page:el.props.name})}>

            <View
              name="EntriesTab"
              style={styles.tabbarView}>
              <Image
                style={styles.tabbarimage}
                source={require('./images/Home_Active.png')}/>
              <Text
                style={styles.tabbartext}>
                Entries</Text>
            </View>

            <View name="FeedTab" style={styles.tabbarView}>
              <Image style={styles.tabbarimage} source={require('./images/ic_list_3x.png')}/>
              <Text style={styles.tabbartext}>Feed</Text>
            </View>

            <View
              name="FriendsTab"
              style={styles.tabbarView}>
              <Image style={styles.tabbarimage} source={require('./images/Friends_Active.png')}/>
              <Text style={styles.tabbartext}>Friends</Text>
            </View>

            <View name="SettingsTab" style={styles.tabbarView}>
              <Image style={styles.tabbarimage} source={require('./images/Settings_Active.png')}/>
              <Text style={styles.tabbartext}>Settings</Text>
            </View>

          </Tabs>*/
  navigatorRenderScene(route, navigator) {
    const { page } = this.state;
    if (route.title === 'Main') {
      return (
        <View style={styles.container}>

          <Swiper style={styles.wrapper} 
                  showsButtons={true}
                  loop={false}
                  onMomentumScrollEnd={(e, state, context)=> {this.setState({page: this.state.slideView[state.index]});}}>
           <View style={styles.slide1}>
             <EntriesTab
               navigator={navigator}
               getEntries={ this.getEntries.bind(this) }
               entries={ this.state.entries }
               deleteEntries={ this.deleteEntries.bind(this) }
               filterTags= { _.debounce(this.filterTags.bind(this), 500) }/>
           </View>
           <View style={styles.slide2}>
             <FeedTab
             navigator={ navigator }
             filterTags= { _.debounce(this.filterTags.bind(this), 500) }/>
           </View>
           <View style={styles.slide3}>
            <FriendsTab
             navigator={navigator}
             updateFriend={ this.updateFriend.bind(this) }/>
           </View>
           <View style={styles.slide4}>
             <SettingsTab
                signOut={ this.props.signOut } deleteEntries={this.deleteEntries.bind(this)}/>
           </View>
         </Swiper>
        </View>
      )
    } else if (route.title === 'FriendPage') {
      return (
        <FriendScene
          friendId={ route.friendId }
          navigator={navigator} />
      )
    } else if (route.title === 'MessageScene') {
      return (
        <MessageScene
          navigator={navigator}
          getEntries={ this.getEntries.bind(this) }
          updateEntry = { this.updateEntry.bind(this) }
          location={ this.state.location }/>
      )
    } else if (route.title === 'SearchFriends') {
      return (
        <SearchFriends
          navigator={ navigator } />
      )
    } else if (route.title === 'CommentsScene') {
      console.log('Route to Comments Scene');
      return (
        <CommentsScene entryId={route.entryId} userId={route.userId} location={this.state.location}/>
      )
    }
  }

  // Note that all the Components are enclosed in the navigator. It sets the initial route to Main,
  // which is then picked up in the navigatorRenderScene routing above, which then renders the view
  // of the main page (including the appropriate tab view, according to the renderTab rendering of
  // the current tab view);
  render() {
    return (
      <Navigator
        initialRoute={ { title: 'Main' } }
        renderScene={ this.navigatorRenderScene.bind(this) }

        // The navigation bar is the final source of view routing. It only controls the view in the upper
        // nav bar, though note that onPress methods here may interact with the Main state, leading to navigation
        // or server interactions.
        navigationBar = {
          <Navigator.NavigationBar
            routeMapper={{

              LeftButton(route, navigator, index, navState) {
                if ( route.title === 'FriendPage' || route.title === 'SearchFriends' ){
                  return (
                    <View style={ styles.topBarView }>
                      <Text onPress={ ()=>{ navigator.pop() }} >
                        <Icon style= { styles.arrow } name="chevron-left"/>
                      </Text>
                    </View>
                  )
                } else if ( route.title === 'MessageScene' ){
                  return (
                    <View style={ styles.topBarView }>
                      <Text onPress={ ()=>{ navigator.pop() }} >
                        <Icon style= { styles.arrow } name="close"/>
                      </Text>
                    </View>
                  )
                } else if ( route.title === 'CommentsScene' ){
                  return (
                    <View style={ styles.topBarView }>
                      <Text onPress={ ()=>{ navigator.pop() }} >
                        <Icon style= { styles.arrow } name="close"/>
                      </Text>
                    </View>
                  )
                }
              },

              RightButton: (route, navigator, index, navState) => {
                if ( this.state.page === 'FriendsTab' && route.title !== 'SearchFriends' && route.title !== 'FriendPage'){
                  return (
                    <View style={ [styles.topBarView, styles.rightArrow] }>
                      <Text onPress={()=>{ navigator.push({title: 'SearchFriends'}) }} >
                        <AwesomeIcon size={24} style={styles.image} color="#fdf6e3" name={'plus-square'}/>
                      </Text>
                    </View>
                  )
                }
                if ( route.title === 'MessageScene' ) {
                  return (
                    <View style={ [styles.topBarView, styles.rightArrow] }>
                      <Text style={ [styles.faintText, styles.largerText] } onPress={(() => { this.postEntry(navigator); }).bind(this) } >
                        Publish
                      </Text>
                    </View>
                  );
                }
              },

              Title: (route, navigator, index, navState) =>{
                // Title views for the entries routes.
                if ( route.title === 'MessageScene') {
                  return (<Text style = { [styles.faintText, styles.titleCounter] }>{ 100 - this.state.newEntry.length }</Text>)
                } else if (route.title === 'CommentsScene') {
                  return (<Text style={ styles.title }>{ 'comments' }</Text>);
                } else if ( this.state.page === 'EntriesTab' ) {
                  return (<Text style={ styles.title }><AwesomeIcon color={'#fdf6e3'} name='rocket' size={24} style={styles.rocket}/>{ '  caster' }</Text>);
                }

                //Title views for the friends routes.
                if ( route.title === 'SearchFriends') {
                  return (<Text style={ styles.title }>{ 'add friends' }</Text>);
                } else if ( route.title === 'FriendPage' ) {
                  return (<Text style={ styles.title }>{ this.state.friendName } </Text>);
                } else if ( this.state.page === 'FriendsTab' ) {
                  return (<Text style={ styles.title }>{ 'friends' }</Text>);
                }

                // Title views for the settings route.
                if (this.state.page === 'SettingsTab') {
                  return (<Text style={ styles.title }>{ 'settings' }</Text>);
                }
                if (this.state.page === 'FeedTab') {
                  return (<Text style={ styles.title }>{ 'your friend feed' }</Text>);
                }

                else {
                  return (<Text style={ styles.title }>{ 'ERROR: We haven\'t covered this route yet.' }</Text>);
                }
              }
            }
          }
          style={ styles.topBar } />
        } />
    )
  }
}
