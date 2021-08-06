import React from 'react';
import './Body.css';
import Login from '../Login/Login';

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
        {/*this.state = {localTasks: localStorage.getItem('tasks'), localIsDone: localStorage.getItem('isDone'), localIcon: localStorage.getItem('icon')}*/}
        if(localStorage.getItem('usersData') == null) {
            // localStorage.setItem('usersData', JSON.stringify({'SoloWay':{'login': 'SoloWay', 'password': 'srv', 'tasks': [{'task_content': 'Создать 2Dos', 'status': 'active', 'seed': '1234567890'}]}}));
            localStorage.setItem('usersData', JSON.stringify({}));
        }
        this.filter = "all"
        this.state = {usersData: JSON.parse(localStorage.getItem('usersData')), currentUser: localStorage.getItem('currentUser')};
    }  


    click = (e) => {
        e.preventDefault();

        let newUsersData = this.state.usersData,
            newTask = {},
            taskValue = document.querySelector('.task').value;

        //newUsersData[this.state.currentUser]['tasks']

        if(taskValue !== '') {
            newTask = {
                'task_content': taskValue,
                'status': 'active',
                'seed': new Date().getTime()
            }
            newUsersData[this.state.currentUser]['tasks'].push(newTask);
            localStorage.setItem('usersData', JSON.stringify(newUsersData));
            document.querySelector('.task').value = '';
            this.setState({usersData: JSON.parse(localStorage.getItem('usersData')), currentUser: localStorage.getItem('currentUser')});
        }
    }   
    
    updateData = (value) => {
        localStorage.setItem('currentUser', value)
        this.setState({usersData: JSON.parse(localStorage.getItem('usersData')), currentUser: localStorage.getItem('currentUser')})
    }

    clear(e) {
        e.preventDefault();

        let newUsersData = this.state.usersData;
        newUsersData[this.state.currentUser]['tasks'] = [];
        localStorage.setItem('usersData', JSON.stringify(newUsersData));
        this.setState({usersData: JSON.parse(localStorage.getItem('usersData')), currentUser: localStorage.getItem('currentUser')});
    }

    delete = (e) => {
        e.preventDefault();

        let target = e.target,
            newUsersData = this.state.usersData,
            currUser = this.state.currentUser;             

        newUsersData[this.state.currentUser]['tasks'].forEach(function callback(element, i) {
            if(element['seed'] == target.parentElement.id){
                newUsersData[currUser]['tasks'].splice(i,1);
            }
        });
        
        localStorage.setItem('usersData', JSON.stringify(newUsersData));
        this.setState({usersData: JSON.parse(localStorage.getItem('usersData')), currentUser: localStorage.getItem('currentUser')});
    }

    isDone = (e) => {

        let target = e.target,
            newUsersData = this.state.usersData;

        newUsersData[this.state.currentUser]['tasks'].forEach(element => {
            if(element['seed'] == target.parentElement.id && element['status'] == 'active'){
                element['status'] = 'done';
            } else if(element['seed'] == target.parentElement.id && element['status'] == 'done') {
                element['status'] = 'active';
            }
        });
        
        localStorage.setItem('usersData', JSON.stringify(newUsersData));
        this.setState({usersData: JSON.parse(localStorage.getItem('usersData')), currentUser: localStorage.getItem('currentUser')});
    }

    exit = (e) =>  {
        localStorage.removeItem('currentUser');
        this.setState({usersData: JSON.parse(localStorage.getItem('usersData')), currentUser: localStorage.getItem('currentUser')});
    }

    aplyFilter = (val) => {
        let doneArr = Array(...document.getElementsByClassName('done')),
            actArr = Array(...document.getElementsByClassName('active'));

        switch(val){
            case 'all':
                doneArr.forEach(element => {
                    element.style.display = "flex"
                }) 
                actArr.forEach(element => {
                    element.style.display = "flex"
                })
                break;
            case 'done':
                doneArr.forEach(element => {
                    element.style.display = "flex"
                }) 
                actArr.forEach(element => {
                    element.style.display = "none"
                })
                break;
            case "active": 
                doneArr.forEach(element => {
                    element.style.display = "none"
                }) 
                actArr.forEach(element => {
                    element.style.display = "flex"
                })
                break;
        }
    }

    filterClick = (e) => {
        let targetName = e.target.className;



        switch(targetName) {
            case "filter_all": 
                document.getElementsByClassName('filter_active')[0].style.backgroundColor = "#7fffd4";
                document.getElementsByClassName('filter_done')[0].style.backgroundColor = "#7fffd4";
                document.getElementsByClassName('filter_all')[0].style.backgroundColor = "#61dafb";
                this.aplyFilter("all");
                this.filter = 'all';
                break;
            case 'filter_active':
                document.getElementsByClassName('filter_active')[0].style.backgroundColor = "#61dafb";
                document.getElementsByClassName('filter_done')[0].style.backgroundColor = "#7fffd4";
                document.getElementsByClassName('filter_all')[0].style.backgroundColor = "#7fffd4";
                this.aplyFilter("active");
                this.filter = 'active';
                break;
            case 'filter_done':
                document.getElementsByClassName('filter_active')[0].style.backgroundColor = "#7fffd4";
                document.getElementsByClassName('filter_done')[0].style.backgroundColor = "#61dafb";
                document.getElementsByClassName('filter_all')[0].style.backgroundColor = "#7fffd4";
                this.aplyFilter("done");
                this.filter = 'done'
                break;
        }
    }

    componentDidUpdate(){
        this.aplyFilter(this.filter);
    }

    render() {
        
        let bodyContent = null,
            icons = {
                'active': 'far fa-square check-square',
                'done': 'far fa-check-square check-square'
            }
        

        if (this.state.currentUser){

            let x = this.state.usersData[this.state.currentUser]['tasks']
            
            const listTask = x.map((d, i) => <p className={d['status']} id={d['seed']} key={i}>
                {d['task_content']}
                <i className="fas fa-thumbtack marker"></i>
                <i onClick={this.isDone} className={icons[d['status']]}></i>
                <i onClick={this.delete} className="fas fa-trash-alt"></i>
            </p>);

            bodyContent = <div id='main'>
                <form>
                    <input className='task' placeholder='Enter a new task...'></input>
                    <button onClick={this.click} className='confirm_task'><i className="fa fa-plus"></i></button>
                </form>
                <div className='task-list_wrapper'>
                <div id='task-list'>{listTask}</div>
                </div>
                <div className='filter'>
                    <button className='filter_all' onClick={this.filterClick}>All</button>
                    <button className='filter_active' onClick={this.filterClick}>Active</button>
                    <button className='filter_done' onClick={this.filterClick}>Done</button>
                </div> 
                <button className='cleaner' onClick={this.clear}>Clean All</button>
                <i onClick={this.exit} className='exit'><i className="fas fa-door-open"></i>GoOut</i>
            </div>
        } else {
            
            bodyContent = <Login updateData={this.updateData}/>
        }

        return (
            <div className='body_container'>
                {bodyContent}
            </div>
        )
    }

}


export default Body