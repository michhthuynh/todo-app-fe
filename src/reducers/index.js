import { combineReducers } from 'redux'
import collectionReducer from './collection'
import userReducer from './user'

const rootReducer = combineReducers({
  user: userReducer,
  collection: collectionReducer,
})

export default rootReducer