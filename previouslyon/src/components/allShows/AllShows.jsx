import React, { Component } from 'react';
import './allShow.style.css';
import { BASE_URL } from '../../apis/config';
import { API_KEY } from '../../apis/credentials';

import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { IoIosStar } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdArchive, MdUnarchive } from "react-icons/md";

import axios from 'axios';
import Pagination from './Pagination';
import Spinner from '../Spinner';

class AllShows extends Component {

    state = {
        token: localStorage.getItem('token'),
        isFetching: false,
        key: API_KEY,
        url: BASE_URL,
        v: 'v3.0',
        start: 0,
        limit: 8,
        btn: 'btn btn-outline-primary disabled',
        AllShows: [],        
    }

    componentDidMount() {
        this.fetchAllShows();
    }

    fetchAllShows = () => {
        const { url, key, token, v, start, limit } = this.state;
        axios.get(`${url}shows/list?key=${key}&token=${token}&v=${v}&order=popularity&start=${start}&limit=${limit}`)
            .then( res => { 
                console.log('ALL SHOW',res)               
                this.setState({ AllShows: res.data.shows, isFetching: true })
            }).catch(err => console.log(err))
    }

    archiveShow = (id) => {
        const { url, token, key } = this.state;
        let body = {
            id: id,
            access_token: token
        }
        axios.post(`${url}shows/show?key=${key}`, body)
            .then( res => {                           
            }).catch(err => console.log(err.response))
    }

    renderAllShows = shows => {
        return (
            shows.map(show => {
                return (
                    <div key={show.id} className="">
                        <div className="card border-0 m-4 bg-transparent" style={{ maxWidth: '400px' }}>
                            <div className="card-img">
                                {show.images.show ? 
                                <img src={show.images.show} alt={show.id} width="100%" className="card-img__pics"/>
                                :
                                <img src="https://via.placeholder.com/298x121.png/000000/FFFFFF?text=No+Image" alt={show.id}/>
                                }
                            </div>
                            <div className="card-body">
                                <Link to={`/show/${show.id}`} className="link">
                                    <h5 className="card-title m-0">{show.original_title}</h5>
                                </Link>
                                <StarRatingComponent
                                    name="rate2"
                                    editing={false}
                                    renderStarIcon={() => <span><IoIosStar size={10} /></span>}
                                    starCount={5}
                                    value={show.notes.mean}
                                />
                                <small className="text text-secondary mb-3">{show.description}</small>
                                <div className="d-inline ">
                                    <p className="badge badge-info mr-3">{show.episodes} episodes</p>
                                    <p className="badge badge-warning">{show.seasons} seasons</p>
                                    <IoMdAddCircleOutline
                                        onClick={() => this.archiveShow(show.id)}
                                        className="icon"
                                        data-toggle="tooltip"
                                        title="Add Show to my list" />
                                    {show.user.archived 
                                    ? <MdArchive color="yellow" size={25} data-toggle="tooltip" title="Status Archived"/> 
                                    : <MdUnarchive color="blue" size={25} data-toggle="tooltip" title="Status Unarchived"/>
                                    } 
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }
    
    paginationStateHandler = (start, btn, isFetching) => {
        return(
            this.setState({
                start: start,            
                btn: btn,
                isFetching: isFetching
            })
        )
    }

    renderTitleBar = () => {
        return(
            <div className="mx-auto">                
                <h5 className="display-4 text-danger">ALL SHOWS</h5>                
            </div>
        )
    }

    render() {         
        return ( 
            <div className="section-allshows"> 
                <div className="row py-5 m-0">
                    {this.renderTitleBar()}             
                </div>               
                <div className="d-flex flex-wrap justify-content-center">
                    {this.state.isFetching ? this.renderAllShows(this.state.AllShows) : <Spinner />}
                </div>
                <div className="text-center">                        
                    <Pagination 
                        state={this.state}
                        paginationStateHandler={this.paginationStateHandler}                            
                        fetchAllShows={this.fetchAllShows}
                    />
                </div>                
            </div>
        );
    }
}

export default AllShows;