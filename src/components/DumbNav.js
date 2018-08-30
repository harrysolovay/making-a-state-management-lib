import React from 'react'
import { connect } from '../state-mint'

const DumbNav = ({
  stores: {
    auth: {
      state: {
        loggedIn
      },
      logIn,
      logOut
    }
  }
}) => {
  console.log(loggedIn)
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

export default connect([ 'auth', 'ui' ])(DumbNav)