import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';

class Category extends Component {

  componentDidMount() {
    console.log('link ', this.props.match.name);
  }


  render() {
    return (
      <h1>MyPosts</h1>
    );

  }

}

export default Category;
