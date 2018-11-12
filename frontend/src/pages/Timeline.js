import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import Tweet from '../components/Tweet.js';
import TwitterLogo from '../twitter.svg';
import './Timeline.css';

export default class Timeline extends Component {
    state = {
        newTweet: '',
        tweets: []
    }

    async componentDidMount() {
        this.subscribeToEvents();
        const response = await api.get('tweets');

        this.setState({ tweets: response.data });
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:3000');

        //fica ouvindo a ocorrencia desses eventos
        io.on('tweet', data => {
            //spread operator (...)
            //conceito de imutabilidade nao usar .push em arrays.
            this.setState({ tweets: [data, ...this.state.tweets] });
        });

        io.on('like', data => {
            //atualiza só o tweet necessário.
            this.setState({ tweets:  this.state.tweets.map(tweet => 
                tweet._id === data._id ? data : tweet
            )})
        });
    }

    handleInputChange = (ev) => {
        this.setState({ newTweet: ev.target.value });
    }

    //async torna funcao assincrona
    handleNewTweet = async (ev) => {
        if(ev.keyCode !== 13) return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username');

        //cria novo tweet
        // envia requisicao passando rota e objeto contendo dados a ser enviado.
        await api.post('tweets', { content, author });
        
        //limpando estado do newTweet.
        this.setState({ newTweet: '' });
    }
    
    render() {
        return (
            <div className='timeline-wrapper'>
                <img height={24} src={TwitterLogo} alt='twitter' />
                <form>
                    {/* onKeyDown evento chamado toda vez que usuario aperta uma tecla. */}
                    <textarea 
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder='share what you are thinking...'
                    />
                </form>
                <ul className='tweet-list'>
                    {this.state.tweets.map(tweet => {
                        return <Tweet key={tweet._id} tweet={tweet} />
                    })}
                </ul>
                
            </div>
        );
    }
}