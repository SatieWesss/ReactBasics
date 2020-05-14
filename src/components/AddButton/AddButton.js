import 'date-fns';
import React from 'react';
import {Dialog,DialogActions,DialogContent,Input,Button} from '@material-ui/core';
import {Radio,RadioGroup,FormControlLabel,FormControl,Switch,TextField } from '@material-ui/core';

import {userId,apiKey} from '../../config';
import axios from'axios';
import './add-button.css'

export default class AddButton extends React.Component {
 
  state = {
      title: '',
      description:'',
      priority: 'low',
      dueDate: 0,
      status: '',
      accessibility: 'private',
      accessibilityValue: true,
      dialogIsOpen: false,
      isEdit: false,
      task_id: null,
      checkedDate: false,
      checkedOnGoing: false,
      selectedDate: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]
  }

  clearDialogContent = () => {
    this.setState({
      accessibility : 'private',
      title: '',
      description: '',
      accessibilityValue: true,
      status: '',
      priority: 'low',
    })
  }
    
  handleChangeSwitch = (event) => {
    this.setState({ accessibilityValue : event.target.checked });
    this.setState({ accessibility : this.state.accessibilityValue ? 'public' : 'private' });
  };
  
  onPriorityChange= (e) => {
    this.setState({
      priority: e.target.value
    })
  };
   
  onTitleChange =(e) => {
    this.setState({
        title: e.target.value
    })
  };
  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    })    
  }

  handleClickOpen = () => {
    this.setState({
      dialogIsOpen: true
    }) 
  };

  handleClose = () => {
    this.setState({
      dialogIsOpen: false,
      isEdit: false
    }, 
    this.clearDialogContent()
  )};

  editTask = (task) => {
    this.setState({ 
      isEdit: true,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      accessibility: task.accessibility,
      dueDate: task.dueDate,
      task_id: task.task_id,
      accessibilityValue: task.accessibility === 'public' ? false : true,
    })
    this.handleClickOpen()
  }

  createButton = async () => {
    let { title, description, priority, dueDate, status, accessibility, task_id } = this.state;
    title = title.trim();
    description = description.trim();

    if( title.trim() !== '' &&  description !== '') {
      if(this.state.isEdit) {
        try {
          await axios.put(`https://api.wo.softberg.org/?action=task_update&apiKey=${apiKey}&taskId=${task_id}&userId=${userId}&title=${title}&description=${description}&dueDate=${dueDate}&status=${status}&accessibility=${accessibility}&priority=${priority}`)
          this.props.getAllTasks();
          this.handleClose();
        }

        catch {
          alert(Error, 'OOPS! An error ocured in update_task_api')
        }
      }

      else {
        try {
          await axios.post(`https://api.wo.softberg.org/?action=task_create&userId=${userId}&apiKey=${apiKey}&title=${title}&description=${description}&priority=${priority}&dueDate=${dueDate}&accessibility=${accessibility}&status=${status}`);
          this.props.getAllTasks();
          this.handleClose();
        }

        catch {
          alert(Error, 'OOPS! An error ocured in create_task_api')
        }
      }
    }
  }
  
  onDateChange = (date) => {
    this.setState({
      selectedDate:date,
    })  
}
  onDueDateCLick = () => {
    this.setState({
      checkedDate: true,
      checkedOnGoing:false,
      status:"hold"
    })
  }

  onGoingClick = () => {
    this.setState({
      checkedOnGoing: true,
      checkedDate: false,
      status:"ongoing"
    })
  }
  
  render () {
    return (
        <div>
          <Button 
            className="add-button" 
            onClick={this.handleClickOpen}>
            Add New Tasks
          </Button>
          <Dialog 
              open={this.state.dialogIsOpen} 
              onClose={this.handleClose} 
              aria-labelledby="form-dialog-title"
              className="dialog">
            <DialogContent className="dialog-content">
            <h3>
              New Task
            </h3>
            <form onSubmit = {this.handleClose} className="form">
                <Input
                    type="text"
                    defaultValue={this.state.title}
                    autoFocus
                    margin="dense"
                    id="name"
                    placeholder="Title"
                    onChange = {this.onTitleChange}
                    className="textfield"
                    disableUnderline
                    required
                />
                <TextField
                    id="standard-multiline-flexible" 
                    placeholder="Description"
                    defaultValue={this.state.description}
                    className="textfield"
                    multiline
                    rowsMax={4}
                    onChange={this.onDescriptionChange}
                    InputProps={{ disableUnderline: true }}
                    style={{
                      marginTop:"20px",
                      borderBottom:"none",
                      height: "90px",
                    }}
                />
                <div className="switch-group">
                    <FormControl component="fieldset" className="form-control">
                        <RadioGroup 
                            aria-label="priority" 
                            name="priority" 
                            value={this.state.priority} 
                            onChange={this.onPriorityChange}
                            className="radio-group"
                        >
                            <FormControlLabel 
                                value="low" 
                                control={<Radio color="primary"/>} 
                                label="Low" 
                            />

                            <FormControlLabel 
                                value="mid" 
                                control={<Radio color="primary"/>} 
                                label="Mid" 
                            />

                            <FormControlLabel 
                                value="high" 
                                control={<Radio color="primary"/>} 
                                label="High" 
                            />
                        </RadioGroup>

                        <RadioGroup 
                            aria-label="due-date" 
                            name="due-date" 
                            className="radio-group"
                            id="rrr"
                            value={this.state.status}
                        >
                            <FormControlLabel 
                                value="ongoing" 
                                control={<Radio color="primary"/>} 
                                label="On Going" 
                                onChange={this.onGoingClick}
                                
                            />
                            <FormControlLabel 
                                value="hold" 
                                control={<Radio color="primary"/>} 
                                label="Due Date" 
                                className="due-date"
                                onChange={this.onDueDateCLick}
                                
                            />
                             <div className={this.state.checkedDate ? 'date-picker' : 'no-date'}>
                                <TextField
                                  id="datetime-local"
                                  label="Deadline"
                                  type="datetime-local"
                                  defaultValue={this.state.selectedDate}
                                  onChange={this.onDateChange}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                             </div>
                        </RadioGroup>
                    </FormControl>
                    <div className='switcher'>
                        <span> Public </span>
                        <Switch
                            checked={this.state.accessibilityValue}
                            onChange={this.handleChangeSwitch}
                            color="primary"
                            name="accessibilityValue"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <span> Private </span>
                    </div>
              </div>
              <DialogActions className="dialog-actions">
                  <Button 
                      onClick={this.createButton} 
                      color="primary" 
                      classes={{label:'create-button'}}
                  >
                     { this.state.isEdit ? 'UPDATE' : 'CREATE' }
                  </Button>
              </DialogActions>
          </form> 
          </DialogContent>
        </Dialog>
      </div>    
    )
  }
}