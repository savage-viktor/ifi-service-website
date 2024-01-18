import { BACKEND } from './config';

const ENDPOINT = 'models';

export const GetModels = async () => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  });

  const models = await response.json();
  return models;
};
