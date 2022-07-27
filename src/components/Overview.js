
import React, { Component } from "react";

import './Overview.css';

class NewTaskBar extends Component{
    constructor (props){
        super(props);
        this.handleTaskSubmition = this.handleTaskSubmition.bind(this);
        this.handleTaskDateUpdate = this.handleTaskDateUpdate.bind(this);
        this.handleTaskTextUpdate = this.handleTaskTextUpdate.bind(this);
    }
    handleTaskSubmition(e){
        e.preventDefault();
        this.props.onTextSubmit();
        document.getElementById('task_text').value='';
        document.getElementById("task_date").valueAsDate = new Date();
    }

    handleTaskTextUpdate(e){
        e.preventDefault();
        this.props.onTextUpdate(e.target.value);
    }
    handleTaskDateUpdate(e){
        e.preventDefault();
        this.props.onDateUpdate(e.target.value);

    }

    render(){

        return(
            <form>
                <input
                    type="text"
                    id="task_text"
                    placeholder=" Task ..."
                    value = {this.props.task.text}
                    onChange = {this.handleTaskTextUpdate}
                    
                />
                <input
                    type="date"
                    id="task_date"
                    value = {this.props.task.date}
                    onChange= {this.handleTaskDateUpdate}
                />
                <button
                onClick={this.handleTaskSubmition}
                >
                    {this.props.action}
                </button>
                
            </form>
        );
    }
}


class TaskRow extends Component{
    constructor(props){
        super(props);


    this.handleTaskCompleted = this.handleTaskCompleted.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    }

    handleTaskCompleted(e){
        e.preventDefault();
        this.props.onCompleted(e.target.id);
    }
    

    handleUpdateTask(e){
        e.preventDefault();
        this.props.updateTask(e.target.getAttribute('data-id'));
        
                


    }


    render(){
        return(
            <tr id={"row_" + this.props.task_key}>
                <td>{this.props.task_date}</td>
                <td>{this.props.task_text}</td>
                <td> 
                    <button data-id={this.props.task_key} onClick={this.handleUpdateTask}>Update</button>
                </td>
                <td> 
                    <button id={this.props.task_key} onClick={this.handleTaskCompleted}>Comleted</button>
                </td>

            </tr>

        );


    }

}



class TaskTable extends Component{
    constructor(props){
        super(props);

        this.handleTaskCompleted = this.handleTaskCompleted.bind(this);
        this.handleTaskUpdate = this.handleTaskUpdate.bind(this);

    }

    handleTaskCompleted(uuid){
        this.props.onCompleted(uuid);
    }

    handleTaskUpdate(uuid){
        this.props.onUpdate(uuid);
    }


   
    render(){
        let display = [];
        this.props.tasks.forEach((task) =>{

            display.push(<TaskRow
                task_key = {task.uuid}
                task_date = {task.date}
                task_text = {task.text}
                onCompleted = {this.handleTaskCompleted}
                updateTask = {this.handleTaskUpdate}
            />)

        });


        return(<table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Task</th>
                <th></th>
                <th></th>

              </tr>
            </thead>
            <tbody>{display}</tbody>
          </table>);

    }
}

export{NewTaskBar,TaskTable};