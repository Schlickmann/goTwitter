const express = require('express');

//Modulo de rotas do express
const routes = express.Router();

const TweetController = require('./controllers/TweetController');
const LikeController = require('./controllers/LikeController');

//buscando informação usando método index do TweetController
routes.get('/tweets', TweetController.index);

//gravando informação usando método store do TweetController
routes.post('/tweets', TweetController.store);

//rota para likes
routes.post('/likes/:tweet_id', LikeController.store);

module.exports = routes;