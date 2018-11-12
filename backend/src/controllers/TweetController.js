const Tweet = require('../models/Tweet');


// contém os métodos que precisam ser executados quando acessamos algumas rotas.
module.exports = {
    async index(req, res) {
        //metodo find() do mongoose permite realizar filtros etc...
        //sort permite ordenar a exibição dos dados default é ASC para fazer DESC usa o sinal de menos (-)
        const tweets = await Tweet.find({  }).sort('-createdAt');

        return res.json(tweets);
    },
    async store(req, res) {
        const tweet = await Tweet.create(req.body);

        //avisa todos conectados que existe alteração.
        //emit envia um evento chamado 'tweet'
        req.io.emit('tweet', tweet);
        return res.json(tweet);
    }
};