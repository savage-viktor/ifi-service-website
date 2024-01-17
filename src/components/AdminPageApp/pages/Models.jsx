import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Models.module.css';

import GetModels from '../../../services/GetModels';
import SubmitModel from '../../../services/SubmitModel';
import EditModel from '../../../services/EditModel';
import DeleteModel from '../../../services/DeleteModel';

import Loader from '../../Loader/Loader';
import Error from '../../Error/Error';

import ModelsList from '../components/ModelList/ModelList';

import FindInput from '../components/FindInput/FindInput';
import AddModelBtn from '../components/AddModelBtn/AddModelBtn';
import BackUpButton from '../components/BackUpButton/BackUpButton';
import RestoreButton from '../components/RestoreButton/RestoreButton';

import AddModelForm from '../components/AddModelForm/AddModelForm';
import Modal from '../components/Modal/Modal';
import ModalConfirm from '../components/ModalConfirm/ModalConfirm';
import Confirm from '../components/Confirm/Confirm';
import BackupLoader from '../components/BackupLoader/BackupLoader';

const initialModel = {
  vendor: '',
  model: '',
  image: '',
  services: [],
  details: {
    type: '',
    typeOfSim: '',
    size: '',
    battery: '',
    bands: '',
    antena: '',
    wifi: '',
    mobileNetwork: '',
  },
};

function Models() {
  const [status, setStatus] = useState('idle');
  const [models, setModels] = useState(false);
  const [model, setModel] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalConfirmText, setModalConfirmText] = useState('');
  const [modalConfirmType, setModalConfirmType] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [findModel, setFindModel] = useState('');
  const [restoreFile, setRestoreFile] = useState(null);
  const [loaderCount, setLoaderCount] = useState(0);
  const [breakRestore, setBreakRestore] = useState(false);

  const [update, setUpdate] = useState(1);

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
  }, [update]);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    setModel(false);
  };

  const handleConfirmModal = async () => {
    switch (modalConfirmType) {
      case 'delete':
        try {
          handleCloseModalConfirm();
          await DeleteModel(deleteId);
          setUpdate(prevState => prevState + 1);

          toast.success('Видалено успішно', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        } catch (error) {
          toast.error(`Помилка видалення ${error.message}`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }

        break;

      case 'submit':
        try {
          handleCloseModalConfirm();
          handleCloseModal();

          await SubmitModel(model);
          setUpdate(prevState => prevState + 1);

          toast.success('Додано модель успішно', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        } catch (error) {
          toast.error(`Помилка дадавання моделі ${error.message}`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }

        break;

      case 'edit':
        try {
          handleCloseModalConfirm();
          handleCloseModal();

          await EditModel(model);
          setUpdate(prevState => prevState + 1);

          toast.success('Відредаговано успішно', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        } catch (error) {
          toast.error(`Помилка редагування ${error.message}`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }

        break;

      case 'loadBackup':
        setLoaderCount(0.1);

        const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));

        let needBreak = false;

        const getDataSeries = async restoreFile => {
          for (let index = 0; index < restoreFile.length; index++) {
            if (needBreak) {
              setBreakRestore(true);
              break;
            }

            setBreakRestore(false);

            await delay();
            const res = await fetch(
              'https://6519e0a5340309952f0cc472.mockapi.io/api/ifiservice/ContactUs',
              {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(restoreFile[index]),
              }
            )
              // eslint-disable-next-line no-loop-func
              .then(res => {
                if (!res.ok) {
                  console.log('помилка 1');
                  needBreak = true;
                }
                setLoaderCount(index + 1);
              })
              // eslint-disable-next-line no-loop-func
              .catch(error => {
                console.log('Помилка 2');
                needBreak = true;
              });
          }

          return 0;
        };

        getDataSeries(restoreFile);

        break;

      default:
        alert('Помилка типу модального вікна');
    }
  };

  const handleCloseModalConfirm = () => {
    setRestoreFile(null);
    setModalConfirm(false);
    setLoaderCount(0);
  };

  const handleSubmitModel = model => {
    setModel(model);
    setModalConfirmType(model.id ? 'edit' : 'submit');
    setModalConfirmText(model.id ? 'Зберегти зміни?' : 'Додати нову модель?');
    setModalConfirm(true);
  };

  const handleEditModel = model => {
    setModel(model);
    setModalConfirmType('edit');
    setModal(true);
  };

  const handleDeleteModel = async id => {
    setDeleteId(id);
    setModalConfirmType('delete');
    setModalConfirmText('Ви дійсно бажаєте видалити?');
    setModalConfirm(true);
  };

  const filterModels = models => {
    return models.filter(model => {
      return model.model.toLowerCase().includes(findModel);
    });
  };

  const onChooseBackupFile = file => {
    setRestoreFile(file);
    setModalConfirmType('loadBackup');
    setModalConfirmText('Відновлення');
    setModalConfirm(true);
  };

  return (
    <div className={styles.section}>
      <FindInput onChange={setFindModel} />
      <AddModelBtn onClick={handleOpenModal} />
      <BackUpButton getQuery={GetModels} name="Моделі" />
      <RestoreButton onChooseBackupFile={onChooseBackupFile} />
      {modal && (
        <Modal onClose={handleCloseModal}>
          <AddModelForm
            model={model || initialModel}
            onSubmit={handleSubmitModel}
          />
        </Modal>
      )}
      {modalConfirm && (
        <ModalConfirm
          onClose={
            loaderCount === 0 ||
            breakRestore ||
            loaderCount === restoreFile.length
              ? handleCloseModalConfirm
              : () => {}
          }
        >
          {loaderCount > 0 && (
            <BackupLoader count={loaderCount} length={restoreFile.length}>
              {breakRestore && <div>Помилка відновлення бази</div>}
            </BackupLoader>
          )}

          {loaderCount === 0 && (
            <Confirm
              text={modalConfirmText}
              accept={handleConfirmModal}
              decline={handleCloseModalConfirm}
            >
              {restoreFile && (
                <div>
                  Відновити базу? Буде виконано відновлено {restoreFile.length}
                  елементів колекції
                </div>
              )}
            </Confirm>
          )}
        </ModalConfirm>
      )}
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {models && (
        <>
          Всього {filterModels(models).length}
          <ModelsList
            models={filterModels(models)}
            onEdit={handleEditModel}
            onDelete={handleDeleteModel}
          />
        </>
      )}
    </div>
  );
}

export default Models;
