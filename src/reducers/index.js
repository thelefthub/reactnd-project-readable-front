import { combineReducers } from 'redux'

import {
  categories
} from "./categoryReducer"

import {
  posts
} from "./postReducer"

import {
  comments
} from "./commentReducer"



// combineReducers() is a helper function provided by Redux that turns an object whose values are different reducing functions into a single reducing function.
// We then pass this single "root reducer" into createStore()
export default combineReducers({
  categories,
  posts,
  comments

})
