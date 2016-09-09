import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  Navigator,
  AsyncStorage,
  Dimensions,
  Image,
  TouchableHighlight
} from 'react-native';

import Tabs from 'react-native-tabs';
import EntriesTab from './EntriesTab';
import FriendsTab from './FriendsTab';
import SettingsTab from './SettingsTab';
import FriendScene from './FriendScene';
import MessageScene from './MessageScene';
import SearchFriends from './SearchFriends';

import Icon from 'react-native-vector-icons/MaterialIcons'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6f6'
  },
  textinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  faintText: {
    color: 'rgba(100,100,100,.6)'
  },
  topBar: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(175,175,175,.6)',
  },
  topBarView: {
    marginTop: 3,
    borderBottomColor: 'rgba(100,100,100,.6)',
  },
  tabbar: {
    backgroundColor:'white',
    height: 49,
    borderTopColor: 'gray',
    borderTopWidth: 0.5
  },
  tabbarView: {
    opacity: 0.4
  },
  tabbarimage: {
    height: 30,
    width:37.5,
    marginTop:6.5,
    alignSelf:'center'
  },
  tabbartext: {
   fontSize:10,
   fontWeight:'700',
   marginBottom:6.5,
   color:"#424242"
  },
  arrow: {
    alignSelf:'flex-end',
    flexDirection: 'column',
    fontSize:30,
    color:"#c7c7cc",
    padding: 6
  },
  image: {
    height: 30,
    width: 30,
    alignSelf:'flex-end',
    flexDirection: 'column',
    color:"#c7c7cc",
  },
  title: {
    marginTop: 7,
    height: 53,
    fontSize: 20,
  },
  rightArrow: {
    marginTop: 10,
    marginRight: 10,
    height: 53,
    fontSize: 14,
  }
});

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      page: 'EntriesTab',
      entries: ds.cloneWithRows([]),
      newEntry: '',
      friendName: ''
    };
  }

  getEntries(){
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch('http://localhost:3000/api/entries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then( resp => { resp.json()
        .then( json => {
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            entries: ds.cloneWithRows(json)
          })
        })
        .catch((error) => {
          console.warn("fetch error on getrequest:", error)
        });
      });
    });
  }

  updateEntry(text){
    this.setState({
      newEntry: text
    });
  }

  updateFriend(name){
    this.setState({
      friendName: name
    })
  }

  postEntry(navigator){
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      var message = {text: this.state.newEntry};

      fetch('http://localhost:3000/api/entries', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
         'x-access-token': token
        },
        body: JSON.stringify(message)
      })
        .then((response) => {
          this.getEntries();
          navigator.pop();
        })
          .catch((error) => {
            console.warn("fetch error:", error)
          });
    });
  }

  renderTab(navigator) {
    if (this.state.page === "EntriesTab") return <EntriesTab navigator={navigator} getEntries={ this.getEntries.bind(this) } entries={ this.state.entries }/>;
    if (this.state.page === "FriendsTab") return <FriendsTab navigator={navigator} updateFriend={ this.updateFriend.bind(this) }/>;
    if (this.state.page === "SettingsTab") return <SettingsTab signOut={ this.props.signOut }/>;
  }

  navigatorRenderScene(route, navigator) {
    const { page } = this.state;
    if (route.title === 'Main') {
      return (
        <View style={styles.container}>

          {this.renderTab(navigator)}

          <Tabs
            selected={page}
            style={styles.tabbar}
            selectedStyle={{ opacity: 1 }} onSelect={el=>this.setState({page:el.props.name})}>

            <View name="EntriesTab" style={styles.tabbarView}>
              <Image style={styles.tabbarimage} source={require('./images/Home_Active.png')}/>
              <Text style={styles.tabbartext}> Entries</Text>
            </View>

            <View name="FriendsTab" style={styles.tabbarView}>
              <Image style={styles.tabbarimage} source={require('./images/Friends_Active.png')}/>
              <Text style={styles.tabbartext}>Friends</Text>
            </View>

            <View name="SettingsTab" style={styles.tabbarView}>
              <Image style={styles.tabbarimage} source={require('./images/Settings_Active.png')}/>
              <Text style={styles.tabbartext}>Settings</Text>
            </View>

          </Tabs>
        </View>
      )
    } else if (route.title === 'FriendPage') {
      return (
        <FriendScene friendId={ route.friendId } navigator={navigator} />
      )
    } else if (route.title === 'MessageScene') {
      return (
        <MessageScene navigator={navigator} getEntries={ this.getEntries.bind(this) } updateEntry = { this.updateEntry.bind(this) }/>
      )
    } else if (route.title === 'SearchFriends') {
      return (
        <SearchFriends navigator={ navigator } />
      )
    }
  }

  render() {

    return (
      <Navigator
        initialRoute={ { title: 'Main' } }
        renderScene={ this.navigatorRenderScene.bind(this) }
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
                }
              },

              RightButton: (route, navigator, index, navState) => {
                if ( this.state.page === 'FriendsTab' && route.title !== 'SearchFriends' && route.title !== 'FriendPage'){
                  return (
                    <View style={ [styles.topBarView, styles.rightArrow] }>
                      <Text onPress={()=>{ navigator.push({title: 'SearchFriends'}) }} >
                        <Image style={styles.image} source={require('./images/Add_Friend.png')}/>
                      </Text>
                    </View>
                  )
                }
                if ( route.title === 'MessageScene' ) {
                  return (
                    <View style={ [styles.topBarView, styles.rightArrow] }>
                      <Text style={ styles.faintText } onPress={(() => { this.postEntry(navigator); }).bind(this) } >
                        Publish
                      </Text>
                    </View>
                  );
                }
              },

              Title: (route, navigator, index, navState) =>{
                // Title views for the entries routes.
                if ( route.title === 'MessageScene') {
                  return (<Text style = { [styles.faintText, styles.title] }>{ 100 - this.state.newEntry.length }</Text>)
                } else if ( this.state.page === 'EntriesTab' ) {
                  return (<Text style={ styles.title }>{ 'My Story' }</Text>);
                }

                // Title views for the friends routes.
                if ( route.title === 'SearchFriends') {
                  return (<Text style={ styles.title }>{ 'Add Friends' }</Text>);
                } else if ( route.title === 'FriendPage' ) {
                  return (<Text style={ styles.title }>{ this.state.friendName } </Text>);
                } else if ( this.state.page === 'FriendsTab' ) {
                  return (<Text style={ styles.title }>{ 'Friends' }</Text>);
                }

                // Title views for the settings route.
                if (this.state.page === 'SettingsTab') {
                  return (<Text style={ styles.title }>{ 'Settings' }</Text>);
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



