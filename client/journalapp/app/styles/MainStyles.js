import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf6e3',
  },
  textinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 22
  },
  faintText: {
    color: '#fdf6e3'
  },
  largerText: {
    marginTop: -2,
    fontSize: 19
  },
  topBar: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#48b9c7',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
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
    opacity: 0.45,
    paddingTop:6
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
   marginBottom:12,
   color:"#333333"
  },
  arrow: {
    alignSelf:'flex-end',
    flexDirection: 'column',
    fontSize:30,
    color: '#fdf6e3',
    marginLeft: 12
  },
  image: {
    height: 30,
    width: 30,
    alignSelf:'flex-end',
    flexDirection: 'column'
  },
  title: {
    marginTop: 5,
    height: 53,
    fontSize: 17,
    fontWeight: '300',
    color: '#fdf6e3',
    fontFamily: 'menlo'
  },
  titleCounter: {
    marginTop: 9,
    fontSize: 17,
    fontWeight: '400'
  },
  rightArrow: {
    marginTop: 10,
    marginRight: 10,
    height: 53,
    //fontSize: 14,
  },
  //Swiper
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#92BBD9',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

module.exports = styles;