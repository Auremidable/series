import React from 'react';

const ClickComponent = (props) => {
    return ( 
        <div className="">
            <button onClick={props.seenEpisodesHandler} className="btn btn-outline-success mr-2">SEEN SEPISODES</button>
            <button onClick={props.unSeenEpisodesHandler} className="btn btn-outline-danger">UNSEEN EPISODES</button>
        </div>
    );
}
 
export default ClickComponent;