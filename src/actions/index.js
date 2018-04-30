export const LOAD_CAT = 'LOAD_CAT';
export const LOAD_POST = 'LOAD_POST';
export const ADD_POST = 'ADD_POST';
export const LOAD_SINGLE_POST = 'LOAD_SINGLE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const CAST_POST_VOTE = 'CAST_POST_VOTE';
export const LOAD_COMMENT = 'LOAD_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const LOAD_SINGLE_COMMENT = 'LOAD_SINGLE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const CAST_COMMENT_VOTE = 'CAST_COMMENT_VOTE';

// action creators: JavaScript objects that you set up to describe any event
// in your application that should update your application’s state
// wrapped in a function to enhance portability

//load categories from server
export function loadCategories(categories) {
  return {
    type: LOAD_CAT,
    categories
  }
}

//load posts from server
export function loadPosts(posts) {
  return {
    type: LOAD_POST,
    posts
  }
}

//add new post
export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

//load a single post
//to always ensure latest version from server?
export function loadSinglePost(post) {
  return {
    type: LOAD_SINGLE_POST,
    post
  }
}

//update existing post
export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post
  }
}

//delete existing post
export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

//cast a vote on a post
export function castPostVote(post) {
  return {
    type: CAST_POST_VOTE,
    post
  }
}

//get all comments
export function loadComments(comments, parentId) {
  return {
    type: LOAD_COMMENT,
    comments,
    parentId
  }
}

//add new comment
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

//delete a comment
export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

//update existing comment
export function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

//cast a vote on a post
export function castCommentVote(comment) {
  return {
    type: CAST_COMMENT_VOTE,
    comment
  }
}

