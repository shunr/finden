import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableHighlight, Image } from 'react-native'
import firebase from '../firebase'
import { getUser, changeScreen } from '../actions'
import { connect } from 'react-redux'
import appStyles from '../styles'
import Icon from 'react-native-vector-icons/FontAwesome';


const MK = require('react-native-material-kit');
const { MKButton, MKTextField, MKColor } = MK
//const appStyles = require('../styles');

class Login extends Component {
  handleEmail = (text) => {
    this.setState({email : text})
  }
  handlePass = (text) => {
    this.setState({password: text})
  }
  handleUsername = (text) => {
    this.setState({username: text})
  }
  createUser = () => {
    // firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    // });
    //

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
      () => {
        this.props.getUser(this.state.username)
        this.setState({firebaseError : ''})
      },
      error => {
        this.setState({firebaseError : error.message})
      }
    )

    this.props.changeScreen('game')


  }
  goRegister = () => {
    this.props.changeScreen('register')

  }

  render() {
    return (
      <Image
        source={require('../assets/bg.png')}
        style={styles.backgroundImage}>

        <View style = {appStyles.cardMain}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Icon style={appStyles.iconLogo} name="rocket" size={42} color={MKColor.BlueGrey} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <MKTextField
                textInputStyle={'#222'}
                onChangeText={this.handleEmail}
                placeholder="Email address"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <MKTextField
                password={true}
                textInputStyle={'#222'}
                onChangeText={this.handlePass}
                placeholder="Password"
              />
            </View>
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={appStyles.buttonRegister} onPress={this.createUser}>
              <Text style={{color: '#fff'}}>
                Login <Icon name="rocket" size={16} />
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={appStyles.buttonRegister} onPress={this.goRegister}>
              <Text style={{color: '#fff'}}>
                Register Instead <Icon name="rocket" size={10} />
              </Text>
            </TouchableHighlight>
          </View>
          {/* <TouchableHighlight style={appStyles.buttonBack} onPress={() => this.props.changeScreen('mainMenu')}>
          <Icon name="chevron-left" size={30} color='#aaa' />
        </TouchableHighlight> */}
      </View>
    </Image>


  )
}
}

const styles = Object.assign({}, appStyles, StyleSheet.create({
  col: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 7, marginRight: 7,
    padding: 8,
    // color: '#FFF',
  },
  textfield: {
    color: '#FFF',
    height: 28,  // have to do it on iOS
    marginTop: 32,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    alignItems: 'center',
    flexDirection : 'row',
    justifyContent:'center',
    padding: 32
  },
  backgroundCard: {
    flex:1,
  }
}))


const mapDispatchToProps = (dispatch) => {
  return {
    changeScreen: (newScreen) => {
      dispatch(changeScreen(newScreen))
    },
    getUser: (username) => {
      dispatch(getUser(username))
    },
  }
}

export default connect(null, mapDispatchToProps)(Login)
