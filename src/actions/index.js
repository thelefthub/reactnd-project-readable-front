export const LOAD_CAT = 'LOAD_CAT';
export const LOAD_POST = 'LOAD_POST';
export const ADD_POST = 'ADD_POST';

// action creators: JavaScript objects that you set up to describe any event
// in your application that should update your application’s state
// wrapped in a function to enhance portability

//load categories from server
export function loadCategories (categories) {
  return {
    type: LOAD_CAT,
    categories
  }
}

//load posts from server
export function loadPosts (posts) {
  return {
    type: LOAD_POST,
    posts
  }
}

//add new post
export function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}
