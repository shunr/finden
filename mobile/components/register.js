import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import firebase from '../firebase'
import { getUser, changeScreen } from '../actions'
import { connect } from 'react-redux'

const MK = require('react-native-material-kit');
const { MKButton, MKTextField, MKColor } = MK
const appStyles = require('../styles');

class LoginScreen extends Component {
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
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(
            () => {
                this.props.getUser(this.state.username)
                this.setState({firebaseError : ''})
            },
            error => {
                this.setState({firebaseError : error.message})
            }
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <MKTextField
                            tintColor={MKColor.Lime}
                            textInputStyle={{color: MKColor.Orange}}
                            onChangeText={this.handleUsername}
                            placeholder="Username"
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <MKTextField
                            tintColor={MKColor.Lime}
                            textInputStyle={{color: MKColor.Orange}}
                            onChangeText={this.handleEmail}
                            placeholder="Email address"
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <MKTextField
                            tintColor={MKColor.Lime}
                            textInputStyle={{color: MKColor.Orange}}
                            onChangeText={this.handlePass}
                            placeholder="Password"
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <TouchableHighlight onPress={this.createUser}>
                        <Text>
                            Register
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.row}>
                    <TouchableHighlight onPress={() => this.props.changeScreen('mainMenu')}>
                        <Text>
                            Back
                        </Text>
                    </TouchableHighlight>  
                </View>
            </View>
        )
    }
}

const styles = Object.assign({}, appStyles, StyleSheet.create({
    col: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 7, marginRight: 7,
    },
    textfield: {
        height: 28,  // have to do it on iOS
        marginTop: 32,
    },
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

export default connect(null, mapDispatchToProps)(LoginScreen)