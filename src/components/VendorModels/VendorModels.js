import { useState, useEffect } from 'react';

import ModelsList from './ModelsList';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import { GetModels } from '../../services/ModelsAPI';

function VendorModels({ vendorName }) {
  const [status, setStatus] = useState('idle');
  const [models, setModels] = useState(false);

  useEffect(() => {
    setStatus('loading');

    GetModels()
      .then(models => {
        setModels(models);
        setStatus('idle');
      })
      .catch(error => {
        console.log(error.message);
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
