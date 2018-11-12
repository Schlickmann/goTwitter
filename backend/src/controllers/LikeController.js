const Tweet = require('../models/Tweet');

module.exports = {
    async store(req, res) {
        // pega informações da url usando req.params.NOME
        const tweet = await Tweet.findById(req.params.tweet_id);

        //set é usado para atualizar informação no database
        tweet.set({ likes: tweet.likes + 1 });
        
        //realiza a gravação da alteração
        await tweet.save();

        //avisa todos conectados que existe alteração.
        //emit envia um evento chamado 'like'
        req.io.emit('like', tweet);

        return res.json(tweet);
    }
}