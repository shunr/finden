import React, { Component } from 'react'
import { View, TouchableHighlight, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { changeScreen, sendPhoto } from '../actions'
import socket from '../socket'
import appStyles from '../styles'


class MainMenu extends Component {
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <TouchableHighlight onPress={() => this.props.changeScreen('register')}>
          <View style = {{width:'100%', height: '100%', flexDirection : 'column'}}>
            <Image
              source={require('../assets/bg.png')}
              style={appStyles.backgroundImage}>
              <Text style = {{fontSize: 35, textAlign: 'center', flexDirection : 'column'}}>
                finden
              </Text>
              <View style={appStyles.cardMain}>
                <View style = {appStyles.col}>

                  <Text style = {{fontSize: 15, textAlign: 'center'}}>
                    welcome
                  </Text>
                </View>
              </View>
            </Image>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeScreen: (newScreen) => {
      dispatch(changeScreen(newScreen))
    },
    sendPhoto: () => {
      dispatch(sendPhoto())
    }
  }
}

export default connect(null, mapDispatchToProps)(MainMenu)
