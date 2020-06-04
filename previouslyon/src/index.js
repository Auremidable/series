import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { BrowserRouter } from 'react-router-dom'

import Route from './routes';

const App = () => {
    return ( 
        <BrowserRouter>
            <Route />
        </BrowserRouter>
    );
}
 
export default App;


ReactDOM.render(<App />, document.getElementById('root'));

