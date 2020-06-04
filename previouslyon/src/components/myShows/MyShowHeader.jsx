import React from 'react';
import './myShows.style.css';

const MyShowHeader = (props) => {
    
    const renderShowDetails = show => {
        return(
            props.shows.map(info => {
                let imageUrl = info.images.show;                
                return (                            
                    <div key={info.id} >
                        <div className="row justify-content-center m-0 myshow-header" style={{                             
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'top',
                            height:'50vh' ,                                                                                    
                            }}>                            
                            
                            <div className="col-10">
                                <div className="mt-5">
                                <h1 className="text-white display-3 font-weight-bold mb-2">ON THE GO</h1>
                                <h1 className="text-white display-4 font-weight-bold mb-3">{info.title} </h1>
                                <div className="mb-2">
                                    <span className="badge badge-danger" style={{fontSize:'20px'}}>
                                        {Object.keys(info.genres)[0] ? Object.keys(info.genres)[0] : null}
                                    </span>                                                            
                                </div>
                                    
                                </div>
                                <div className="d-inline-block">
                                    <p className="badge badge-secondary mr-3">Followers 
                                        <span className="badge badge-danger" style={{fontSize:'15px',marginLeft:'5px'}}>{info.followers}</span>
                                    </p>
                                    <p className="badge badge-secondary">Season 
                                        <span className="badge badge-danger" style={{fontSize:'15px',marginLeft:'5px'}}>{info.seasons}</span>                                            
                                    </p>
                                    
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
 
export default MyShowHeader;