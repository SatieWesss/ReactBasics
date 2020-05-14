import React from 'react';
import { Link } from 'react-router-dom';
import {userId} from '../../config';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './task-list-item.css';

export default class TaskListItem extends React.Component {

    render () {
        const { task_id,title, status,priority } = this.props.element;
        const checkButton = (status) =>{
            if(status==="ongoing") {
                return {name:"On going", className: "ongoing-button"}
            }else if(status==="success"){
                return {name:"Success", className: "success-button"}
            } else if (status==="hold"){
                return {name:"Pending", className: "pending-button"}
            }
            return status
        }
         
         return (
            <div className="contains">
                <span type="text" style ={{color:'white', fontWeight:'100'}}>
                    {title} 
                    <button className={checkButton(status).className}>
                        {checkButton(status).name}
                    </button>
                </span>
                <span className="buttons">
                   <span title="High priority">
                       {priority === 'high' ? <StarBorderIcon className="star-icon"/> : null}
                    </span> 
                    <button onClick={() => this.props.onMarkedDone(this.props.element)} title="Mark as done">
                        <i style={{backgroundColor:"#3fff2e88"}}
                           className= {status === 'success' ? 'markButtonNone' : 'fa fa-flag' }  
                        />
                    </button>
                    <Link to = {`/task/single/${task_id}/${userId}`}>
                        <button title="See task details">
                            <i className="fa fa-external-link" style={{backgroundColor:'#f1c500'}}/>
                        </button>
                    </Link>
                    <button onClick={() => this.props.onItemEdit(this.props.element)} title="Edit task">
                        <i className="fa fa-edit" style={{backgroundColor:'#41cac0'}} />
                    </button>
                    <button onClick={() => this.props.onItemDeleted(task_id)} title="Delete this task">
                        <i className="fa fa-trash-o" style={{backgroundColor:"red"}} />
                    </button>
                </span>
            </div>
            
        )
    }
}