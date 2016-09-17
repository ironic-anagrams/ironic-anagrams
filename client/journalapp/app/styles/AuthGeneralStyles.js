import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions
} from 'react-native';

//This provides the styling for the login/sign up tabs and the splashscreen
const styles = StyleSheet.create({
  viewContainer: {
    width: Dimensions.get('window').width*.7,
    paddingTop: 6,
    paddingBottom:6,
    marginTop:100,
    marginBottom: 52,
    flex: 1,
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  fieldContainer:{
    marginBottom:16
  },
  subHeader: {
    fontSize: 12,
    fontWeight: '700',
    color:"#fdf6e3",
    marginLeft:12,
    marginBottom:4.5,
    backgroundColor:'transparent'
  },
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    flexDirection: 'column',
    paddingLeft:6,
    marginLeft:12,
    marginRight:12,
    borderWidth:1,
    height:32,
    borderColor: '#cccccc',
    justifyContent:'space-between',
    fontSize: 14,
    fontWeight: '400',
    borderRadius:3
  },
  button:{
    height:40,
    backgroundColor:"#48b9c7",
    marginLeft:12,
    marginRight:12,
    marginTop:12,
    paddingTop:8.5,
    color:'white',
    fontSize: 16,
    fontWeight: '400',
    borderRadius:3,
    opacity:1,
  },
  disabledbutton:{
    height:40,
    backgroundColor:"#58b9c7",
    marginLeft:12,
    marginRight:12,
    marginTop:12,
    paddingTop:8.5,
    color:'white',
    fontSize: 16,
    fontWeight: '400',
    borderRadius:3,
    opacity:0.5,
  },
  splashContainer:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  img:{
    height:250,
    width:250,
    marginTop:48,
    alignSelf:'center'
  },
  title: {
    marginTop: 18,
    height: 32,
    fontSize: 21,
    fontWeight: '300',
    alignSelf:'center',
    fontFamily: 'menlo',
    backgroundColor: 'transparent',
    color: '#fdf6e3'
  },
  subtitle: {
    height: 150,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    alignSelf:'center',
    textAlign: 'center',
    marginTop:6,
    paddingLeft:3,
    paddingRight:3,
    fontFamily: 'menlo',
    backgroundColor: 'transparent',
    color: '#fdf6e3'   
  }
});

module.exports = styles;