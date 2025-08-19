// src/app/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AIDemo from '@/components/AIDemo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, MessageSquare, Zap, BarChart3, Bot, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export default function Dashboard() {
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
    <div className="min-h-screen bg-stone-50">
      <Navbar variant="dashboard" showDashboardLink={false} />

      <div className="pt-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-8">
          {/* Dashboard Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">
                  Glidia Demo Dashboard
                </h1>
                <p className="text-stone-600 text-lg">
                  Test AI-powered WISMO & WISMR responses with real Shopify data
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 border border-red-100">
                  <Sparkles className="w-4 h-4 text-red-600" />
                  <span className="text-red-700 font-medium text-sm">Demo Mode</span>
                </div>
              </div>
            </div>
          </div>

          {/* Installation Status */}
          {installationStatus && (
            <div className="mb-8 bg-gradient-to-r from-red-50 to-stone-50 border border-red-200 rounded-2xl p-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-stone-900 mb-1">Installation Status</h2>
                  <p className="text-stone-700">{installationStatus}</p>
                </div>
              </div>
            </div>
          )}

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">AI-Powered Responses</h3>
              <p className="text-stone-600 text-sm">
                Generate empathetic, branded responses using real order data from your Shopify store.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-stone-600" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">Real-Time Tracking</h3>
              <p className="text-stone-600 text-sm">
                Automatically sync order and refund status from Shopify with instant updates.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">Analytics & Insights</h3>
              <p className="text-stone-600 text-sm">
                Track support ticket reduction and identify patterns in customer queries.
              </p>
            </div>
          </div>

          {/* Demo Tabs */}
          <Tabs defaultValue="ai-demo" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-white border border-stone-200 rounded-xl p-1">
              <TabsTrigger 
                value="ai-demo" 
                className="flex items-center space-x-2 rounded-lg data-[state=active]:bg-red-50 data-[state=active]:text-red-700 data-[state=active]:border-red-200"
              >
                <Bot className="w-4 h-4" />
                <span>AI Demo</span>
              </TabsTrigger>
              <TabsTrigger 
                value="raw-data" 
                className="flex items-center space-x-2 rounded-lg data-[state=active]:bg-stone-100 data-[state=active]:text-stone-700"
              >
                <Package className="w-4 h-4" />
                <span>Raw Data</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai-demo">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">AI Response Generator</h3>
                  <p className="text-red-100">
                    Watch our neural engine craft empathetic, branded responses using real order data
                  </p>
                </div>
                <div className="p-8">
                  <AIDemo />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="raw-data">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-stone-700 to-stone-800 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Raw Shopify Data Test</h3>
                  <p className="text-stone-300">
                    Test the direct connection to your Shopify store without AI processing
                  </p>
                </div>
                
                <div className="p-8">
                  <form onSubmit={checkOrder} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-3">
                        Order Number
                      </label>
                      <input
                        className="w-full px-6 py-4 rounded-xl border-2 border-stone-200 focus:border-stone-500 focus:outline-none transition-all duration-200 text-lg font-mono"
                        value={orderName}
                        onChange={(e) => setOrderName(e.target.value)}
                        placeholder="#1001"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-stone-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-stone-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Fetching Data...</span>
                        </>
                      ) : (
                        <>
                          <Package className="w-5 h-5" />
                          <span>Get Raw Data</span>
                        </>
                      )}
                    </button>
                  </form>

                  {err && (
                    <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                        <div>
                          <p className="font-semibold text-red-800">Error</p>
                          <p className="text-red-600 text-sm">{err}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {resp && (
                    <div className="mt-8 bg-stone-50 rounded-xl border-2 border-stone-200 overflow-hidden">
                      <div className="bg-stone-100 px-6 py-4 border-b border-stone-200">
                        <h4 className="font-bold text-stone-900">Shopify Response</h4>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Order</span>
                              <p className="text-lg font-mono font-bold text-stone-900">{resp.name}</p>
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Status</span>
                              <div className="mt-1">
                                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                                  resp.status?.toLowerCase().includes('delivered') || resp.status?.toLowerCase().includes('fulfilled')
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                    : resp.status?.toLowerCase().includes('shipped') || resp.status?.toLowerCase().includes('transit')
                                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                }`}>
                                  {resp.status || 'Unknown'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {resp.tracking ? (
                              <>
                                <div>
                                  <span className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Carrier</span>
                                  <p className="text-lg font-semibold text-stone-900">{resp.tracking.company}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Tracking</span>
                                  <p className="text-lg font-mono text-stone-900">{resp.tracking.number}</p>
                                  <a
                                    className="inline-flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium text-sm mt-1"
                                    href={resp.tracking.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span>Track Package</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </a>
                                </div>
                              </>
                            ) : (
                              <div>
                                <span className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Tracking</span>
                                <p className="text-stone-400 italic">No tracking information available</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {(resp.shipTo || resp.total) && (
                          <div className="pt-4 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {resp.shipTo && (
                              <div>
                                <span className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Ship To</span>
                                <p className="text-stone-900">{resp.shipTo}</p>
                              </div>
                            )}
                            {resp.total && (
                              <div>
                                <span className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Total</span>
                                <p className="text-xl font-bold text-stone-900">
                                  {resp.total.amount} {resp.total.currencyCode}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Next Steps */}
          <div className="mt-16 bg-gradient-to-r from-red-600 to-stone-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Support?</h2>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              See how Glidia can reduce your WISMO tickets by 80% and improve customer satisfaction. 
              The AI is already working with your Shopify data!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://partners.shopify.com/', '_blank')}
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-stone-100 transition-colors"
              >
                Shopify Partners Dashboard
              </button>
              <button 
                onClick={() => window.open('/docs', '_blank')}
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
