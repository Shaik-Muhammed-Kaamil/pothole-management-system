// import React from 'react';

// export default function App() {
//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900">
//       <main className="max-w-6xl mx-auto p-4">
//         <h1>Pothole & Road Damage Reporting System</h1>
//         <p>Welcome to the frontend scaffold.</p>
//       </main>
//     </div>
//   );
// }

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './admin/AdminDashboard';
import OfficerPortal from './officer/OfficerPortal';
import CitizenHome from './citizen/CitizenHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/officer/portal" element={<OfficerPortal />} />
        <Route path="/citizen/home" element={<CitizenHome />} />
      </Routes>
    </Router>
  );
}

export default App;