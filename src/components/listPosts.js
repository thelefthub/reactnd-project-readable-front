import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
import { formatDate } from '../utils/helpers';
import sortBy from 'sort-by';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome'



class ListPosts extends Component {

  state = {
    sortChoice: '',
    viewChoice: '',
    // posts:[]
  }

  componentDidMount() {
    //set state according to view preference
    console.log('link:', this.props.match);
    let param = 'home';
    switch (this.props.match.params.name) {
      case 'react':
        param = this.props.match.params.name;
        break;
      case 'redux':
        param = this.props.match.params.name;
        break;
      case 'udacity':
        param = this.props.match.params.name;
        break;
    }
    this.setState({ viewChoice: param }, () => {
      console.log('after updates ', this.state.viewChoice);
    });


  }

  //set state according to view preference (when clicking link)
  onViewChoice = (choice) => {
    this.setState({ viewChoice: choice }, () => {
      console.log('after link ', this.state.viewChoice);
      // let filtered = this.props.posts.filter(post => post.category === choice);
      // this.setState(() => ({ posts: filtered }))
    });
  }

  // //order posts on user preference
  // onSort2 = (e) => {
  //   console.log('response ', e.target.value);
  //   this.setState({sortChoice : e.target.value});
  //   this.props.posts.sort(sortBy(e.target.value))
  //   // console.log('sorted ', this.props.posts);
  // }

  //order posts on user preference
  onSort = (value) => {
    console.log('response ', value);
    this.setState({sortChoice : value});
    this.props.posts.sort(sortBy(value))
    // console.log('sorted ', this.props.posts);
  }

  render() {
    const { sortChoice, viewChoice } = this.state
    const { categories, posts } = this.props

    return (
      <div className='container-fluid'>
        <h1>MyPosts</h1>
        <div className='row'>
          <div className='col-2'>
            <h2>Categories</h2>
              <ol className='list-group'>
                {
                  this.props.categories.map((cat) => (
                  <li key={cat.name} className={'list-group-item ' + (this.state.viewChoice === cat.name ? 'list-group-item-secondary' : '')}>

                    <Link to={`/category/${cat.name}`} onClick={(e) => this.onViewChoice(cat.name)}>{cat.name}</Link>
                </li>
                ))
              }
              </ol>
          </div>
          <div className='col-10'>
            <h2>Posts</h2>

            {
            // <form className='order-select'>
            //   <div className='form-group'>
            //     <label htmlFor='orderSelect'>Order by</label>
            //     <select value={sortChoice} onChange={(e) => this.onSort2(e)} id='orderSelect' className='form-control'>
            //       <option value='timestamp'>Date</option>
            //       <option value='voteScore'>Score</option>
            //     </select>
            //   </div>
            // </form>
            }
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>id<i className='fa fa-fw fa-sort' onClick={(e) => this.onSort('id')}></i></th>
                  <th scope='col'>timestamp<i className='fa fa-fw fa-sort' onClick={(e) => this.onSort('timestamp')}></i></th>
                  <th scope='col'>title<i className='fa fa-fw fa-sort' onClick={(e) => this.onSort('title')}></i></th>
                  <th scope='col'>author<i className='fa fa-fw fa-sort' onClick={(e) => this.onSort('author')}></i></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.posts.reduce((filtered, curVal) =>{
                   if (curVal.category === viewChoice) {
                      filtered.push(curVal);
                  }
                   if (viewChoice === 'home'){
                     filtered.push(curVal);
                   }
                   return filtered;
                 }, []).map((post) => (
                   <tr key={post.id}>
                     <th scope='row'>{post.id}</th>
                     <td>{formatDate(post.timestamp)}</td>
                     <td>{post.title}</td>
                     <td>@{post.author}</td>
                   </tr>
               ))

              

              /* this.state.viewChoice === 'home' ? (
                this.props.posts.map((post) => (
                    <tr key={post.id}>
                      <th scope='row'>{post.id}</th>
                      <td>{formatDate(post.timestamp)}</td>
                      <td>{post.title}</td>
                      <td>@{post.author}</td>
                    </tr>
                ))
              ) : (
                this.props.posts.filter((posted) => (
                  posted.category === this.state.viewChoice))
                .map((post) => (
                    <tr key={post.id}>
                      <th scope='row'>{post.id}</th>
                      <td>{formatDate(post.timestamp)}</td>
                      <td>{post.title}</td>
                      <td>@{post.author}</td>
                    </tr>
                ))
              ) */



                  /* this.props.posts.map((post) => (
                    <tr key={post.id}>
                      <th scope='row'>{post.id}</th>
                      <td>{formatDate(post.timestamp)}</td>
                      <td>{post.title}</td>
                      <td>@{post.author}</td>
                    </tr>
                )) */
              }
              </tbody>
            </table>
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
