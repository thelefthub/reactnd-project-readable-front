const api = 'http://localhost:3001';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'something'
};

// get all available categories
export const getCategories = () => fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories);

// get all posts
export const getPosts = () => fetch(`${api}/posts`, { headers })
  .then(res => res.json())
  // .then(data => data.posts);

// get all posts for a given category
export const getPostsPerCategory = (category) => fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json())
  .then(data => data.posts);

// get a specific post
export const getPost = (id) => fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())

// add a new post
export const addPost = (id, timestamp, title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id: id,
      timestamp: timestamp,
      title: title,
      body: body,
      author: author,
      category: category
    })
  }).then(res => res.json()
);

// update an existing post
export const updatePost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({title, body})
  }).then(res => res.json()
);

// delete an existing post
export const deletePost = (id) => fetch(`${api}/posts/${id}`, {
  method: "DELETE",
  headers
})

// cast a vote on a post
export const castPostVote = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: "POST",
    headers,
    body: JSON.stringify({option})
  })

// get all comments for a single post
export const getComments = (id) => fetch(`${api}/posts/${id}/comments`, { headers })

// get a specific comment
export const getComment = (id) => fetch(`${api}/comments/${id}`, { headers })

// add a comment to a post
export const addComment = (id, timestamp, body, author, parentId) =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers,
    body: JSON.stringify({id, timestamp, body, author, parentId})
  }).then(res => res.json()
);

// edit an existing comment
export const updateComment = (id, timestamp, body) =>
  fetch(`${api}/comments/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({timestamp, body})
  })

// deleta an existing comment
export const deleteComment = (id) =>
fetch(`${api}/comments/${id}`, {
  method: "DELETE",
  headers
})

// cast a vote on a comment
export const castCommentVote = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: "POST",
    headers,
    body: JSON.stringify({option})
  })
