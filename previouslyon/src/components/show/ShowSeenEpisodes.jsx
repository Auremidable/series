import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import './show.style.css';

const ShowSeenEpisodes = (props) => {
    
    const renderEpisodes = episodes => {
        return (
            episodes.map( episode => {
                if(episode.user.seen === false){                    
                return(                    
                        <div key={episode.id} className="card bg-transparent border-0 mb-0" style={{width:'500px'}}>
                            <div className="card-body">
                                <div>
                                    <p className="badge badge-secondary m-0">Episodes 
                                        <span 
                                        onClick={() => props.markAllPreviousAsSeen(episode.id)}
                                        data-toggle="tooltip"
                                        title="Mark all previous episodes as seen"
                                        className="badge badge-danger" >{episode.episode}</span>                                                                              
                                    </p>
                                    <FaEye 
                                        onClick={() => props.markAsSeen(episode.id)}
                                        className="eye__icon--see ml-2" 
                                        data-toggle="tooltip"
                                        title="Mark as seen"
                                    />
                                </div>
                                <Link to={`/show-episode/${episode.id}`}>
                                    <h5 className="card-title text-white mb-2">{ episode.title }</h5>
                                </Link>
                                <p><small className="card-text text-secondary text">{ episode.description }</small></p>                                                                        
                            </div>                        
                        </div>
                    )
                }
            })
        )
    }
    
    return ( 
        <>
            {renderEpisodes(props.state)}
        </>
    );
}
 
export default ShowSeenEpisodes;