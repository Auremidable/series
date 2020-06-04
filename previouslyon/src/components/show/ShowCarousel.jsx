import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const ShowCarousel = (props) => {
        
    const renderSeasons = shows => {
        return (            
                <Carousel width="" showThumbs={false}>
                    {shows.map(show => {
                        return(
                            <div key={show.image}>
                                {show.image 
                                ? <img src={show.image} alt={show.title} width="100%"/> 
                                : <img src="https://via.placeholder.com/500x735.png/000000/FFFFFF?text=No+Image" alt={show.id}/> 
                                }
                                                                                               
                            </div>
                        )
                    })}
                </Carousel>            
        )
    }

    return ( 
        <>
            {renderSeasons(props.shows)}
        </>
    );
}
 
export default ShowCarousel;