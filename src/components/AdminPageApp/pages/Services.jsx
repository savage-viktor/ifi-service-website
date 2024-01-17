import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { GetServices } from '../../../services/ServicesAPI';

import {
  SubmitService,
  DeleteService,
  EditService,
} from '../../../services/ServicesAPI';

import Loader from '../../Loader/Loader';
import Error from '../../Error/Error';

const initService = {
  page: '',
  label: '',
  isPage: false,
};

function Services() {
  const [status, setStatus] = useState('idle');
  const [services, setServices] = useState(false);

  useEffect(() => {
    setStatus('loading');
    GetServices()
      .then(result => {
        setServices(result);
        setStatus('idle');
      })
      .catch(error => {
        console.log(error.message);
        setStatus('error');
      });
  }, []);

  const handleSubmit = values => {
    SubmitService(values);
  };

  const handleDeleteService = async id => {
    DeleteService(id);
  };

  // const handleEditService = service => {
  //   setEditService(service);
  // };

  return (
    <div>
      Сервісні послуги
      <Formik
        // validationSchema="erg"
        initialValues={initService}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <Field name="label" placeholder="Послуга" />
          <Field name="page" placeholder="Сторінка" />
          <button type="submit">Додати послугу</button>
        </Form>
      </Formik>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {services &&
        services
          .sort((firstService, secondService) =>
            firstService.label.localeCompare(secondService.label)
          )
          .map(service => {
            return (
              <div>
                {service.label} {service.page}{' '}
                {/* <button
                  onClick={() => {
                    handleEditService(service);
                  }}
                  type="button"
                >
                  Ред
                </button> */}
                <button
                  onClick={() => {
                    handleDeleteService(service.id);
                  }}
                  type="button"
                >
                  Видал
                </button>
              </div>
            );
          })}
    </div>
  );
}
export default Services;
