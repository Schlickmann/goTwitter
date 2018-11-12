import axios from 'axios';

//---------Porque android cria VM--------
//para o android usar baseURL: http://10.0.2.2:3000
//se estiver usando o genymotion usar baseURL: http://10.0.3.2:3000
const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export default api;