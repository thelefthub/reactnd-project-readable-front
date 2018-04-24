import {
  LOAD_POST,

} from '../actions'

const initialPostState = []

// the reducer function
// if undefined use initialCalendarState and returns an array of categories
export function posts (state = initialPostState, action) {

  switch (action.type) {
    case LOAD_POST :
      return [
        ...state,
        ...action.posts
      ]
    default :
      return state
  }

}
