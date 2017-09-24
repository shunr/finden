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
  login = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
      () => {
        this.props.getUser()
        this.setState({firebaseError : ''})
      },
      error => {
        this.setState({firebaseError : error.message})
      })
  }
  goRegister = () => {
    this.props.changeScreen('register')
  }

  render() {
    return (
      <Image
        source={require('../assets/bg.png')}
        style={appStyles.backgroundImage}>

        <View style = {appStyles.cardMain}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Icon style={appStyles.iconLogo} name="moon-o" size={56} color='#7d64ff' />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <MKTextField
                textInputStyle={{color:'#222'}}
                onChangeText={this.handleEmail}
                placeholder="Email address"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <MKTextField
                password={true}
                textInputStyle={{color: '#222'}}
                onChangeText={this.handlePass}
                placeholder="Password"
              />
            </View>
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={appStyles.buttonPrimary} onPress={this.login}>
              <Text style={{color: '#fff'}}>
                Login <Icon name="rocket" size={16} />
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={appStyles.buttonInferior} onPress={this.goRegister}>
              <Text style={{color: '#fff'}}>
                Make an account
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
  backgroundCard: {
    flex:1,
  }
}))


const mapDispatchToProps = (dispatch) => {
  return {
    changeScreen: (newScreen) => {
      dispatch(changeScreen(newScreen))
    },
    getUser: () => {
      dispatch(getUser())
    },
  }
}

export default connect(null, mapDispatchToProps)(Login)
