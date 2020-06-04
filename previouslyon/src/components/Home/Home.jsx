import React from 'react';
import './home.style.css';

const Home = () => {    
    return ( 
        <div className="home">
            <div className="home__header">
                <span className="home__header--primary">Previously
                    <span className="first">O</span><span className="second">n</span>
                </span>   
                <p className="home__header--secondary">Please log In</p>             
            </div>                        
        </div>
    );
}
 
export default Home;