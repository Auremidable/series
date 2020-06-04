import React from 'react';

const Spinner = () => {
    
    const spinner = () => {        
        return (
            <div className="spinner">
                <div className="spinner-grow text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    return (  
        <>
            {spinner()}
        </>
    );
}
 
export default Spinner;