// src/app/app/dashboard/page.tsx
'use client';

import { Suspense } from 'react';
import DashboardContent from './DashboardContent';

// Loading component
function DashboardLoading() {
  return (
    <div className="min-h-screen bg-black text-stone-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-stone-300">Loading Glidia Neural Dashboard...</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}