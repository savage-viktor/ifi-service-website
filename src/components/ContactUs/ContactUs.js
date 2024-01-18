import { useState } from 'react';
import Form from './Form/Form';
import Overlay from './Overlay/Overlay';
import Loader from '../Loader/Loader';
import { SubmitMessage } from '../../services/ContactUsAPI';

function ContactUs() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (name, phone, email, message) => {
    setStatus('loading');
    const SubmitForm = { name, phone, email, message };

    SubmitMessage(SubmitForm)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        setStatus('error');

        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      })
      .then(task => {
        setStatus('success');

        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      })
      .catch(error => {
        // handle error
        setStatus('error');

        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />

      {status === 'loading' && (
        <Overlay type="loading">
          <Loader />
        </Overlay>
      )}
      {status === 'success' && (
        <Overlay type="success" message="Повідомлення надіслано" />
      )}
      {status === 'error' && (
        <Overlay type="error" message="Помилка відправки повідомлення" />
      )}
    </>
  );
}

export default ContactUs;
