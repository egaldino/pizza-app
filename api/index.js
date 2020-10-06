import apiConfig from '../api.json';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const postRodizio = (listaParticipantes) => {
  return fetch(`${apiConfig.API_URL}/cadastrar`, {
    method: 'POST',
    body: JSON.stringify({listaParticipantes}),
    headers: defaultHeaders,
  });
};

export const getRodizios = () => {
  return fetch(`${apiConfig.API_URL}/listar`, {
    method: 'GET',
    headers: defaultHeaders,
  });
};
