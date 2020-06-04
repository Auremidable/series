import React from 'react';

const Pagination = (props) => {
    
    const nextAction = (e) => {
        e.preventDefault();
        let newState = { ...props.state };  
        let { start, limit } = newState;
        if (start >= 0){
            let nextShows = start + limit;
            let btn = 'btn btn-outline-primary'; 
            let isFetching = true;              
            props.paginationStateHandler(nextShows, btn, isFetching)
            props.fetchAllShows();            
        }
    }

    const previousAction = (e) => {
        e.preventDefault();
        let newState = { ...props.state };                
        let { start, limit } = newState;  
        if (start >= 0){
            let previousShows = start - limit; 
            let isFetching = true;    
            let btn = 'btn btn-outline-primary';               
            props.paginationStateHandler(previousShows, btn, isFetching)
            props.fetchAllShows();
            console.log(start)
        }else {
            let btn = 'btn btn-outline-primary disabled';
            let start = 0;
            let isFetching = true;
            props.paginationStateHandler(start, btn, isFetching)            
            return null;
        }                
    }

    const renderPaginationButton = () => {
        return (            
            <div className="d-inline">
                <button onClick={previousAction} className={props.state.btn}>Prev</button>
                <button onClick={nextAction} className="btn btn-outline-primary ml-2">Next</button>
            </div>            
        )
    }

    return ( 
        <>        
            {renderPaginationButton()}
        </>
    );
}
 
export default Pagination;