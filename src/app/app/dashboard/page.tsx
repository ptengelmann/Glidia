'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AIDemo from '@/components/AIDemo';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, MessageSquare, Zap, BarChart3, Bot, ArrowRight, CheckCircle, Sparkles, Brain, Activity, Target, Clock, Shield, Database, TrendingDown } from 'lucide-react';

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
    <div className="min-h-screen bg-black text-stone-100 relative">
      {/* Neural Network Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <svg 
          className="w-full h-full opacity-5" 
          viewBox="0 0 1920 1080" 
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="neural-grid" patternUnits="userSpaceOnUse" width="100" height="100">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
          
          <g stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" fill="none">
            <line x1="0" y1="200" x2="400" y2="150" className="animate-pulse">
              <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="400" y1="150" x2="800" y2="250" className="animate-pulse">
              <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
            </line>
          </g>
          
          <g fill="rgba(239, 68, 68, 0.6)">
            <circle cx="200" cy="200" r="3" className="animate-pulse" />
            <circle cx="600" cy="150" r="3" className="animate-pulse" />
            <circle cx="1000" cy="250" r="3" className="animate-pulse" />
          </g>
        </svg>
      </div>
      
      <Navbar variant="dashboard" showDashboardLink={false} />

      <div className="pt-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto py-8">
          {/* Dashboard Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-900/40 to-amber-900/40 border border-red-700/30 text-red-300 text-sm font-medium mb-4 backdrop-blur-sm">
                  <Brain className="w-4 h-4" />
                  <span>Demo Environment</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Glidia <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">Neural Dashboard</span>
                </h1>
                <p className="text-xl text-stone-300">
                  Test AI-powered WISMO & WISMR responses with real Shopify data
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-900/30 border border-red-700/30 backdrop-blur-sm">
                  <Activity className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="text-red-300 font-medium text-sm">Neural Engine Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Installation Status */}
          {installationStatus && (
            <div className="mb-8 bg-gradient-to-r from-stone-800/80 to-stone-900/80 border border-red-700/30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Installation Status</h2>
                  <p className="text-stone-300">{installationStatus}</p>
                </div>
              </div>
            </div>
          )}

          {/* Live Metrics - Ultra Modern Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { 
                icon: TrendingDown, 
                label: "Ticket Reduction", 
                value: "83", 
                unit: "%", 
                color: "from-red-500 via-red-400 to-pink-400", 
                desc: "Less support burden",
                trend: "+12% this month",
                bgGlow: "bg-red-500/10"
              },
              { 
                icon: Clock, 
                label: "Response Time", 
                value: "1.8", 
                unit: "s", 
                color: "from-amber-500 via-orange-400 to-red-400", 
                desc: "Lightning fast AI",
                trend: "-0.3s improved",
                bgGlow: "bg-amber-500/10"
              },
              { 
                icon: Target, 
                label: "Accuracy Rate", 
                value: "99.3", 
                unit: "%", 
                color: "from-emerald-500 via-teal-400 to-cyan-400", 
                desc: "Human-level precision",
                trend: "+0.1% accuracy",
                bgGlow: "bg-emerald-500/10"
              },
              { 
                icon: Shield, 
                label: "Uptime", 
                value: "99.9", 
                unit: "%", 
                color: "from-violet-500 via-purple-400 to-pink-400", 
                desc: "Always available",
                trend: "30 days perfect",
                bgGlow: "bg-violet-500/10"
              }
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div 
                  key={index} 
                  className="group relative"
                >
                  {/* Outer glow container */}
                  <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className={`w-full h-full rounded-3xl ${metric.bgGlow}`}></div>
                  </div>
                  
                  {/* Main card */}
                  <div className="relative bg-black/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all duration-500 hover:scale-[1.02] overflow-hidden group">
                    {/* Animated mesh gradient background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                      <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-20`}></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
                    </div>
                    
                    {/* Floating particles */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-8 right-8 w-1 h-1 bg-white/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-6 relative">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-xl relative overflow-hidden group-hover:shadow-2xl transition-all duration-500`}>
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          <Icon className="w-7 h-7 text-white relative z-10" />
                        </div>
                        
                        {/* Pulsing ring */}
                        <div className={`absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-30 animate-ping`}></div>
                      </div>
                      
                      {/* Value */}
                      <div className="mb-4">
                        <div className="flex items-baseline space-x-1 mb-2">
                          <span className="text-4xl lg:text-5xl font-black text-white relative">
                            {metric.value}
                            <span className={`absolute inset-0 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                              {metric.value}
                            </span>
                          </span>
                          <span className="text-xl lg:text-2xl font-bold text-white/60 group-hover:text-white/80 transition-colors duration-300">
                            {metric.unit}
                          </span>
                        </div>
                      </div>
                      
                      {/* Label */}
                      <h3 className="text-lg font-bold text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
                        {metric.label}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-white/60 mb-4 group-hover:text-white/80 transition-colors duration-300">
                        {metric.desc}
                      </p>
                      
                      {/* Trend indicator */}
                      <div className="flex items-center space-x-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${metric.color} animate-pulse`}></div>
                        <span className="text-xs font-medium text-white/70">
                          {metric.trend}
                        </span>
                      </div>
                    </div>
                    
                    {/* Bottom accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 backdrop-blur-sm rounded-2xl p-8 border border-stone-700/40 hover:border-red-500/30 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Responses</h3>
              <p className="text-stone-300 leading-relaxed">
                Generate empathetic, branded responses using real order data from your Shopify store with neural processing.
              </p>
            </div>
            <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 backdrop-blur-sm rounded-2xl p-8 border border-stone-700/40 hover:border-amber-500/30 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Package className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-Time Tracking</h3>
              <p className="text-stone-300 leading-relaxed">
                Automatically sync order and refund status from Shopify with instant updates and carrier integration.
              </p>
            </div>
            <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 backdrop-blur-sm rounded-2xl p-8 border border-stone-700/40 hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Analytics & Insights</h3>
              <p className="text-stone-300 leading-relaxed">
                Track support ticket reduction and identify patterns in customer queries with advanced metrics.
              </p>
            </div>
          </div>

          {/* Demo Tabs */}
          <Tabs defaultValue="ai-demo" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-stone-800/80 border border-stone-700/50 rounded-xl p-1 backdrop-blur-sm">
              <TabsTrigger 
                value="ai-demo" 
                className="flex items-center space-x-2 rounded-lg text-stone-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300"
              >
                <Bot className="w-4 h-4" />
                <span>Neural Demo</span>
              </TabsTrigger>
              <TabsTrigger 
                value="raw-data" 
                className="flex items-center space-x-2 rounded-lg text-stone-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-stone-600 data-[state=active]:to-stone-700 data-[state=active]:text-white transition-all duration-300"
              >
                <Database className="w-4 h-4" />
                <span>Raw Data</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai-demo">
              <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 backdrop-blur-sm rounded-2xl border border-stone-700/50 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-white">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Neural Response Generator</h3>
                      <p className="text-red-100">Watch our AI craft empathetic, branded responses using real order data</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>Neural Engine Online</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4" />
                      <span>Processing in real-time</span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <AIDemo />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="raw-data">
              <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 backdrop-blur-sm rounded-2xl border border-stone-700/50 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-stone-700 to-stone-800 p-8 text-white">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Raw Shopify Data Interface</h3>
                      <p className="text-stone-300">Test direct connection to your Shopify store without AI processing</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span>Shopify Connected</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4" />
                      <span>Live order data</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <form onSubmit={checkOrder} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-stone-300 mb-3">
                        Order Number
                      </label>
                      <input
                        className="w-full px-6 py-4 rounded-xl border-2 border-stone-600/50 bg-stone-800/50 text-white focus:border-red-500 focus:outline-none transition-all duration-300 text-lg font-mono backdrop-blur-sm"
                        value={orderName}
                        onChange={(e) => setOrderName(e.target.value)}
                        placeholder="#1001"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-stone-700 to-stone-800 text-white py-4 rounded-xl font-semibold text-lg hover:from-stone-600 hover:to-stone-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 border border-stone-600/50"
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
                    <div className="mt-8 p-6 bg-red-900/30 border-2 border-red-600/50 rounded-xl backdrop-blur-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                        <div>
                          <p className="font-semibold text-red-300">Error</p>
                          <p className="text-red-200 text-sm">{err}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {resp && (
                    <div className="mt-8 bg-stone-700/50 rounded-xl border-2 border-stone-600/50 overflow-hidden backdrop-blur-sm">
                      <div className="bg-stone-600/50 px-6 py-4 border-b border-stone-600/50">
                        <h4 className="font-bold text-white flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span>Shopify Response</span>
                        </h4>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-semibold text-stone-400 uppercase tracking-wide">Order</span>
                              <p className="text-lg font-mono font-bold text-white">{resp.name}</p>
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-stone-400 uppercase tracking-wide">Status</span>
                              <div className="mt-1">
                                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                                  resp.status?.toLowerCase().includes('delivered') || resp.status?.toLowerCase().includes('fulfilled')
                                    ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-600/30'
                                    : resp.status?.toLowerCase().includes('shipped') || resp.status?.toLowerCase().includes('transit')
                                    ? 'bg-blue-900/40 text-blue-300 border border-blue-600/30'
                                    : 'bg-amber-900/40 text-amber-300 border border-amber-600/30'
                                }`}>
                                  {resp.status || 'Unknown'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {resp.tracking ? (
                              <div className="space-y-3">
                                <div>
                                  <span className="text-sm font-semibold text-stone-400 uppercase tracking-wide">Carrier</span>
                                  <p className="text-lg font-semibold text-white">{resp.tracking.company}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-semibold text-stone-400 uppercase tracking-wide">Tracking</span>
                                  <p className="text-lg font-mono text-white">{resp.tracking.number}</p>
                                  <div className="mt-1">
                                    <a
                                      className="inline-flex items-center space-x-1 text-red-400 hover:text-red-300 font-medium text-sm transition-colors"
                                      href={resp.tracking.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <span>Track Package</span>
                                      <ArrowRight className="w-4 h-4" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <span className="text-sm font-semibold text-stone-400 uppercase tracking-wide">Tracking</span>
                                <p className="text-stone-500 italic">No tracking information available</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {(resp.shipTo || resp.total) && (
                          <div className="pt-4 border-t border-stone-600/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {resp.shipTo && (
                              <div>
                                <span className="text-sm font-semibold text-stone-400 uppercase tracking-wide">Ship To</span>
                                <p className="text-white">{resp.shipTo}</p>
                              </div>
                            )}
                            {resp.total && (
                              <div>
                                <span className="text-sm font-semibold text-stone-400 uppercase tracking-wide">Total</span>
                                <p className="text-xl font-bold text-white">
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
          <div className="mt-16 bg-gradient-to-r from-red-600 to-stone-700 rounded-2xl p-8 text-white text-center backdrop-blur-sm border border-red-700/30">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Support?</h2>
            <p className="text-red-100 mb-8 max-w-3xl mx-auto text-lg">
              See how Glidia can reduce your WISMO tickets by 80% and improve customer satisfaction. 
              The neural AI is already working with your Shopify data!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://partners.shopify.com/', '_blank')}
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-stone-100 transition-colors flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Shopify Partners Dashboard</span>
              </button>
              <button 
                onClick={() => window.open('/docs', '_blank')}
                className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Package className="w-5 h-5" />
                <span>View Documentation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}