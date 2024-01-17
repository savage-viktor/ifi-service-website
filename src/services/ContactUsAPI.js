import { BACKEND } from './config';

const ENDPOINT = 'contactUs';

export const SubmitMessage = async message => {
  const response = await fetch(`${BACKEND}/${ENDPOINT}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(message),
  });

  const addedMessage = await response.json();
  return addedMessage;
};
