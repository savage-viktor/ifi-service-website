function ModelsGallery({ models, activeService }) {
  return (
    <ul class="models-gallery-list">
      {models.map(model => {
        let isPage = false;

        model.services.map(service => {
          if (service.label === activeService) {
            isPage = service.isPage;
          }
        });

        return (
          <li class="models-gallery-item" key={model.id}>
            <a
              class="models-gallery-link"
              href={
                isPage
                  ? `${model.model.split(' ').join('').toLowerCase()}_${
                      model.services.find(
                        service => service.label === activeService
                      ).page
                    }.html`
                  : false
              }
            >
              <img
                class="models-gallery-image"
                src={model.image}
                alt={model.model}
              />
              <p class="models-gallery-model">{model.model}</p>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default ModelsGallery;
