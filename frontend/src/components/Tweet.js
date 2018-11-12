import React, {Component} from 'react';

import api from '../services/api';
import like from '../like.svg';
import './Tweet.css';

class Tweet extends Component {

    handleLike = async (ev) => {
        const { _id } = this.props.tweet;

        await api.post(`likes/${_id}`);
    }

    render() {
        const { tweet } = this.props;
        return (
            <li className='tweet'>
                <strong>{tweet.author}</strong>
                <p>{tweet.content}</p>
                <button type='button' onClick={this.handleLike}>
                    <img src={like} />
                    {tweet.likes}
                </button>
            </li>
        );
    }
    
};


export default Tweet;