import React from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';
import AddButton from '../AddButton/AddButton';
import {apiKey, userId} from '../../config';
import axios from 'axios';
import './task-list.css'


export default class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    state = {
        tasks: []
    }

    componentDidMount () {
        this.getAllTasks();
    }

    getAllTasks = async () => {
        try {
            const allData = await axios.get(`https://api.wo.softberg.org/?action=task_getAll&userId=${userId}&apiKey=${apiKey}`)
            this.setState({
                tasks: allData.data.data
            })
        }
        catch {
            alert(Error, 'OOPS! An error ocured in get_all_tasks_api')
            
        }
    }

    onMarkedDone = async (element) => {
        const status = 'success';
        try {
            await axios.put(`https://api.wo.softberg.org/?action=task_changeStatus&taskId=${element.task_id}&userId=${userId}&status=${status}&apiKey=${apiKey}`)
            this.getAllTasks();
        }
        catch { 
            alert(Error,'OOPS! An error ocured in change_status_api')
        }
    }
    onItemEdit = (element) => {
        this.child.current.editTask(element);
    }
    onItemDeleted = async (task_id) => {
        try {   
            await axios.delete(`https://api.wo.softberg.org/?action=task_delete&taskId=${task_id}&userId=${userId}&apiKey=${apiKey}`)
            this.getAllTasks();
        }
        catch {
            alert(Error, 'OOPS! An error ocured in delete_task_api')
        }    
    }

    render () {
        const {tasks} = this.state;
        const items = tasks.map((el, index)=>
            <li key={el.task_id}>
                <TaskListItem 
                    element={el}
                    index={index}
                    onItemDeleted={this.onItemDeleted}
                    onItemEdit={this.onItemEdit}
                    onMarkedDone={this.onMarkedDone}
                />
            </li>
        )

        return (
            <div className="task-list">
                <div className="list-header">
                    <h1 className="title">
                    <i className="fa fa-tasks" style={{background:'none'}}/>
                        Task List
                    </h1>
                    <AddButton ref={this.child} getAllTasks={this.getAllTasks}/>
                </div>
                <ul className="list-group"> {items} </ul>
            </div>
        )
    }
};
