import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import ListPosts from './components/listPosts';
import Category from './components/category';
import CreatePost from './components/createPost';
import * as Api from './utils/api'
import { connect } from 'react-redux'
import { loadCategories, loadPosts } from './actions'
import { bindActionCreators } from "redux"

class App extends Component {

  state = {
    // posts : [],
    // comments : [],
    // categories : []
  }

  componentDidMount() {

    //get available categories
    Api.getCategories().then((categories) => {
      // this.setState({categories});
      // console.log(categories);
      this.props.loadCategories(categories);
      // console.log('my cats ', this.props.categories);
    });

    //get available posts
    Api.getPosts().then((posts) => {
      // console.log('posts: ', jposts);
      this.props.loadPosts(posts);
    });


  }

  createPost(id, timestamp, title, body, author, category) {
    console.log('onCreate' , id, timestamp, title, body, author, category);
    Api.addPost(id, timestamp, title, body, author, category).then((res) => {
      console.log('res ',res);
      
      // this.props.loadPosts(posts);
    }).catch((err) => {
      console.log('error when persisting post');
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
    loadPosts
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
