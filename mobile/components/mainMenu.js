import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import { changeScreen, sendPhoto } from '../actions'
import socket from '../socket'

class MainMenu extends Component {
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <TouchableHighlight onPress={() => this.props.changeScreen('register')}>
                  <View>
                    <Text style={{backgroundColor: '#EEEEEE',textAlign: 'center', fontSize: 35, alignItems: 'center', flexDirection : 'row', justifyContent:'center'}}>
                        Welcome
                    </Text>
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
