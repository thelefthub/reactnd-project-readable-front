import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
import { formatDate } from '../utils/helpers';
import sortBy from 'sort-by';
import Modal from 'react-modal';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome'



class ListPosts extends Component {

  state = {
    sortChoice: '',
    viewChoice: '',
    modalOpen: false,
    postTitleEdit: '',
    postBodyEdit: '',
    postIdEdit: ''

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

  // //order posts on user preference
  // onSort = (value) => {
  //   this.setState({sortChoice : value});
  //   this.props.posts.sort(sortBy(value));
  //   // console.log('sorted ', this.props.posts);
  // }

  //order posts on user preference
  onSort = (value) => {
    this.props.onSort(value);
    // console.log('sorted ', this.props.posts);
  }

  openModal = (id, title, body) => {
    this.setState({modalOpen : true});

    this.setState(() => ({
      modalOpen: true,
      postTitleEdit: title,
      postBodyEdit: body,
      postIdEdit: id    
    }))
  }
  closeModal = () => {
    this.setState(() => ({
      modalOpen: false,
      postTitleEdit: '',
      postBodyEdit: '',
      postIdEdit: ''    
    }))
  }

  handleSubmit = (e, id) => {
    this.props.handleSubmit(e, id)
    this.closeModal();
  }

  

  render() {
    const { sortChoice, viewChoice, modalOpen, postTitleEdit, postBodyEdit, postIdEdit } = this.state
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
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>id<i className='fa fa-fw fa-sort' onClick={(e) => this.onSort('id')}></i></th>
                  <th scope='col'>timestamp<i className='fa fa-fw fa-sort' onClick={(e) => this.onSort('timestamp')}></i></th>
                  <th scope='col'>title<i className='fa fa-fw fa-sort' onClick={(e) => this.onSort('title')}></i></th>
                  <th scope='col'>author<i className='fa fa-fw fa-sort' onClick={(e) => this.onSort('author')}></i></th>
                  <th scope='col'>score<i className='fa fa-fw fa-sort' onClick={(e) => this.onSort('voteScore')}></i></th>
                  <th scope='col'>comments<i className='fa fa-fw fa-sort' onClick={(e) => this.onSort('commentCount')}></i></th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.posts.reduce((filtered, curVal) => {
                   if (curVal.category === viewChoice) {
                      filtered.push(curVal);
                  }
                   if (viewChoice === 'home') {
                     filtered.push(curVal);
                   }
                   return filtered;
                 }, []).map((post) => (
                   <tr key={post.id}>
                     <th scope='row'><Link to={`/posts/${post.id}`}>{post.id}</Link></th>
                     <td>{formatDate(post.timestamp)}</td>
                     <td>{post.title}</td>
                     <td>{post.author}</td>
                     <td>{post.voteScore}</td>
                     <td>{post.commentCount}</td>
                     <td onClick={() => this.props.castPostVote(post.id, 'upVote')}><i className="fa fa-thumbs-up" aria-hidden="true"></i></td>
                     <td onClick={() => this.props.castPostVote(post.id, 'downVote')}><i className="fa fa-thumbs-down" aria-hidden="true"></i></td>
                     <td onClick={() => this.openModal(post.id,post.title, post.body )}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></td>
                     <td onClick={() => this.props.deletePost(post.id)}><i className="fa fa-trash" aria-hidden="true"></i></td>
                   </tr>
               ))

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
            <Modal
                className='modal-post'
                overlayClassName='overlay'
                isOpen={modalOpen}
                onRequestClose={this.closeModal}
                contentLabel='comment label'
                >
                <div>
                <h2>Modify post</h2>
                <form onSubmit={(e) => this.handleSubmit(e, postIdEdit)}>
                    <div className='form-group'>
                        <label htmlFor="title" className='label-align'>title</label>
                        <input type='text' name='title' className='form-control' placeholder={postTitleEdit}/>
                    </div>
                    <div className='form-group'>
                    <label htmlFor="body" className='label-align'>body</label>
                    <textarea className='form-control' id="txtArea" rows="4" name="body" placeholder={postBodyEdit}></textarea>
                    </div>
                    <button type="submit" className={'label-align ' + 'btn btn-primary' + ' btn-custom'}>Submit</button>
                </form>
                </div>
            </Modal>
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
