import React, { useEffect, useState } from 'react';

type Complaint = {
  id: number;
  type: string;
  description: string;
  status: string;
  severity: string;
  createdAt: string;
};

export default function OfficerPortal() {
  const [assigned, setAssigned] = useState<Complaint[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      setError('No user session found');
      setIsLoading(false);
      return;
    }

    const parsed = JSON.parse(user);
    const userId = parsed.id;

    fetch(`http://localhost:5002/api/officer/assigned?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load assigned complaints');
        return res.json();
      })
      .then((payload) => setAssigned(payload.assigned || []))
      .catch((e) => setError(String(e)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Officer Portal</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {isLoading && <p>Loading assigned complaints...</p>}
        {!isLoading && !error && assigned.length === 0 && <p>No assigned complaints found.</p>}

        <div className="space-y-3">
          {assigned.map((c) => (
            <div key={c.id} className="p-4 bg-white border rounded shadow-sm">
              <h2 className="font-semibold">#{c.id} - {c.type}</h2>
              <p className="text-sm text-slate-600">{c.description}</p>
              <p className="text-xs uppercase mt-1">Status: {c.status} • Severity: {c.severity}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
