// src/app/app/error/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams?.get('message') || 'An unknown error occurred';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-600 text-2xl">⚠️</span>
        </div>
        
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Installation Failed</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/api/auth/shopify/install?shop=glidiatest.myshopify.com'}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Try Installing Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>If the problem persists, please contact support.</p>
        </div>
      </div>
    </div>
  );
}

export default function AppError() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}