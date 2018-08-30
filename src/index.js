import React, { Component } from 'react'
import { render } from 'react-dom'

import { Provider } from './state-mint'
import { Auth, UI } from './stores'
import { DumbNav as Nav } from './components'




// error messages
// use args or single array arg
// const ConnectedNav = connect([ 'auth', 'ui' ])(SmartNav)


class App extends Component {

  render() {
    return (
      <Provider
        stores={{
          auth: Auth,
          ui: UI,
        }}
      >
        <Nav />
      </Provider>
    )
  }
  
}

render(<App />, document.getElementById('root'));