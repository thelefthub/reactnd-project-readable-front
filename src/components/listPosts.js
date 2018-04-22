import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';

class ListPosts extends Component {

  state = {
    sortChoice: 'timestamp'
  }

  // componentDidMount() {
  //
  //
  //
  //
  //
  // }

  //order posts
  onSort = (e) => {
    console.log('response ', e.target.value);
    this.setState({sortChoice : e.target.value});
    console.log('cats ', this.props.categories);
    this.props.categories.map((cat) => {
      console.log(cat)
    })
  }

  render() {
    const { sortChoice } = this.state
    const { categories } = this.props

    return (
      <div className='container-fluid'>
        <h1>MyPosts</h1>
        <div className='row'>
          <div className='col-2'>
            <h2>Categories</h2>
              <ol className='list-group'>
                {
                  this.props.categories.map((cat) => (
                  <li key={cat.name} className='list-group-item'>
                    {cat.name}
                </li>
                ))
              }
              </ol>
          </div>
          <div className='col-10'>
            <h2>Posts</h2>

            <form className='order-select'>
              <div className='form-group'>
                <label htmlFor='orderSelect'>Order by</label>
                <select value={sortChoice} onChange={(e) => this.onSort(e)} id='orderSelect' className='form-control'>
                  <option value='timestamp'>Date</option>
                  <option value='voteScore'>Score</option>
                </select>
              </div>
            </form>

              <div className='open-add'>
                <Link to='/addpost'>Add a post</Link>
              </div>
          </div>
        </div>

      </div>





    );



  }

}

export default ListPosts;
