import { Store } from '../state-mint'

const DEFAULT_STATE = {
  open: false,
}

export default class UI extends Store {

  state = DEFAULT_STATE

  open = () => {
    this.setState({ open: true, })
  }

  close = () => {
    this.setState({ open: false, })
  }

}