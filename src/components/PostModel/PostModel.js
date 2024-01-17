function PostModel() {
  const model = {
    vendor: 'Novatel',
    model: 'Novatel 2372',
    image: './images/models/novatel_2372.jpg',
    details: {
      type: 'Мобільний роутер + PowerBank',
      typeOfSim: 'NanoSIM',
      size: '113 х 71 х 19 мм',
      battery: '5000 мАг',
      bands: 'Band 3/7/8',
      antena: 'MIMO, заводська',
      wifi: '2,4 ГГц, 5 ГГц',
      mobileNetwork: '4G LTE Cat.16',
    },
    services: [
      {
        name: 'Укранський інтерфейс',
        description: 'Встановлення українського інтерфейсу',
        // isPage: true,
        page: './pages/netgear/791/netgear791_ukr-interface.html',
      },
      {
        name: 'Зміна IMEI',
        description: 'Зміна IMEI',
        // isPage: false,
        page: '',
      },
    ],
  };

  const submitModel = () => {
    fetch('https://6519e0a5340309952f0cc472.mockapi.io/api/ifiservice/Models', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(model),
    });
  };
  return (
    <>
      <div>
        <h1>Test</h1>
        <button onClick={submitModel} type="submit">
          Post model
        </button>
      </div>
    </>
  );
}
export default PostModel;
