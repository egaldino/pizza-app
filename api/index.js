import axios from './instance';

export const postRodizio = (rodizio) => axios.post('/cadastrar', rodizio);

export const getRodizios = () => axios.get('/listar');
