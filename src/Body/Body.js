import React from 'react';
import './Body.css';


class Body extends React.Component {

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
        this.state = {localTasks: localStorage.getItem('tasks'), localIsDone: localStorage.getItem('isDone'), localIcon: localStorage.getItem('icon')}
    }  


    click = (e) => {
        e.preventDefault();

        let tasks = [],
            getLocalTasks = this.state.localTasks,
            isDone = [],
            getLocalIsDone = this.state.localIsDone,
            icon = [],
            getLocalIcon = this.state.localIcon,

            taskValue = document.querySelector('.task')
            

        if (getLocalTasks !== null) {
            tasks = getLocalTasks.split('!next!')
            isDone = getLocalIsDone.split(', ')
            icon = getLocalIcon.split(', ')
        }

        if (taskValue.value !== '') {
            tasks.push(taskValue.value)
            isDone.push('active')
            icon.push('far fa-square check-square')
            localStorage.setItem('tasks', tasks.join('!next!'))
            localStorage.setItem('isDone', isDone.join(', '))
            localStorage.setItem('icon', icon.join(', '))
            document.querySelector('.task').value = '';
        }



        this.setState({localTasks: localStorage.getItem('tasks'), localIsDone: localStorage.getItem('isDone'), localIcon: localStorage.getItem('icon')})
    }   
    
    clear(e) {
        e.preventDefault();
        
        let ask = window.confirm('You are trying to delete all tasks!\r\nAre You sure?')

        if(ask) {
            localStorage.removeItem('isDone');
            localStorage.removeItem('tasks');
            this.setState({localTasks: localStorage.getItem('tasks')});
        }

    }

    isDone = (e) => {
        let zzz = document.querySelectorAll('.check-square'),
            getLocalIsDone = this.state.localIsDone.split(', '),
            getLocalIcon = this.state.localIcon.split(', '),
            target = e.target

        

        for(let i=0; i < zzz.length; i++) {
            if(target === zzz[i]) {
                getLocalIsDone[i] = 'done';
                getLocalIcon[i] = 'far fa-check-square check-square'
                break
            }
        }

        localStorage.setItem('isDone', getLocalIsDone.join(', '));
        localStorage.setItem('icon', getLocalIcon.join(', '));
        this.setState({localIsDone: localStorage.getItem('isDone'), localIcon: localStorage.getItem('icon')});
    }

    render() {
        
        let x = [],
            y = [],
            z = [];
        if (this.state.localTasks !== null) {
            x = this.state.localTasks.split('!next!');
            y = this.state.localIsDone.split(', ');
            z = this.state.localIcon.split(', ');
        }
        const listTask = x.map((d, i) => <p className={y[i]} key={i}>
            {d}
            <i className="fas fa-thumbtack marker"></i>
            <i onClick={this.isDone} className={z[i]}></i>
        </p>);

        return (
            <div id='main'>
                <form>
                    <input className='task' placeholder='Enter a new task...'></input>
                    <button onClick={this.click} className='confirm_task'><i className="fa fa-plus"></i></button>
                </form>
                <div className='task-list_wrapper'>
                    <div id='task-list'>{listTask}</div>
                </div>    
                <button className='cleaner' onClick={this.clear}>Clean All</button>
            </div>
        )
    }

}


export default Body