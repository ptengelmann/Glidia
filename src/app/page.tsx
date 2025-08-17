// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import AIDemo from '@/components/AIDemo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, MessageSquare, Zap, BarChart3 } from 'lucide-react';

export default function Home() {
  const [orderName, setOrderName] = useState('#1001');
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [installationStatus, setInstallationStatus] = useState<string | null>(null);

  // Handle Shopify installation redirect
  useEffect(() => {
    const handleShopifyInstall = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const shop = urlParams.get('shop');
      const hmac = urlParams.get('hmac');
      
      if (shop && hmac) {
        console.log('Detected Shopify installation redirect for:', shop);
        setInstallationStatus('Processing installation...');
        
        try {
          const response = await fetch('/api/handle-install', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ shop }),
          });
          
          const data = await response.json();
          
          if (data.ok) {
            setInstallationStatus(`✅ App installed successfully for ${shop}!`);
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
          } else {
            setInstallationStatus(`❌ Installation failed: ${data.error}`);
          }
        } catch (error) {
          setInstallationStatus(`❌ Installation error: ${error}`);
        }
      }
    };

    handleShopifyInstall();
  }, []);

  async function checkOrder(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setResp(null);
    try {
      const res = await fetch('/api/wismo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Request failed');
      setResp(data.data);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Glidia</h1>
                <p className="text-sm text-gray-500">AI WISMO & WISMR Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Shopify Connected
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  AI Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Development Preview
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Eliminate Customer Support{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Headaches
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Glidia automates WISMO & WISMR queries with AI, giving your customers instant, 
            empathetic responses while reducing your support workload by up to 80%.
          </p>
        </div>

        {/* Installation Status */}
        {installationStatus && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Installation Status</h2>
            <p className="text-blue-700">{installationStatus}</p>
          </div>
        )}

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Responses</h3>
            <p className="text-gray-600 text-sm">
              Generate empathetic, branded responses using real order data from your Shopify store.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
            <p className="text-gray-600 text-sm">
              Automatically sync order and refund status from Shopify with instant updates.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Analytics & Insights</h3>
            <p className="text-gray-600 text-sm">
              Track support ticket reduction and identify patterns in customer queries.
            </p>
          </div>
        </div>

        {/* Demo Tabs */}
        <Tabs defaultValue="ai-demo" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="ai-demo" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Demo
            </TabsTrigger>
            <TabsTrigger value="raw-data" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Raw Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-demo">
            <AIDemo />
          </TabsContent>

          <TabsContent value="raw-data">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <h2 className="text-2xl font-semibold mb-2">Raw Shopify Data Test</h2>
                <p className="text-gray-600 mb-6">
                  Test the direct connection to your Shopify store without AI processing.
                </p>
                
                <form onSubmit={checkOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Number
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                      placeholder="#1001"
                    />
                  </div>
                  <button
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium disabled:opacity-50 hover:bg-gray-800 transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Fetching...' : 'Get Raw Data'}
                  </button>
                </form>

                {err && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">
                      <strong>Error:</strong> {err}
                    </p>
                  </div>
                )}

                {resp && (
                  <div className="mt-6 bg-gray-50 rounded-lg p-6 border">
                    <h3 className="font-semibold mb-4 text-gray-900">Shopify Response:</h3>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <span className="font-medium text-gray-700">Order:</span>{' '}
                          <span className="font-mono">{resp.name}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Status:</span>{' '}
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            resp.status?.toLowerCase().includes('delivered') || resp.status?.toLowerCase().includes('fulfilled')
                              ? 'bg-green-100 text-green-800'
                              : resp.status?.toLowerCase().includes('shipped') || resp.status?.toLowerCase().includes('transit')
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {resp.status || 'Unknown'}
                          </span>
                        </div>
                        {resp.tracking ? (
                          <>
                            <div>
                              <span className="font-medium text-gray-700">Carrier:</span>{' '}
                              {resp.tracking.company}
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Tracking #:</span>{' '}
                              <span className="font-mono">{resp.tracking.number}</span>
                            </div>
                            <div>
                              <a
                                className="text-purple-600 hover:text-purple-700 underline text-sm"
                                href={resp.tracking.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Track Package →
                              </a>
                            </div>
                          </>
                        ) : (
                          <div className="text-gray-500 italic">No tracking information available</div>
                        )}
                        {resp.shipTo && (
                          <div>
                            <span className="font-medium text-gray-700">Ship to:</span>{' '}
                            {resp.shipTo}
                          </div>
                        )}
                        {resp.total && (
                          <div>
                            <span className="font-medium text-gray-700">Total:</span>{' '}
                            <span className="font-semibold">
                              {resp.total.amount} {resp.total.currencyCode}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Next Steps */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Support?</h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            See how Glidia can reduce your WISMO tickets by 80% and improve customer satisfaction. 
            The AI is already working with your Shopify data!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Install Shopify App
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}