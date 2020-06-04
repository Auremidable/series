import React, { Component } from 'react';
import './myShows.style.css';

import { BASE_URL } from '../../apis/config';
import { API_KEY } from '../../apis/credentials';

import { Link } from 'react-router-dom';
import { MdArchive, MdUnarchive } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import axios from 'axios';

import MyShowHeader from './MyShowHeader';


class MyShows extends Component {
    
    state = {        
        token: localStorage.getItem('token'),        
        key: API_KEY,
        url: BASE_URL,
        v: 'v3.0',
        MyShows: [],
        ShowToDiscover: []
    }

    componentDidMount(){        
        this.getUserShows();
        this.getShowToDiscover();
    }

    getUserShows = () => {
        const { url, key, token, v } = this.state;
        axios.get(`${url}shows/member?key=${key}&access_token=${token}&v=${v}`)
            .then( res => {
                console.log(res.data.shows)
                this.setState({ MyShows: res.data.shows });                
            })
            .catch( err => console.log(err.response))
    }
    removeShowFromList = id => {
        const { url, key, token, v } = this.state;
        axios.delete(`${url}shows/show?key=${key}&access_token=${token}&v=${v}&id=${id}`)
            .then( res => {
                console.log('DELETE',res) 
                window.location.reload();                             
            })
            .catch( err => console.log(err.response))
    }

    renderShows = (shows) => {
        return(
            shows.map( show => {
                return(
                    <div key={show.id} className="card border-0 bg-transparent m-3 show__container" style={{width:'500px'}}>
                        <div className="row no-gutters">
                            <div className="col-sm-12 mb-2">
                                <img src={show.images.show} alt={show.id} width="100%" className="show__container--img"/>
                            </div>
                            <div className="bg-transparent">
                                <Link to={`/show/${show.id}`} className="link">
                                    <h5 className="card-title m-0 title">{show.title}</h5>                                    
                                </Link>                                
                            </div>
                        </div>
                        <div className="d-inline ">
                            <p className="badge badge-secondary mr-3">{show.episodes} episodes</p>
                            <p className="badge badge-secondary mr-3">{show.seasons} seasons</p> 
                            <div className="float-right">
                            {show.user.archived 
                                ? <MdArchive color="yellow" size={25} data-toggle="tooltip" title="Status Archived"/> 
                                : <MdUnarchive color="blue" size={25} data-toggle="tooltip" title="Status Unarchived"/>
                            } 
                            <AiFillDelete 
                                onClick={() => this.removeShowFromList(show.id)}
                                data-toggle="tooltip" title="Delete to my account"
                                color="orangeRed" 
                                size={25} 
                            />                              
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    getShowToDiscover = () => {
        const { url, key, token, v } = this.state;        
        axios.get(`${url}shows/discover?key=${key}&token=${token}&v=${v}&limit=1`)
            .then( res => {    
                console.log('DISCOVER', res)                                          
                this.setState({ ShowToDiscover: res.data.shows })                
            })            
            .catch(err => console.log(err.response))
    }

    renderTitleBar = () => {
        return(
            <div className="mx-auto">                
                <h5 className="display-4 text-danger">MY SHOWS</h5>                
            </div>
        )
    }

    render() { 
        return ( 
            <div className="section-myShows">                
                <MyShowHeader shows={this.state.ShowToDiscover} />
                <div className="row py-5 m-0">
                    {this.renderTitleBar()}             
                </div>
                <div className="d-flex flex-wrap justify-content-center">                
                    {this.renderShows(this.state.MyShows)}
                </div>                              
            </div>
        );
    }
}
 
export default MyShows;