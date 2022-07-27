
import './App.css';
import { NewTaskBar, TaskTable } from './components/Overview';
import * as uuid from "uuid";
import React, { Component } from "react";

class App extends Component {
  constructor(){
    super();

    this.state = {
      task:{uuid:uuid.v4(),date:new Date().toISOString().substring(0,10),text:''},
      tasks: [],
      action:"Add Task"
    };
    this.handleTaskSubmit=this.handleTaskSubmit.bind(this);
    this.handleTaskCompleted = this.handleTaskCompleted.bind(this);
    this.handleTaskDateUpdate = this.handleTaskDateUpdate.bind(this);
    this.handleTaskTextUpdate = this.handleTaskTextUpdate.bind(this);
    this.handleTaskUpdates = this.handleTaskUpdates.bind(this);
  }

  handleTaskSubmit(){

      const exist = (element) => element.uuid === this.state.task.uuid;
      if(this.state.tasks.some(exist)){
        this.setState({
          tasks:this.state.tasks.map(el =>(el.uuid ===this.state.task.uuid?Object.assign({},el,this.state.task):el)),
          task:{uuid:uuid.v4(),date:new Date().toISOString().substring(0,10),text:''},
          action:"Add Task"
    
        });

      }else{
        this.setState({
          tasks: [...this.state.tasks,this.state.task],
          task:{uuid:uuid.v4(),date:new Date().toISOString().substring(0,10),text:''},
          action:"Add Task"
    
        });

      }

    

  }

  handleTaskCompleted(uuid){
    this.setState({
      tasks: this.state.tasks.filter(function(task) { 
        return task.uuid !== uuid
    }

      )
    });
  }

  handleTaskTextUpdate(text){
      this.setState({
        task:{
          text:text,
          date:this.state.task.date,
          uuid:this.state.task.uuid
        }
      });
  }

  handleTaskDateUpdate(date){
    this.setState({
      task:{
        text:this.state.task.text,
        date:date,
        uuid:this.state.task.uuid
      }
    });
  }


  handleTaskUpdates(uuid){
    this.state.tasks.forEach(task => {
      if(task.uuid === uuid){
        this.setState({
          task:{
            text:task.text,
            date:task.date,
            uuid:task.uuid
          },
          action:"Update Task"
        });
      }
      
    });

  }

  render() {
  
    return <div>
            <NewTaskBar
            task={this.state.task}
            onTextSubmit={this.handleTaskSubmit}
            onTextUpdate = {this.handleTaskTextUpdate}
            onDateUpdate = {this.handleTaskDateUpdate}
            action ={this.state.action}
            />
           
            <TaskTable
            tasks = {this.state.tasks}
            onCompleted = {this.handleTaskCompleted}
            onUpdate = {this.handleTaskUpdates}
            />
          </div>;
  }
}

export default App;