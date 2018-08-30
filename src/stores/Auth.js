import { Store } from '../state-mint'


const DEFAULT_STATE = {
  loading: true,
  loggedIn: false,
}


export default class Auth extends Store {

  state = DEFAULT_STATE

  setLoading = (loading) => {
    this.setState({ loading })
  }

  logIn = () => {
    this.setState({ loggedIn: true, })
  }

  logOut = () => {
    this.setState(DEFAULT_STATE)
  }

}