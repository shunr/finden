import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import { changeScreen } from '../actions'

class Game extends Component {
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <Text>
                    SUP {this.props.user.email}
                </Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeScreen: (newScreen) => {
            dispatch(changeScreen(newScreen))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)