const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//instanciando aplicação
const app = express();

// extrai o servidor HTTP criado com o express.
const server = require('http').Server(app);

//habilita que o Server ouça também o protocolo WS (WEBSOCKET)
//faz com que o server entenda aplicação real time.
const io = require('socket.io')(server);

mongoose.connect('mongodb://schlickmann:jsd121295@ds155243.mlab.com:55243/goweek-juliani', { useNewUrlParser: true });

//middleware para interceptar a requisição e adicionar informações.
app.use((req, res, next) => {
    req.io = io;

    //faz com que continue o processo
    return next();
})
//informa que outras aplicações podem usar recursos do backend.
app.use(cors());
//informa para o express que será utilizado json para as requisições.
app.use(express.json());
//usando as rotas da aplicacao definidas no arquivo routes.js
app.use(require('./routes'));

//habilita o uso do protocolo websocket alem do http.
server.listen(3000, () => {
    console.log(`Server 🤓  started on port 3000.`);
});

