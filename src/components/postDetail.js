import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
import serializeForm from 'form-serialize';
import { formatDate, generateId } from '../utils/helpers';
import Modal from 'react-modal';
import * as Api from '../utils/api';
import { loadSinglePost, updatePost, deletePost, loadComments, addComment, deleteComment } from '../actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';


class PostDetail extends Component {
    
    
    state = {
        // post : {},
        commentModalOpen: false,
        commentAuthorEdit: '',
        commentBodyEdit: ''

        
        // body: '',
        // author: '',
        // category: ''
        // posts:[]
      }

      componentDidMount() {

        // get available posts
        Api.getPost(this.props.match.params.id).then((post) => {
            // this.setState({post: post});
            // console.log('props', this.props);
            this.props.loadSinglePost(post);
        });

        // get available comments
        Api.getComments(this.props.match.params.id).then((comments) => {
        this.props.loadComments(comments, this.props.match.params.id);
        // console.log('comments ', this.props.comments);
        });

        

        // let post = this.props.loadSinglePost(this.props.match.params.id);
        // console.log('state: ', Store.getState());
        // console.log('props: ', this.props);
        
        // let post = this.props.posts.filter((post) => post.id === this.props.match.params.id);
        // this.setState({post: post[0]})
        // console.log(post[0]);
        // Modal.setAppElement('#root');
      }

      // update an existing post
      handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        Api.updatePost(this.props.match.params.id, values.title, values.body).then((post) => {
            this.props.updatePost(post);

        }).catch((err) => {
            console.log('error when persisting post: ', err);
          });
      }

      openCommentModal = () => {
        this.setState(() => ({
            commentModalOpen: true
        }))
      }
      closeCommentModal = () => {
        this.setState(() => ({
            commentModalOpen: false
        }))
      }

      // handling submitting a new comment
      handleCommentSubmit = (e) => {
        // addComment = (id, timestamp, body, author, parentId)
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        Api.addComment(generateId(), Date.now(), values.commentArea, values.commentAuthor, this.props.match.params.id).then((comment) => {
            this.props.addComment(comment);
            this.setState({commentModalOpen : false});
            }).catch((err) => {
                console.log('error when persisting comment: ', err);
              });
      }

    //   // handling updating an existing comment
    //   handleCommentUpdate = (e) => {
    //       console.log('update comment');
          
    //   }

      // delete an existing post
      deletePost = () => {
          Api.deletePost(this.props.match.params.id).then(() => {
            this.props.history.push('/')
            this.props.deletePost(this.props.match.params.id)
          }).catch((err) => {
            console.log('error when deleting post: ', err);
          });
      }

      deleteComment = (id) => {
          Api.deleteComment(id).then(() => {
            this.props.deleteComment(id)
          }).catch((err) => {
            console.log('error when deleting comment: ', err);
          });
          
      }
    
    
    render() {

        const { commentModalOpen, commentAuthorEdit, commentBodyEdit } = this.state;
        const { post, comments } = this.props;

        // Modal.setAppElement('#root');

        return (
            <div className='container'>
            <h2>Post Detail</h2>
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="title" className='label-align'>Title</label>
                    <input type='text' name='title' className='form-control' id='title' placeholder={post.title}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="author" className='label-align'>Author</label>
                    <input type='text' name='author' className='form-control' placeholder={post.author} disabled/>
                </div>
                <div className='form-group'>
                    <label htmlFor="timestamp" className='label-align'>Timestamp</label>
                    <input type='text' name='timestamp' className='form-control' placeholder={formatDate(post.timestamp)} disabled/>
                </div>
                {/* <div className='form-group'>
                    <label htmlFor='orderSelect' className='label-align'>Category</label>
                    <select id ='orderSelect' className='form-control' name="category" value={post.category}>
                    {
                        this.props.categories.map((cat) => (
                            <option value={cat.name} key={cat.name}>{cat.name}</option>
                        ))
                    }
                    </select>
                </div> */}
                <div className='form-group'>
                    <label htmlFor="category" className='label-align'>Timestamp</label>
                    <input type='text' name='category' className='form-control' placeholder={post.category} disabled/>
                </div>
                <div className='form-group'>
                    <label htmlFor="voteScore" className='label-align'>Vote Score</label>
                    <input type='text' name='voteScore' className='form-control' placeholder={post.voteScore} disabled/>
                </div>
                <div className='form-group'>
                    <label htmlFor="txtArea" className='label-align'>Post</label>
                    <textarea className='form-control' id="txtArea" rows="4" name="body" placeholder={post.body}></textarea>
                </div>
                <button type="submit" className={'label-align ' + 'btn btn-primary' + ' btn-custom'}>Change</button>
            </form>
            <button className={'label-align ' + 'btn btn-danger' + ' btn-custom'} onClick={() => this.deletePost()}>Delete Post</button>
            <button className={'label-align ' + 'btn btn-primary' + ' btn-custom'} onClick={() => this.openCommentModal()}><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
            <button className={'label-align ' + 'btn btn-primary' + ' btn-custom'} onClick={() => this.openCommentModal()}><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
            <h4>Comments</h4>
            <Modal
                className='modal-post'
                overlayClassName='overlay'
                isOpen={commentModalOpen}
                onRequestClose={this.closeCommentModal}
                contentLabel='comment label'
                >
                <div>
                {commentAuthorEdit === '' ? (
                    <h2>Add comment</h2>
                ) : (
                    <h2>Modify comment</h2>
                )}
                <form onSubmit={this.handleCommentSubmit}>
                    <div className='form-group'>
                        <label htmlFor="commentAuthor" className='label-align'>Author</label>
                        <input type='text' name='commentAuthor' className='form-control' placeholder={commentAuthorEdit}/>
                    </div>
                    <div className='form-group'>
                    <label htmlFor="commentArea" className='label-align'>Comment</label>
                    <textarea className='form-control' id="commentArea" rows="4" name="commentArea" placeholder={commentBodyEdit}></textarea>
                    </div>
                    <button type="submit" className={'label-align ' + 'btn btn-primary' + ' btn-custom'}>Submit</button>
                </form>
                </div>
            </Modal>
            
            <table className='table'>
            
              <thead>
                <tr>
                  <th scope='col'>id</th>
                  <th scope='col'>timestamp</th>
                  <th scope='col'>author</th>
                  <th scope='col'>comment</th>
                  <th scope='col'>score</th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
              {
                  comments.map((comment) =>(
                    <tr key={comment.id}>
                      <th scope='row'>{comment.id}</th>
                      <td>{formatDate(comment.timestamp)}</td>
                      <td>{comment.author}</td>
                      <td>{comment.body}</td>
                      <td>{comment.voteScore}</td>
                      <td onClick={() => this.openCommentModal()}><i className="fa fa-thumbs-up" aria-hidden="true"></i></td>
                      <td onClick={() => this.openCommentModal()}><i className="fa fa-thumbs-down" aria-hidden="true"></i></td>
                      <td onClick={() => this.openCommentModal()}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></td>
                      <td onClick={() => this.deleteComment(comment.id)}><i className="fa fa-trash" aria-hidden="true"></i></td>
                    </tr>
                  ))
              }
              </tbody>
            </table>
            <button className={'label-align ' + 'btn btn-primary' + ' btn-custom'} onClick={() => this.openCommentModal()}>Add Comment</button>
                       
            </div>
            );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    //   categories: state.categories,
      post  : state.posts.filter((post) => post.id === ownProps.match.params.id)[0],
      comments : state.comments.filter((comment) => comment.parentId === ownProps.match.params.id)
  
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => (
    bindActionCreators({
      loadSinglePost,
      updatePost,
      deletePost,
      loadComments,
      addComment,
      deleteComment,
  
    }, dispatch)
  )
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetail)

// export default PostDetail;

