import React from 'react';
import ReactDOM from 'react-dom';

import TaskDetails from './components/TaskDetails/TaskDetails';
import App from './components/App/App';
import {BrowserRouter, Route, Switch,} from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import './index.css'; 

const Main = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} exact/>
                <Route path="/task/single/:taskId/:userId" component={TaskDetails}/>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}
ReactDOM.render(<Main/>, document.getElementById('root'))




 
    