/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Profile } from './pages/Profile';
import { EntityDetail } from './pages/EntityDetail';
import { CameraView } from './pages/CameraView';
import { EventReport } from './pages/EventReport';
import { EntityProfile } from './pages/EntityProfile';
import { EventProfile } from './pages/EventProfile';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 sm:bg-slate-200 flex items-center justify-center sm:p-4 font-sans">
      <div className="w-full h-screen sm:h-[844px] sm:max-h-[90vh] sm:w-[390px] bg-white sm:rounded-[3rem] sm:shadow-[0_0_0_12px_#1e293b,0_32px_64px_-12px_rgba(0,0,0,0.3)] overflow-hidden relative flex flex-col transform translate-x-0">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="profile-entity" element={<EntityProfile />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            {/* Full screen pages without bottom nav */}
            <Route path="/search" element={<Search />} />
            <Route path="/entity/:id" element={<EntityDetail />} />
            <Route path="/camera/:id" element={<CameraView />} />
            <Route path="/report" element={<EventReport />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
