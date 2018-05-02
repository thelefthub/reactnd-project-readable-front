import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Error () {
    return (
        <div className='container'>
        <p>Error!</p>
        <p><Link to='/'>Go Home</Link></p>
        </div>
        
        
        
    )
}

export default Error