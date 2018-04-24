import {
  LOAD_CAT,

} from '../actions'

// const initialCategoryState = [{
//   name: "",
//   path: "/"
// }]
const initialCategoryState = []

// the reducer function
// if undefined use initialCalendarState and returns an array of categories
export function categories (state = initialCategoryState, action) {

  switch (action.type) {
    case LOAD_CAT :
      return [ 
        ...state,
        ...action.categories
      ]
    default :
      return state
  }

}
