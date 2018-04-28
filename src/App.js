import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import ListPosts from './components/listPosts';
import Category from './components/category';
import CreatePost from './components/createPost';
import PostDetail from './components/postDetail';
import * as Api from './utils/api';
import { connect } from 'react-redux';
import { loadCategories, loadPosts, addPost } from './actions';
import { bindActionCreators } from "redux";

class App extends Component {

  state = {
    // posts : [],
    // comments : [],
    // categories : []
  }

  componentDidMount() {

    //get available categories
    Api.getCategories().then((categories) => {
      this.props.loadCategories(categories);
    });

    //get available posts
    Api.getPosts().then((posts) => {
      this.props.loadPosts(posts);
    });

    // //get available comments
    // Api.getComments().then((comments) => {
    //   this.props.loadComments(comments);
    // });


  }

  createPost(id, timestamp, title, body, author, category) {
    console.log('onCreate' , id, timestamp, title, body, author, category);
    // Api.test(id, timestamp, title, body, author, category);
    Api.addPost(id, timestamp, title, body, author, category).then((post) => {
      // console.log('res ',post);
      this.props.addPost(post);
    }).catch((err) => {
      console.log('error when persisting post: ', err);
    });
    
  }


  render() {

    return (
      <div className="App">
        <Route exact path="/" render={(props) => (
          <ListPosts
            categories={this.props.categories}
            posts={this.props.posts}
            {...props}
            />
          )}/>
        <Route path="/category/:name" render={(props) => (
          <ListPosts
            categories={this.props.categories}
            posts={this.props.posts}
            {...props}

            />
          )}/>
        <Route path='/addpost' render={({ history }) => (
        <CreatePost
          categories={this.props.categories}
          onCreatePost={(id, timestamp, title, body, author, category) => {
            this.createPost(id, timestamp, title, body, author, category)
            history.push('/')
          }}
          />
        )}/>
        <Route path="/posts/:id" render={(props) => (
          <PostDetail
            {...props}
            />
          )}/>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    posts: state.posts,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => (
  bindActionCreators({
    loadCategories,
    loadPosts,
    addPost

  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
