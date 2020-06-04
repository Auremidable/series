import React, { Component } from 'react';
import './login.style.css';

import Axios from 'axios';

class Login extends Component {
        
    state = {
        clientId: '711fa0f152e0',
        clientSecret: '1c2779370f29a49254b16c7fcf5d972c',
        redirectURI: 'http://127.0.0.1:3000/login',
        code: '',
        isFetching: false,
        shows: [],
        
    }

    componentDidMount(){
        setTimeout(this.getCode(), 1000)                
    }

    getCode = () => {
        let getUrl = window.location.href;
        let fullUrl = getUrl.split('/');
        let url = fullUrl[3];
        let code = url.split("#")[0].split("login?code=")[1]        
        this.setState({ code: code });
    }
    
    getToken = (e) => {
        e.preventDefault()            
        let body = {
            client_id: this.state.clientId,
            client_secret: this.state.clientSecret,
            redirect_uri: this.state.redirectURI,
            code: this.state.code
        }
        let uri = 'https://api.betaseries.com/oauth/access_token'
        Axios.post(`${uri}`, body)
            .then(res => { 
                localStorage.setItem('token', res.data.access_token)
                console.log(res)
                this.setState({ isFetching: true})
                this.props.history.push('/my-shows');
                window.location.reload();
            })            
            .catch(err => console.log(err.response))
    }

    popUp () {        
        return(
            <div className="popup">                
                <span className="home__header--primary">Previously
                    <span className="first">O</span><span className="second">n</span>
                </span> 
                <div>                
                    <button 
                        className="btn-login"
                        onClick={this.getToken}
                    >Discover Shows</button>
                </div>                            
            </div>
        )            
    }          
    render() {         
        return (             
            <div className="section-login">
                {!this.state.isFetching ? this.popUp() : null}                                
            </div>
        );
    }
}
 
export default Login;