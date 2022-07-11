import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeBook } from '../actions/books';

const Book = ({ id, title, description, author, published, dispatch }) => (
    <div>
        <Link to={`/book/${id}`}>
            <h4>{title} ({published})</h4>
        </Link>
        <p>Author: {author}</p>
        {description && <p>{description}</p>}
        <button onClick={() => {
            dispatch(removeBook({ id }));
        }}>Remove</button>
    </div>
);
//import React, {Component, useState, useEffect} from 'react';
//
//function Book () {
//    const [message, setMessage] = useState("");
//
//    useEffect(() => {
//        fetch('/api/hello')
//            .then(response => response.text())
//            .then(message => {
//                setMessage(message);
//            });
//    },[])
//    return (
//        <div >
//        <header>
//        
//        <h1 >{message}</h1>
//        </header>
//        <p >
//        To get started, edit <code>src/App.js</code> and save to reload.
//    </p>
//    </div>
//)
//}


export default connect()(Book);