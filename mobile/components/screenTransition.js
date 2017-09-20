import React, { Component } from 'react'
import MainMenu from './mainMenu'
import Register from './register'
import Game from './game'
import Leaderboard from './leaderboard';
import List from './list'
import Login from './login';

import { connect } from 'react-redux'

class ScreenTransition extends Component {
    render() {
        const { screen } = this.props
        //Displays the correct screen for the app's state
        switch (screen) {
            case 'mainMenu':
                return <MainMenu />
            case 'register':
                return <Register />
            case 'game':
                return <Game />
            case 'login':
                return <Login />
            case 'list':
                return <List />
            // case 'leaderboard':
            //   return <Leaderboard />
        }
    }
}

function mapStateToProps(state) {
    return {screen: state.screen}
}

export default connect(mapStateToProps)(ScreenTransition)
