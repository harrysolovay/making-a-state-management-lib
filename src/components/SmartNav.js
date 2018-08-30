import React, { Component } from 'react'
import { connect } from '../state-mint'

class SmartNav extends Component {

  render() {

    const {
      auth: {
        state: {
          loggedIn
        },
        logIn,
        logOut
      }
    } = this.props.stores

    return loggedIn
      ? <button
          children='log out'
          onClick={ logOut }
        />
      : <button
          children='log in'
          onClick={ logIn }
        />
  }

  componentDidMount() {
    console.log(this.props.stores)
  }

}

export default connect([ 'auth', 'ui' ])(SmartNav)