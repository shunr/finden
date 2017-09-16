import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import { changeScreen } from '../actions'

class MainMenu extends Component {
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <TouchableHighlight onPress={() => this.props.changeScreen('register')}>
                    <Text>
                        Register
                    </Text>
                </TouchableHighlight> 
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeScreen: (newScreen) => {
            dispatch(changeScreen(newScreen))
        }
    }
}

export default connect(null, mapDispatchToProps)(MainMenu)