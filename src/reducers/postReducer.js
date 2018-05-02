import {
  LOAD_POST,
  ADD_POST,
  LOAD_SINGLE_POST,
  UPDATE_POST,
  DELETE_POST,
  CAST_POST_VOTE,
  ADD_COMMENT,
  ORDER_POST

} from '../actions'

// import sortBy from 'sort-by'; 

const initialOrderState = { ordering: 'id' }

export function order (state = initialOrderState, action) {
  switch (action.type) {
    case ORDER_POST :
      return {
        ...state,
        ordering: action.value,
      }
    default :
      return state
  }
}

const initialPostState = []

// the reducer function
// if undefined use initialCalendarState and returns an array of posts
export function posts(state = initialPostState, action) {

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
    case DELETE_POST :
    return [...state.filter((post) => post.id !== action.id)
    ]
    case CAST_POST_VOTE :
    return [...state.filter((post) => post.id !== action.post.id),
    action.post
    ]
    case ADD_COMMENT :
    return state.map((post) => {
      if (post.id === action.comment.parentId) {
        post.commentCount ++
        return post
      } else {
        return post
      } 
    })
    default :
      return state
  }

}


// case ORDER_POST :
//     return [...state.sort(sortBy(action.value))]