import axios from './instance';

export const postRodizio = (listaParticipantes) =>
  axios.post('/cadastrar', {listaParticipantes});

export const getRodizios = () => axios.get('/listar');
