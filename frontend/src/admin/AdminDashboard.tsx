import React, { useEffect, useState } from 'react';

interface OverviewResponse {
  totalUsers: number;
  totalComplaints: number;
  pending: number;
  inProgress: number;
  resolved: number;
  rejected: number;
  slaBreaches: number;
  zoneStats: Array<{ id: number; zone: string; }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<OverviewResponse | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    console.log('AdminDashboard: Starting fetch');
    fetch('http://localhost:5002/api/admin/overview')
      .then(async (res) => {
        console.log('AdminDashboard: Response status:', res.status);
        if (!res.ok) {
          const text = await res.text();
          console.log('AdminDashboard: Error text:', text);
          throw new Error(`Overview fetch failed (${res.status}): ${text}`);
        }
        const json = await res.json();
        console.log('AdminDashboard: Response data:', json);
        return json;
      })
      .then((payload: OverviewResponse) => {
        console.log('AdminDashboard: Setting data');
        setData(payload);
      })
      .catch((e) => {
        console.log('AdminDashboard: Error caught:', e);
        setError(String(e));
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {!data && !error && <div>Loading overview...</div>}

        {data && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border rounded shadow-sm">Total Users: {data.totalUsers}</div>
              <div className="p-4 bg-white border rounded shadow-sm">Total Complaints: {data.totalComplaints}</div>
              <div className="p-4 bg-white border rounded shadow-sm">Pending: {data.pending}</div>
              <div className="p-4 bg-white border rounded shadow-sm">In Progress: {data.inProgress}</div>
              <div className="p-4 bg-white border rounded shadow-sm">Resolved: {data.resolved}</div>
              <div className="p-4 bg-white border rounded shadow-sm">Rejected: {data.rejected}</div>
              <div className="p-4 bg-white border rounded shadow-sm">SLA Breaches: {data.slaBreaches}</div>
            </div>

            <section className="p-4 bg-white border rounded shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Hotspot Map</h2>
              <p>Interactive map showing complaint density by location (placeholder - requires map integration)</p>
              <div className="h-32 bg-gray-200 flex items-center justify-center text-gray-500">
                🗺️ Map visualization would go here
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
