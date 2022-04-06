import React from 'react'
import { store } from './app/store'
import { Provider } from 'react-redux'
import Root from './comps/Root'

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

export default App