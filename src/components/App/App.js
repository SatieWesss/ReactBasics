import React from 'react';
import TaskList from '../TaskList/TaskList';
import { Typography, CssBaseline } from '@material-ui/core';

export default class App extends React.Component {

      render () {
        return (
          <React.Fragment>
          <CssBaseline />
            <Typography 
                component="span" 
                className="typography"
                style={{  
                        margin: '50px 0 0 0 ',
                        height: 'auto',
                        borderRadius:"5px",
                      }}>
              <TaskList />
            </Typography>        
        </React.Fragment>
        )
      }
}