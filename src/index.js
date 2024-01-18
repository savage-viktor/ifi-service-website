import React from 'react';
import ReactDOM from 'react-dom/client';

import ContactUs from './components/ContactUs/ContactUs';
// import SoftwareSolutions from './components/SoftwareSolutions/SoftwareSolutions';
// import VendorModels from './components/VendorModels/VendorModels';
// import ModelServices from './components/ModelServices/ModelServices';

const contact_us = ReactDOM.createRoot(document.getElementById('contact_us'));

// const software_solutions = ReactDOM.createRoot(
//   document.getElementById('software_solutions-app')
// );

// const vendor_models = ReactDOM.createRoot(
//   document.getElementById('vendor-models')
// );
// const vendorName = document
//   .getElementById('vendor-models')
//   .getAttribute('vendor-name');

// const model_services = ReactDOM.createRoot(
//   document.getElementById('model-services')
// );
// const modelName = document
//   .getElementById('model-services')
//   .getAttribute('model-name');

contact_us.render(
  <React.StrictMode>
    <ContactUs />
  </React.StrictMode>
);

// software_solutions.render(
//   <React.StrictMode>
//     <SoftwareSolutions />
//   </React.StrictMode>
// );

// vendor_models.render(
//   <React.StrictMode>
//     <VendorModels vendorName={vendorName} />
//   </React.StrictMode>
// );

// model_services.render(
//   <React.StrictMode>
//     <ModelServices modelName={modelName} />
//   </React.StrictMode>
// );
