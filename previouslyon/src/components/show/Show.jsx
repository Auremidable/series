import React, { Component } from 'react';
import { BASE_URL } from '../../apis/config';
import { API_KEY } from '../../apis/credentials';

import './show.style.css';
import axios from 'axios';

import ShowForm from './ShowForm';
import ShowCarousel from './ShowCarousel';
import ShowSeenEpisodes from './ShowSeenEpisodes';
import ShowUnseenEpisodes from './ShowUnseenEpisodes';
import ShowDetails from './ShowDetails';
import Spinner from '../Spinner';

import ClickComponent from './ClickComponent';

class Show extends Component {
    
    state = {        
        token: localStorage.getItem('token'),
        isFetching: false,
        seenEpisodes: false,
        unSeenEpisodes: false,
        key: API_KEY,
        url: BASE_URL,
        v: 'v3.0',
        num: 1,
        show: [], 
        seasons: [],
        episodes: [],        
    }

    componentDidMount(){
        this.fetchShow();
    }
    
    fetchShow = () => {
        const { url, key, token, v } = this.state;
        let showId = this.props.match.params.id;
        axios.get(`${url}shows/display?key=${key}&token=${token}&id=${showId}&v=${v}`)
            .then( res => {                
                let data = res.data.show;
                let newState = [...this.state.show, data];                
                this.setState({ show: newState })                
            })
            .then(this.fetchShowSeasons(showId))
            .then(this.fetchShowEpisodes(1))
            .catch(err => console.log(err))
    }

    fetchShowSeasons = id => {
        const { url, key, token, v } = this.state;        
        axios.get(`${url}shows/seasons?key=${key}&token=${token}&id=${id}&v=${v}`)
            .then( res => {                
                this.setState({ seasons: res.data.seasons, isFetching: false })
            }).catch(err => console.log(err))
    }

    fetchShowEpisodes = id => {
        const { url, key, token, v } = this.state;
        let showId = this.props.match.params.id;
        axios.get(`${url}shows/episodes?key=${key}&token=${token}&season=${id}&v=${v}&id=${showId}`)
            .then( res => {                
                this.setState({ episodes: res.data.episodes ,isFetching: true, seenEpisodes:true })
            }).catch(err => console.log(err.response))
    }
    
    archiveShow = id => {        
        const { url, token, key } = this.state;
        let body = { 
            id: id, 
            access_token: token,
            key: key
         }        ;
        axios.post(`${url}shows/archive`, body)
            .then( res => {
                if (res.status === 200){
                    window.location.reload();
                }
            })
            .catch(err => console.log(err.response))
    }

    unArchiveShow = id => {        
        const { url, key, token, v } = this.state;
        axios.delete(`${url}shows/archive?id=${id}&token=${token}&key=${key}&v=${v}`)
            .then( res => {
                if (res.status === 200){
                    window.location.reload();
                }              
            }).catch(err => console.log(err.response))
    }

    markAsSeen = (id) => {
        
        const { url, token, key } = this.state;
        let body = { 
            id: id, 
            access_token: token,
            key: key,
            bulk: false
         }        ;
        axios.post(`${url}episodes/watched`, body)
            .then( res => {                
                if(res.status === 200){
                    window.location.reload();                 
                }                      
            })
            .catch(err => console.log(err.response))
    }
    markAllPreviousAsSeen = (id) => {
        
        const { url, token, key } = this.state;
        let body = { 
            id: id, 
            access_token: token,
            key: key,
            bulk: true
         }        ;
        axios.post(`${url}episodes/watched`, body)
            .then( res => {                
                if(res.status === 200){
                    window.location.reload();                 
                }                    
            })
            .catch(err => console.log(err.response))
    }
    markAsUnseen = (id) => {
        const { url, key, token, v } = this.state;
        axios.delete(`${url}episodes/watched?id=${id}&token=${token}&key=${key}&v=${v}`)
            .then( res => { 
                if(res.status === 200){
                    window.location.reload();                 
                }               
            }).catch(err => console.log(err.response))
        
    }

    renderSeenEpisodes = () => {        
        return(
            <ShowUnseenEpisodes 
                state={this.state.episodes}
                markAsUnseen={this.markAsUnseen} 
            />
        )
    }

    renderUnseenEpisodes = () => {        
        return(
            <ShowSeenEpisodes 
                state={this.state.episodes} 
                markAsSeen={this.markAsSeen}
                markAllPreviousAsSeen={this.markAllPreviousAsSeen}
                
            />
        )
    }

    seenEpidodesHandler = () => {             
        this.setState({ seenEpisodes: false })      
        // console.log(this.state.seenEpisodes)      
    }
    unSeenEpidodesHandler = () => {             
        this.setState({ seenEpisodes: true })      
        // console.log(this.state.seenEpisodes)      
    }

    renderTitleBar = () => {
        return(
            <div className="mx-auto">                
                <h5 className="display-4 text-danger">MANAGE SHOWS</h5>                
            </div>
        )
    }
    

    render() {         
        return ( 
            <div className="section-show">
                <>
                    {this.state.show 
                        ?  <ShowDetails 
                            state={this.state.show} 
                            unArchiveShow={this.unArchiveShow}
                            archiveShow={this.archiveShow}
                        />
                        : <Spinner />
                    }                                    
                </>                
                <div className="row py-5 m-0">
                    {this.renderTitleBar()}             
                </div>
                <div className="row m-0 justify-content-center">
                        <div className="mr-2">                        
                            <ShowForm 
                                state={this.state} 
                                fetchShowEpisodes={this.fetchShowEpisodes}/>
                        </div>

                        <div className="">
                            <ClickComponent 
                                seenEpisodesHandler={this.seenEpidodesHandler} 
                                unSeenEpisodesHandler={this.unSeenEpidodesHandler}
                            />
                        </div>
                    </div>
                
                <div className="row m-0 justify-content-center">                    
                    <div className="col-xl-8">
                        <div className="d-flex flex-wrap p-5">                            
                            {this.state.seenEpisodes 
                                ? this.renderUnseenEpisodes()
                                :this.renderSeenEpisodes()
                            }
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Show;