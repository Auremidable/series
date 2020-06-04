import React from 'react';
import './notFound.style.css';

const NotFound = () => {
    return ( 
        <div className="main">
            <div className="section">
                <p className="section__header">Oops !</p>
                <p className="section__subheader">Error <span>404</span></p>
                <p className="section__text">Page not found</p>
            </div>
        </div>
    );
}
 
export default NotFound;