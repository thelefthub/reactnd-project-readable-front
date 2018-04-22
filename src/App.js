import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import ListPosts from './components/listPosts';
import * as Api from './utils/api'
import { connect } from 'react-redux'
import { loadCategories } from './actions'
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
      console.log(categories);
      this.props.loadCategories(categories);
      // console.log('my cats ', this.props.categories);
    });
  }


  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <ListPosts
            categories={this.props.categories}

            />
          )}/>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,

  }
}

const mapDispatchToProps = (dispatch, ownProps) => (
  bindActionCreators({
    loadCategories
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
