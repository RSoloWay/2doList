import React from 'react';
import './Login.css'



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {usersData: JSON.parse(localStorage.getItem('usersData'))}
        this.props = props;
    }

    login = (e) => {
        e.preventDefault();
        
        //let ask = window.confirm('You are trying to delete all tasks!\r\nAre You sure?')

        let userName = document.querySelector('.login_input').value;
        let userPass = document.querySelector('.password_input').value;

        if(this.state.usersData[userName]){
            console.log('Пользователь найден')
            if(this.state.usersData[userName]['password'] == userPass){
                console.log('Пароль верный - можно пропускать!');
                this.props.updateData(userName)
            } else {
                document.getElementsByClassName("error_output")[0].textContent = 'Wrong password!'
                console.log('Введен не верный пароль')
            }
        } else {
            document.getElementsByClassName("error_output")[0].textContent = 'This user not exists!'
            console.log('Польщователь не найден')
        }

        //this.props.updateData(value)
    }

    registration = (e) => {
        e.preventDefault();
        
        let userName = document.querySelector('.login_input').value,
            userPass = document.querySelector('.password_input').value,
            newUsersData = this.state.usersData;
        
        if(!this.state.usersData[userName] && userName != '' && userPass != ''){
            console.log('можно регистрировать этого пользователя')
            newUsersData[userName] = {
                'login': userName,
                'password': userPass,
                'tasks': []
            }
            localStorage.setItem('usersData', JSON.stringify(newUsersData));
            this.props.updateData(userName);
        } else if(this.state.usersData[userName]) {
            document.getElementsByClassName("error_output")[0].textContent = 'A user with this name already exists! Try another login!'
            console.log('такой пользователь уже есть!!!')
        } else if(userName == ''|| userPass == '') {
            document.getElementsByClassName("error_output")[0].textContent = 'You did not enter all the data!'
            console.log('введите все данные')
        }
    }

    forgotenPass = (e) => {
        let target = e.target;
        target.textContent = 'Relax and try to remember your password!:)'
    }

    render() {

        return (
            <form className="login">
                <h3 className="error_output"></h3>
                <label className='input_holder'>
                    <h5>Login:</h5>
                    <input className='login_input' placeholder='Enter login...'></input>
                </label>
                <label className='input_holder'>
                    <h5>Password:</h5>
                    <input className='password_input' type='password' placeholder='Enter password...'></input>
                </label>
                <div className='confirm_panel'>
                    <button onClick={this.login} className='login_confirm'>Login</button>
                    <button onClick={this.registration} className='reg_confirm'>Registration</button>
                </div>
                <h5 className='forgoten_pass' onClick={this.forgotenPass}>Forgot your password?</h5>
            </form>
        )
    }
}


export default Login;