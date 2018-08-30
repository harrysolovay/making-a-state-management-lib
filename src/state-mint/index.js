import React, { Component } from 'react'
import createContext from 'create-react-context'




let storeKeys = []
let entries // source of truth




export const Provider = ({ stores, children }) => {

  let contexts = {}

  // store for use in connect()
  storeKeys = Object.keys(stores)

  storeKeys.forEach((key) => {

    // place Store constructor
    const Constructor = stores[key]

    // create Context
    const context = createContext(null)

    // add context HOCProvider and Consumer
    // contexts: { storeName: { HOCProvider, Consumer } }
    contexts[key] = {
      Provider: (props) => (
        <Constructor
          Provider={ context.Provider }
          { ...props }
        />
      ),
      Consumer: context.Consumer
    }

  })


  // get entries for easier traversal
  entries = Object.entries(contexts)

  // compose into a single higher-order Provider component
  return (
    entries
      .reverse()
      .reduce(
        (accumulator, [key, context]) => (
          <context.Provider
            children={ accumulator }
          />
        ),
        children
      )
  )
}




// resolves to the 'smart' Component constructor
// & called as: connect(storesToInject)(WrapTarget)
export const connect = (storesToInject) => (WrapTarget) => (props) => {

  let nonExistentKeys = []
  storesToInject.forEach((key) => {
    if(! storeKeys.includes(key)) {
      nonExistentKeys.push(key)
    }
  })

  // throw reference error if user is trying to inject non-existent store with connect()
  const MESSAGE_BASE = `Attempting to call State Mint's 'connect' method with uninitialized store key`
  if(nonExistentKeys.length === 1) {
    throw new ReferenceError(`${ MESSAGE_BASE }: '${ nonExistentKeys[0] }'.`)
  } else if(nonExistentKeys.length === 2) {
    throw new ReferenceError(`${ MESSAGE_BASE }s: '${ nonExistentKeys.join(`' and '`) }'.`)
  } else if(nonExistentKeys.length > 2) {
    const last = nonExistentKeys.pop()
    throw new ReferenceError(`${ MESSAGE_BASE }s: '${ nonExistentKeys.join(`', '`) }' and '${ last }'.`)
  }

  
  const Consumer = ({ children }) => (
    entries
      // only compose Consumers specified in "storeKeys" argument
      .filter((entry) => storesToInject.includes(entry[0]))
      // compose into a single higher-order Consumer component
      .reduce(
        (accumulator, [key, context]) => values => (
          <context.Consumer>
            { consumerInstance =>
              accumulator({
                ...values,
                // allows store specificity
                // we don't want to merge stores,
                // we just want them accessible through a single Consumer
                [key]: consumerInstance,
              })
            }
          </context.Consumer>
        ),
        children
    )()
  )

  // return component Intance
  // inject stores as props to make them accessible in life-cycle methods
  return (
    <Consumer>
      {(stores) => (
        <WrapTarget
          { ...{ stores }}
          { ...props }
        />
      )}
    </Consumer>
  )

}




const EXPOSED_PROPS_BLACKLIST = [

  'defaultProps',
  'displayName',

  'props',
  'context',
  'refs',
  'updater',

  'constructor',
  'render',
  'setState',
  'forceUpdate',

  'componentDidMount',
  'componentWillUnmount',

  'componentDidUpdate',
  'shouldComponentUpdate',
  'getDerivedStateFromProps',
  'getSnapshotBeforeUpdate',
  'componentDidCatch',

  '_reactInternalFiber',
  '_reactInternalInstance',
  '__proto__',

  'UNSAFE_componentWillMount',
  'UNSAFE_componentWillReceiveProps',
  'UNSAFE_componentWillUpdate',

]


export class Store extends Component {
  render() {
    return (
      <this.props.Provider
        value={
          Object.assign(
            ...Object.keys(this)
              .filter((el) => {
                return !EXPOSED_PROPS_BLACKLIST.includes(el)
            }).map((key) => ({
              [key]: this[key]
            }))
          )
        }
        { ...this.props }
      />
    )
  }
}