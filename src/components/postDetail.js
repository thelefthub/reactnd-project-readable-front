import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
import serializeForm from 'form-serialize';
import { formatDate, generateId } from '../utils/helpers';
import Modal from 'react-modal';
import * as Api from '../utils/api';
import { loadSinglePost, updatePost, deletePost, loadComments, addComment, deleteComment, updateComment, castPostVote, castCommentVote } from '../actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import sortBy from 'sort-by';


class PostDetail extends Component {
    
    
    state = {
        // post : {},
        commentModalOpen: false,
        commentAuthorEdit: '',
        commentBodyEdit: '',
        commentIdEdit:''
      }

      componentDidMount() {

        // get post detail
        Api.getPost(this.props.match.params.id).then((post) => {
            this.props.loadSinglePost(post);
        });

        // get available comments
        Api.getComments(this.props.match.params.id).then((comments) => {
        this.props.loadComments(comments, this.props.match.params.id);
        // console.log('comments ', this.props.comments);
        });

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

      openCommentModal = (id, author, body) => {
        if (id != null) {
            this.setState(() => ({
                commentModalOpen: true,
                commentAuthorEdit: author,
                commentBodyEdit: body,
                commentIdEdit: id
            }))

        } else {
            this.setState({commentModalOpen : true});
        }
        
        
      }
      closeCommentModal = () => {
        this.setState(() => ({
            commentModalOpen: false,
            commentAuthorEdit: '',
            commentBodyEdit: '',
            commentIdEdit: ''
        }))
      }

      // handling submitting a new or existing comment
      handleCommentSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        if (this.state.commentAuthorEdit === '') {
            Api.addComment(generateId(), Date.now(), values.commentArea, values.commentAuthor, this.props.match.params.id).then((comment) => {
                this.props.addComment(comment);
                this.setState({commentModalOpen : false});
                }).catch((err) => {
                    console.log('error when persisting comment: ', err);
                  });
        } else {
            console.log(values.commentArea);
            // id, timestamp, body
            Api.updateComment(this.state.commentIdEdit, Date.now(), values.commentArea).then((comment) => {
                this.props.updateComment(comment);
                this.setState(() => ({
                    commentModalOpen: false,
                    commentAuthorEdit: '',
                    commentBodyEdit: '',
                    commentIdEdit: ''
                }))
            }).catch((err) => {
                console.log('error when persisting comment: ', err);
              });
        }
      }
      
      // delete an existing post
      deletePost = () => {
          Api.deletePost(this.props.match.params.id).then(() => {
            this.props.history.push('/');
            this.props.deletePost(this.props.match.params.id)
          }).catch((err) => {
            console.log('error when deleting post: ', err);
          });
      }

      // delete an existing comment
      deleteComment = (id) => {
          Api.deleteComment(id).then(() => {
            this.props.deleteComment(id);
          }).catch((err) => {
            console.log('error when deleting comment: ', err);
          });
          
      }

      // cast a vote on the post
      castPostVote = (option) => {
          Api.castPostVote(this.props.match.params.id, option).then((post) => {
              this.props.castPostVote(post);
          }).catch((err) => {
            console.log('error when casting vote: ', err);
          });
      }

      // cast a vote on a comment
      castCommentVote = (id, option) => {
        Api.castCommentVote(id, option).then((comment) => {
            this.props.castCommentVote(comment);
        }).catch((err) => {
          console.log('error when casting vote: ', err);
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
            <button className={'label-align ' + 'btn btn-primary' + ' btn-custom'} onClick={() => this.castPostVote('upVote')}><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
            <button className={'label-align ' + 'btn btn-primary' + ' btn-custom'} onClick={() => this.castPostVote('downVote')}><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
            <h4>Comments</h4>
            <Modal
                className='modal-post'
                overlayClassName='overlay'
                isOpen={commentModalOpen}
                onRequestClose={this.closeCommentModal}
                contentLabel='comment label'
                >
                <div>
                {commentBodyEdit === '' ? (
                    <h2>Add comment</h2>
                ) : (
                    <h2>Modify comment</h2>
                )}
                <form onSubmit={this.handleCommentSubmit}>
                    <div className='form-group'>
                        <label htmlFor="commentAuthor" className='label-align'>Author</label>
                        {commentBodyEdit === '' ? (
                            <input type='text' name='commentAuthor' className='form-control'/>
                        ) : (
                            <input type='text' name='commentAuthor' className='form-control' placeholder={commentAuthorEdit} disabled/>
                        )}
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
                  comments.map((comment) => (
                    <tr key={comment.id}>
                      <th scope='row'>{comment.id}</th>
                      <td>{formatDate(comment.timestamp)}</td>
                      <td>{comment.author}</td>
                      <td>{comment.body}</td>
                      <td>{comment.voteScore}</td>
                      <td onClick={() => this.castCommentVote(comment.id, 'upVote')}><i className="fa fa-thumbs-up" aria-hidden="true"></i></td>
                      <td onClick={() => this.castCommentVote(comment.id, 'downVote')}><i className="fa fa-thumbs-down" aria-hidden="true"></i></td>
                      <td onClick={() => this.openCommentModal(comment.id, comment.author, comment.body)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></td>
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
      comments : state.comments.filter((comment) => comment.parentId === ownProps.match.params.id).sort(sortBy('timestamp'))
  
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
      updateComment,
      castPostVote,
      castCommentVote
  
    }, dispatch)
  )
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetail)

// export default PostDetail;

