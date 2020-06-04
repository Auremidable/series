import React, { Component } from 'react';
import { BASE_URL } from '../../apis/config';
import { API_KEY } from '../../apis/credentials';

import axios from 'axios';
import './episode.style.css';

import StarRatingComponent from 'react-star-rating-component';
import { IoIosStar } from "react-icons/io";

import Spinner from '../Spinner';

class EpisodeDetails extends Component {
    
    state = {        
        token: localStorage.getItem('token'),
        isFetching: false,
        key: API_KEY,
        url: BASE_URL,
        v: 'v3.0', 
        image: '',
        episode: [],
        pics: ''     
    }

    componentDidMount(){
        this.getEpisodeDetails();
    }

    getEpisodeDetails = () => {
        const { url, key, token, v } = this.state;
        let episodeId = this.props.match.params.id;
        axios.get(`${url}episodes/display?key=${key}&token=${token}&id=${episodeId}&v=${v}`)
            .then( res => {   
                console.log(res.data.episode)             
                let data = res.data.episode;
                let newState = [...this.state.episode, data];               
                this.setState({ episode: newState })                             
            })
            .then(this.getEpisodePicture)                                   
            .catch(err => console.log(err.response))
    }
    
    renderDetails = () => {
        return(
            <>
                {this.state.episode.map( detail => {
                    let url = `https://api.betaseries.com/pictures/episodes?key=${this.state.key}&id=${detail.id}`                    
                    return(                        
                        <div key={detail.id} className="section-main">
                            <div className="section-main__container">
                                <div className="" style={{
                                        backgroundImage: `url(${url})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'top',
                                        height:'350px' ,                                        
                                    }}>
                                    
                                    <div className="">
                                        <span className="badge badge-dark badge-style">Episode 
                                            <span className="badge badge-danger" style={{fontSize:'25px'}}>{detail.episode}</span>
                                        </span>
                                    </div>
                                    <p className="section-detail__header text-center mt-2">{detail.title}
                                    </p>
                                    <div className="d-flex justify-content-center mb-3">
                                    <StarRatingComponent 
                                            name="rate2" 
                                            editing={false}
                                            renderStarIcon={() => <span><IoIosStar size={30}/></span>}
                                            starCount={5}
                                            value={Math.floor(detail.note.mean)}                                        
                                            />
                                            <div>
                                                <span className="badge badge-warning ml-3">{detail.date.substring(0,4)}</span>
                                            </div>
                                    </div>                                
                                </div>
                                <div className="section-detail__text">
                                    <p >{detail.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
        
    }

    render() { 
        return (             
            <div>                
                {this.state.episode ? this.renderDetails() : <Spinner />}
            </div>
         );
    }
}
 
export default EpisodeDetails;