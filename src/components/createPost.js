import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
import { generateId } from '../utils/helpers';
import serializeForm from 'form-serialize';

class CreatePost extends Component {

    state = {
        // title: '',
        // body: '',
        // author: '',
        // category: ''
        // posts:[]
      }
    
    // handleChange = (e) => {
    //     // console.log(e.target.value + e.target.name);
    //     if (e.target.name === 'catSelect') {
    //         this.setState({category: e.target.name});
    //     }
    //     if (e.target.name === 'txt') {
    //         this.setState({body: e.target.name});
    //     }
        
    // }  

    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        if (this.props.onCreatePost)
          this.props.onCreatePost(generateId(), Date.now(), values.title, values.body, values.author, values.category);
      }

    render() {
        return(
            <div className='container'>
            <h2>Create Post</h2>
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="title" className='label-align'>Title</label>
                    <input type='text' name='title' placeholder='Title' className='form-control' id='title'/>
                </div>
                <div className='form-group'>
                    <label htmlFor="author" className='label-align'>Author</label>
                    <input type='text' name='author' placeholder='Author' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='orderSelect' className='label-align'>Category</label>
                    <select  id='orderSelect' className='form-control' name="category">
                    {
                        this.props.categories.map((cat) => (
                            <option value={cat.name} key={cat.name}>{cat.name}</option>
                        ))
                    }
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor="txtArea" className='label-align'>Post</label>
                    <textarea className='form-control' id="txtArea" rows="4" name="body"></textarea>
                </div>
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
            </div>
            


        );
    }

}

export default CreatePost;