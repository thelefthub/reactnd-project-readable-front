export const LOAD_CAT = 'LOAD_CAT';

// action creators: JavaScript objects that you set up to describe any event
// in your application that should update your application’s state
// wrapped in a function to enhance portability
export function loadCategories (categories) {
  return {
    type: LOAD_CAT,
    categories
  }
}
