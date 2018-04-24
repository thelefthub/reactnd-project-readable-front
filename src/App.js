import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import ListPosts from './components/listPosts';
import Category from './components/category';
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
      // console.log('posts: ', posts);
      this.props.loadPosts(posts);
    });


  }


  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <ListPosts
            categories={this.props.categories}
            posts={this.props.posts}

            />
          )}/>
        <Route path="/category/:name" render={(props) => (
          <Category
            categories={this.props.categories}
            posts={this.props.posts}
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
    loadPosts
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
