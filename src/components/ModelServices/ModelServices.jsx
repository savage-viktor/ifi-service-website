import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import { GetModels } from '../../services/ModelsAPI';

function ModelServices({ modelName }) {
  const [status, setStatus] = useState('idle');
  const [model, setModel] = useState(false);

  useEffect(() => {
    setStatus('loading');

    GetModels()
      .then(models => {
        models.map(model => {
          if (model.model === modelName) {
            return setModel(model);
          }
          return 0;
        });
        setStatus('idle');
      })
      .catch(error => {
        setStatus('error');
      });
  }, [modelName]);

  return (
    <>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {model && (
        <>
          <table className="model-table" rules="all">
            <colgroup>
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td>Тип пристрою</td>
                <td>{model.details.type}</td>
              </tr>
              <tr>
                <td>Тип SIM карти</td>
                <td>{model.details.typeOfSim}</td>
              </tr>
              <tr>
                <td>Розмір, мм</td>
                <td>{model.details.size}</td>
              </tr>
              <tr>
                <td>Акумулятор</td>
                <td>{model.details.battery}</td>
              </tr>
              <tr>
                <td>Підтримка частот 4G</td>
                <td>{model.details.bands}</td>
              </tr>
              <tr>
                <td>Антенний роз'єм</td>
                <td>{model.details.antena}</td>
              </tr>
              <tr>
                <td>Wi-Fi</td>
                <td>{model.details.wifi}</td>
              </tr>
              <tr>
                <td>Тип мобільної мережі</td>
                <td>{model.details.mobileNetwork}</td>
              </tr>
            </tbody>
          </table>
          <div className="model-image-container">
            <img className="model-image" src={model.image} alt={model.model} />
          </div>

          <div className="model-services-container">
            <h2 id="model-services-list" className="model-services-title">
              Список послуг щодо цієї моделі
            </h2>

            <ul className="filter-button-list">
              {model.services.map(service => {
                return (
                  <li key={service.label} className="filter-button-item">
                    <a
                      className="filter-button"
                      id={service.label}
                      href={
                        service.isPage
                          ? `${model.model.split(' ').join('').toLowerCase()}_${
                              service.page
                            }.html`
                          : '#model-services-list'
                      }
                    >
                      {service.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default ModelServices;
