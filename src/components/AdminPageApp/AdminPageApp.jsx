import { Route, Routes } from 'react-router-dom';

import SharedLayout from './pages/SharedLayout';
import Models from './pages/Models';
import Services from './pages/Services';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';

function AdminPage() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Models />} />
        <Route path="services" element={<Services />} />
        <Route path="messages" element={<Messages />} />
        <Route path="shop" element={<Messages />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AdminPage;
