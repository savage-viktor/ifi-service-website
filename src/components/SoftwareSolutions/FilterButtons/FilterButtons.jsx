function FilterButtons({ services, activeService, onClick }) {
  return (
    <ul class="filter-button-list">
      {services.map(service => {
        return (
          <li key={services.indexOf(service)} class="filter-button-item">
            <button
              class={
                service === activeService
                  ? 'filter-button filter-button--active'
                  : 'filter-button'
              }
              onClick={onClick}
            >
              {service}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default FilterButtons;
