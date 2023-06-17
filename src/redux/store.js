import { applyMiddleware, compose, legacy_createStore as createStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers/reducer'
import thunk from 'redux-thunk'

export default createStore(rootReducer, {}, compose(applyMiddleware(thunk)))
