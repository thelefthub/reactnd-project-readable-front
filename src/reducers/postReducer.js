import {
  LOAD_POST,
  ADD_POST,
  LOAD_SINGLE_POST,
  UPDATE_POST,

} from '../actions'

const initialPostState = []

// the reducer function
// if undefined use initialCalendarState and returns an array of posts
export function posts (state = initialPostState, action) {

  switch (action.type) {
    case LOAD_POST :
      return [
        ...state,
        ...action.posts
      ]
    case ADD_POST :
    return [
      ...state,
      action.post
    ]
    case LOAD_SINGLE_POST :
    return [...state.filter((post) => post.id !== action.post.id),
    action.post
    ]
    case UPDATE_POST :
    return [...state.filter((post) => post.id !== action.post.id),
    action.post
    ]
    default :
      return state
  }

}


