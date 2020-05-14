import React from 'react';
import { Typography, CssBaseline } from '@material-ui/core';
import AccessAlarmsSharpIcon from '@material-ui/icons/AccessAlarmsSharp';
import FormatListNumberedRtlSharpIcon from '@material-ui/icons/FormatListNumberedRtlSharp';
import LockSharpIcon from '@material-ui/icons/LockSharp';
import {userId,apiKey} from '../../config';
import axios from'axios';
import './details.css'

export default class TaskDetails extends React.Component {
    
    state = {
        taskData: {}
    }

    componentDidMount () {
        this.getSingleTask()
    }

    async getSingleTask () {
        const { taskId } = this.props.match.params
        try {
            const taskData = await axios.get(`https://api.wo.softberg.org/?action=task_getSingle&userId=${userId}&taskId=${taskId}&apiKey=${apiKey}`);
            this.setState({ taskData: taskData.data.data });
        }
        catch {
            alert(Error, 'OOPS! An error ocured in get_single_task_api')
        }
    }

    render () {
        const { title,status, priority, accessibility,description } = this.state.taskData;
        return (
            <React.Fragment>
                <CssBaseline />
                <Typography 
                    className="typography"
                    component="span"
                    style={{ margin: "70px",
                        display:"flex",
                        justifyContent: "center",
                        color:"whitesmoke",
                        borderRadius: "5px",
                        height: "60vh"
                        }}
                >   
                    <div id = "details">
                        <button className={status === 'ongoing' ? 'ongoing-button' : 'success-button'}>
                            {status === 'ongoing' ? 'On Going' : 'Success'}
                        </button>
                        <div className="triangle" style={{color: status === 'success' ? '#25b918' : '#f1c500'}}></div>
                        <h2>{title}</h2>
                      
                        <div id="spa-container">
                            <div className="spa-item">
                                <span className="icon"  title="Schedule">
                                    <AccessAlarmsSharpIcon />
                                    {status}
                                </span>
                            </div>
                            <div className="spa-item">
                                <span  className="icon" title="Priority">
                                    <FormatListNumberedRtlSharpIcon/>
                                    {priority}
                                </span>
                            </div>
                            <div className="spa-item">
                                <span  className="icon" title="Accessibility" id="access">
                                    <LockSharpIcon/>
                                    {accessibility}
                                </span>
                            </div>
                        </div>
                        <div id="description">
                            {description}
                        </div>
                    </div>
                </Typography>        
            </React.Fragment>
        )
    }
};