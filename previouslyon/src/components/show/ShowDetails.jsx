import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { IoIosStar } from "react-icons/io";
import { MdArchive, MdUnarchive } from "react-icons/md";
import './show.style.css';

const ShowDetails = (props) => {
    
    const renderShowDetails = show => {
        return(
            show.map(info => {
                let imageUrl = info.images.show;                
                return (                            
                    <div key={info.id} >
                        <div className="row justify-content-center m-0 show-detail" style={{                             
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'top',
                            height:'60vh' ,                                                        
                            }}>                            
                            
                            <div className="col-7 py-5">
                                <div className="mt-5">
                                <h1 className="text-white display-3 font-weight-bold mb-5">{info.title} </h1>
                                <div className="mb-2">
                                    <span className="badge badge-danger" style={{fontSize:'20px'}}>
                                        {Object.keys(info.genres)[0] ? Object.keys(info.genres)[0] : null}
                                    </span>                                                            
                                </div>
                                    <StarRatingComponent 
                                        name="rate2" 
                                        editing={false}
                                        renderStarIcon={() => <span><IoIosStar size={30}/></span>}
                                        starCount={5}
                                        value={info.notes.total}                                        
                                    /> 
                                </div>
                                <div className="d-inline-block">
                                    <p className="badge badge-secondary mr-3">Seasons 
                                        <span className="badge badge-danger" style={{fontSize:'15px',marginLeft:'5px'}}>{info.seasons}</span>
                                    </p>
                                    <p className="badge badge-secondary">Episodes 
                                        <span className="badge badge-danger" style={{fontSize:'15px',marginLeft:'5px'}}>{info.episodes}</span>                                            
                                    </p>
                                    <p className="text text-white font-weight-bold">{info.description}</p>
                                </div>
                                <div className="d-inline float-right">
                                    <MdUnarchive 
                                        onClick={() => props.unArchiveShow(info.id)}
                                        className="unarchive-icon" 
                                        data-toggle="tooltip" 
                                        title="Unarchive show"/>
                                    <MdArchive 
                                        onClick={() => props.archiveShow(info.id)}
                                        className="archive-icon" 
                                        data-toggle="tooltip" 
                                        title="Archive show"/>
                                        
                                </div>
                            </div>
                        </div>                        
                    </div>
                )
            })
        )
    }

    return ( 
        <>
            {renderShowDetails(props.state)}
        </>
    );
}
 
export default ShowDetails;