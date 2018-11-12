import React, { Component } from 'react';

import TwitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {
    
    state = {
        username: '',
    };

    handleInputChange = (ev) => {
        this.setState({ username: ev.target.value });
    }

    handleSubmit = (ev) => {
        //evita que redirecione para outra pagina ~reload~
        ev.preventDefault();

        const { username } = this.state;

        if (!username.trim()) return;

        //acessa o armazenamento local do navegador e salva informação la dentro
        localStorage.setItem('@GoTwitter:username', username);
        
        //history push vem do componente react-router-dom
        this.props.history.push('/timeline');

    } 

    render() {
        return (
            <div className='login-wrapper'>
                <img src={TwitterLogo} alt="twitter" />
                <form onSubmit={this.handleSubmit}>
                    <input 
                        placeholder='Username'
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                    <button type='submit'>Access</button>
                </form>
            </div>
        );
    }
}