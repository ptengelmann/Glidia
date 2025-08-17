// src/app/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AppDashboard() {
  const searchParams = useSearchParams();
  const shop = searchParams?.get('shop');
  const installed = searchParams?.get('installed');
  const [orderName, setOrderName] = useState('#1001');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleTest = async () => {
    if (!shop) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/app/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, orderName }),
      });
      
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: 'Failed to test connection' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Glidia Dashboard</h1>
              <p className="text-gray-600">AI-Powered WISMO & WISMR Automation</p>
            </div>
          </div>
          
          {installed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-green-800 font-medium">
                  App installed successfully for {shop}!
                </span>
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">WISMO Queries Automated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">0%</div>
              <div className="text-sm text-gray-600">Support Ticket Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$0</div>
              <div className="text-sm text-gray-600">Support Cost Savings</div>
            </div>
          </div>
        </div>

        {/* Connection Test */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Your Connection</h2>
          <p className="text-gray-600 mb-6">
            Test the connection to your store and see how Glidia will respond to customer queries.
          </p>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
              placeholder="Order number (e.g., #1001)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleTest}
              disabled={loading || !shop}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test Connection'}
            </button>
          </div>

          {response && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Test Result:</h3>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Setup Guide */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-medium mt-0.5">
                1
              </div>
              <div>
                <h3 className="font-medium">Test the connection above</h3>
                <p className="text-gray-600 text-sm">Make sure Glidia can access your order data</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-sm font-medium mt-0.5">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Configure your brand voice (Coming Soon)</h3>
                <p className="text-gray-500 text-sm">Set how Glidia should respond to your customers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-sm font-medium mt-0.5">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Enable automation (Coming Soon)</h3>
                <p className="text-gray-500 text-sm">Start reducing support tickets automatically</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}