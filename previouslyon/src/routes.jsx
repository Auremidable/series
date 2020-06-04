import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './HOC/Layout/Layout';

import Login from './components/login/Login';
import Home from './components/Home/Home';
import AllShows from './components/allShows/AllShows';
import MyShows from './components/myShows/MyShows';
import Show from './components/show/Show';
import EpisodeDetails from './components/EpisodeDetails/EpisodeDetails';
import NotFound from './components/NotFound/NotFound';

class Routes extends Component {
        
    render() { 
        return ( 
            <Layout route={this.props}>
                <Switch>
                    <Route path="/show-episode/:id" component={ EpisodeDetails } />  
                    <Route path="/show/:id" component={ Show } />           
                    <Route path="/all-shows" component={ AllShows } />
                    <Route path="/my-shows" component={ MyShows } />
                    <Route path="/login" component={ Login } />
                    <Route path="/" exact component={ Home }/>
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        );
    }
}
 
export default Routes;