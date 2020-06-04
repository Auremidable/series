import React, { Component } from 'react';
import {LOGIN_URI, REDIRECT_URI} from '../../apis/config';
import { API_KEY } from '../../apis/credentials';
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Nav } from 'react-bootstrap';
import { TiSocialFacebookCircular } from "react-icons/ti";
import { AiOutlineLogout } from "react-icons/ai";

class Layout extends Component {
    
    state = {
        token: localStorage.getItem('token')
    }

    getCode = (e) => {
        e.preventDefault();
        return window.location.href=`${LOGIN_URI}authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}`;
    }
    
    isLoggeIn = () => {           
        if (this.state.token !== null){
            return(
                <AiOutlineLogout 
                    onClick={this.logOut}
                    className="logout-btn" 
                    data-toggle="tooltip"
                    title="logout"
                />
            )
        }else{
            return (
                <TiSocialFacebookCircular 
                    onClick={this.getCode}
                    className="login-btn"
                    data-toggle="tooltip"
                    title="login with facebook"
                />
            )
        }
    }
    
    displayLinks = () => {                
        if (this.state.token !== null){
            return (
                <Nav className="mr-auto">
                    <Nav.Link href="/all-shows">All Shows</Nav.Link>
                    <Nav.Link href="/my-shows">My Shows</Nav.Link>                                 
                </Nav>
            )
        }
        else {
            return null;
        }
    }
    
    logOut = () => {
        localStorage.removeItem('token');
        this.setState({token: ''});
        this.props.history.push('/');
        window.location.reload()
    }
        
    render() { 
        return (  
            <div>
                <Header 
                    getCode={this.getCode}
                    isLoggeIn={() => this.isLoggeIn()}
                    displayLinks={() => this.displayLinks()}
                    logOut={this.logOut}
                />                
                <div>                    
                    {this.props.children}
                </div>                
            </div>
        );
    }
}
 
export default withRouter(Layout);