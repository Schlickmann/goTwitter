import axios from 'axios';

//criando link do front com o back
//url padrao da aplicação
const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export default api;