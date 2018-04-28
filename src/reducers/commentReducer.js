import {
    LOAD_COMMENT,
    ADD_COMMENT,
    LOAD_SINGLE_COMMENT,
    UPDATE_COMMENT,
  
  } from '../actions'
  
  const initialCommentState = []
  
  // the reducer function
  // if undefined use initialCalendarState and returns an array of comments
  export function comments (state = initialCommentState, action) {
  
    switch (action.type) {
      case LOAD_COMMENT :
        return [
            ...state.filter((comment) => comment.parentId !== action.parentId),
            ...action.comments
        ]
      case ADD_COMMENT :
      return [
        ...state,
        action.comment
      ]
      case LOAD_SINGLE_COMMENT :
      return [
        ...state.filter((comment) => comment.id !== action.comment.id),
        action.comment
      ]
      case UPDATE_COMMENT :
      return [
        ...state.filter((comment) => comment.id !== action.comment.id),
        action.comment
      ]
      default :
        return state
    }
  
  }
  
  
  