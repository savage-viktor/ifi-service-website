import { useState, useEffect } from 'react';

import ModelsList from './ModelsList';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

function VendorModels({ vendorName }) {
  const [status, setStatus] = useState('idle');
  const [models, setModels] = useState(false);

  useEffect(() => {
    setStatus('loading');
    fetch('https://6519e0a5340309952f0cc472.mockapi.io/api/ifiservice/Models', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        setStatus('error');
      })
      .then(tasks => {
        setModels(tasks);
        setStatus('idle');
      })
      .catch(error => {
        setStatus('error');
      });
  }, []);

  const filteredModels = models
    ? models
        .filter(
          model => model.vendor.toLowerCase() === vendorName.toLowerCase()
        )
        .sort((firstModel, secondModel) =>
          firstModel.model.localeCompare(secondModel.model)
        )
    : '';

  return (
    <>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {models && <ModelsList models={filteredModels} />}
    </>
  );
}

export default VendorModels;
