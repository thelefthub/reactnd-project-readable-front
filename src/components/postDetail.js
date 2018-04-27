import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
import serializeForm from 'form-serialize';
import { formatDate, generateId } from '../utils/helpers';
import Modal from 'react-modal';
import * as Api from '../utils/api';


class PostDetail extends Component {
    
    
    state = {
        post : {},
        commentModalOpen: false,
        
        // body: '',
        // author: '',
        // category: ''
        // posts:[]
      }

      componentDidMount() {

        //get available posts
        Api.getPost(this.props.match.params.id).then((post) => {
            this.setState({post: post});
            // console.log('post', post);
        });

        let post = this.props.loadSinglePost(this.props.match.params.id);
        // console.log('state: ', Store.getState());
        // console.log('props: ', this.props);
        


        // let post = this.props.posts.filter((post) => post.id === this.props.match.params.id);
        // this.setState({post: post[0]})
        // console.log(post[0]);
        // Modal.setAppElement('#root');
      }

      handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        // if (this.props.onCreatePost)
        //   this.props.onCreatePost(generateId(), Date.now(), values.title, values.body, values.author, values.category);
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

      handleCommentSubmit = (e) => {
        // addComment = (id, timestamp, body, author, parentId)
        this.setState(() => ({
            commentModalOpen: false
        }))
      }
    
    
    render() {

        const { post, commentModalOpen } = this.state;

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
                <button className={'label-align ' + 'btn btn-primary' + ' btn-custom'} onClick={() => this.openCommentModal()}>Add Comment</button>
                <button className={'label-align ' + 'btn btn-primary' + ' btn-custom'} onClick={() => this.openCommentModal()}>Vote</button>
            </form>
            <h4>Comments</h4>
            <Modal
                className='modal-post'
                overlayClassName='overlay'
                isOpen={commentModalOpen}
                onRequestClose={this.closeCommentModal}
                contentLabel='comment label'
                >
                <div>
                <h2>Add comment</h2>
                <form onSubmit={this.handleCommentSubmit}>
                    <div className='form-group'>
                        <label htmlFor="commentAuthor" className='label-align'>Author</label>
                        <input type='text' name='commentAuthor' className='form-control'/>
                    </div>
                    <div className='form-group'>
                    <label htmlFor="commentArea" className='label-align'>Post</label>
                    <textarea className='form-control' id="commentArea" rows="4" name="commentArea"></textarea>
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
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
            
                       
            </div>
            );
    }
}

export default PostDetail;

