function ModelsList({ models, onEdit, onDelete }) {
  const sortedModels = models.sort((firstModel, secondModel) =>
    firstModel.model.localeCompare(secondModel.model)
  );

  return (
    <ul class="vendor-model-list">
      {sortedModels.map(model => {
        return (
          <li key={model.id} class="vendor-model-item">
            <a class="vendor-model-link">
              <img
                class="vendor-model-image"
                src={model.image}
                alt={model.model}
              />
              <p class="vendor-model-name">{model.model}</p>
            </a>
            <div class="vendor-model__container-table">
              <button class="vendor-model-detailed">Детальніше</button>
              <button
                onClick={() => {
                  onEdit(model);
                }}
                type="button"
              >
                Ред.
              </button>
              <button
                onClick={() => {
                  onDelete(model.id);
                }}
                type="button"
              >
                Вид.
              </button>

              <table class="vendor-model__table" rules="all">
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
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ModelsList;
