import React, { Component } from 'react'
import { View, TouchableHighlight, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { changeScreen, getUsername, sendImageBase64, getCurrentTargets, resetFound, getScore } from '../actions'
import Camera from 'react-native-camera'
import appStyles from '../styles'
import Icon from 'react-native-vector-icons/FontAwesome';

class List extends Component {
    componentDidMount() {
        console.log("YES")

    }
    render() {
        if (this.props.loading) {
            return (
                <Image
                source={require('../assets/bg.png')}
                style={appStyles.backgroundImage}>
                    <Text style={appStyles.alert}> Processing... </Text>
                </Image>
            )
        } else if (this.props.foundItem != -1 && this.props.foundItem != -2) {
            var textBody = 'You found a';
            if(isVowelFirst(this.props.foundItem)){
                textBody += 'n ';
            }else{
                textBody += ' ';
            }
            return (
                <Image
                source={require('../assets/bg.png')}
                style={appStyles.backgroundImage}>
                    <View>
                        <Text style={appStyles.responseText}> {textBody + this.props.foundItem}! </Text>
                    </View>
                    <TouchableHighlight style={appStyles.buttonPrimary} onPress={() => {
                        this.props.resetFound()
                        this.props.getCurrentTargets(this.props.user.uid)
                        this.props.getScore(this.props.user.uid)
                    }
                    }>
                        <Icon name="arrow-left" size={24} color='#fff' />
                    </TouchableHighlight>
                </Image>
            )
        } else if (this.props.foundItem == -1) {
            return (
                <Image
                source={require('../assets/bg.png')}
                style={appStyles.backgroundImage}>
                    <View>
                        <Text style={appStyles.responseText}> Sorry, that is not the item you are looking for. </Text>
                    </View>
                    <View>
                        <TouchableHighlight style={appStyles.buttonPrimary} onPress={() => {
                            this.props.resetFound()
                            this.props.getCurrentTargets(this.props.user.uid)
                            this.props.getScore(this.props.user.uid)
                        }}>
                            <Icon name="arrow-left" size={24} color='#fff' />
                        </TouchableHighlight>
                    </View>
                </Image>
            )
        } else {
            return (
                <Image
                    source={require('../assets/bg.png')}
                    style={appStyles.backgroundImage}>

                    <View style={appStyles.cardMain}>
                        <Text style={appStyles.mainTitle} size={24}>
                            Current Targets
                        </Text>
                        <View
                            style={{
                                width: '100%',
                                margin: 16,
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                            }}
                        />
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 20}}> SCORE: {this.props.score} </Text>
                            <Text style={appStyles.listItem}>{this.props.hasOwnProperty('targets') && this.props.targets.length > 0 && this.props.targets[0]}
                                {/*<Icon name="minus-circle" size={16} color='#ee4411' onPress={() => {socket.emit('replace', this.props.targets[0]); this.props.getCurrentTargets()}} />*/}
                            </Text>
                            <Text style={appStyles.listItem}>{this.props.hasOwnProperty('targets') && this.props.targets.length > 0 && this.props.targets[1]}</Text>
                            <Text style={appStyles.listItem}>{this.props.hasOwnProperty('targets') && this.props.targets.length > 0 && this.props.targets[2]}</Text>
                            <Text style={appStyles.listItem}>{this.props.hasOwnProperty('targets') && this.props.targets.length > 0 && this.props.targets[3]}</Text>
                            <Text style={appStyles.listItem}>{this.props.hasOwnProperty('targets') && this.props.targets.length > 0 && this.props.targets[4]}</Text>
                        </View>
                        <TouchableHighlight style={appStyles.buttonCamera} onPress={() => this.props.changeScreen('game')}>
                            <Icon name="camera" size={24} color='#ffffff' />
                        </TouchableHighlight>
                    </View>
                </Image>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        targets: state.targets,
        foundItem: state.foundItem,
        score: state.score,
        loading: state.loading
    }
}

function isVowelFirst(object) {
    return /[aeiou]/.test(object[0]);
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeScreen: (newScreen) => {
            dispatch(changeScreen(newScreen))
        },
        getUsername: (uid) => {
            dispatch(getUsername(uid))
        },
        resetFound: () => {
            dispatch(resetFound())
        },
        getCurrentTargets: (uid) => {
            dispatch(getCurrentTargets(uid))
        },
        getScore: (uid) => {
            dispatch(getScore(uid))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
