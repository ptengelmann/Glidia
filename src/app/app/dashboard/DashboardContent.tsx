// src/app/app/dashboard/DashboardContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AIDemo from '@/components/AIDemo';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, MessageSquare, Bot, ArrowRight, CheckCircle, Brain, Activity, Target, Clock, Database, TrendingDown } from 'lucide-react';

export default function DashboardContent() {
  const searchParams = useSearchParams();
  const shop = searchParams.get('shop');
  const hmac = searchParams.get('hmac');

  const [orderName, setOrderName] = useState('#1001');
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [installationStatus, setInstallationStatus] = useState<string | null>(null);

  // Handle Shopify installation redirect
  useEffect(() => {
    const handleShopifyInstall = async () => {
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
  }, [shop, hmac]);

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

  // Minimal grid background
  const MinimalBackground = () => (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="minimal-grid" patternUnits="userSpaceOnUse" width="100" height="100">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#minimal-grid)" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative">
      <MinimalBackground />
      
      <Navbar variant="dashboard" showDashboardLink={false} />

      <div className="pt-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto py-12">
          {/* Clean Dashboard Header */}
          <div className="mb-16">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2 px-3 py-1 border border-stone-800 rounded-full text-stone-400 text-sm font-medium">
                    <Brain className="w-4 h-4" />
                    <span>Demo Environment</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400 text-sm font-medium">Engine Active</span>
                  </div>
                </div>
                <h1 className="text-5xl lg:text-6xl font-light text-white mb-6">
                  Neural <span className="text-stone-400">Console</span>
                </h1>
                <p className="text-xl text-stone-500 max-w-2xl">
                  Test AI-powered WISMO automation with real Shopify integration
                </p>
              </div>
            </div>
          </div>

          {/* Installation Status */}
          {installationStatus && (
            <div className="mb-12 bg-stone-950/60 border border-stone-700/50 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white mb-1">Installation Status</h2>
                  <p className="text-stone-400">{installationStatus}</p>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: TrendingDown, label: "Fewer tickets", value: "83%", desc: "vs human agents", trend: "+12% this month" },
              { icon: Clock, label: "Response time", value: "1.8s", desc: "avg processing", trend: "-0.3s improved" },
              { icon: Target, label: "Accuracy rate", value: "99.3%", desc: "human-level", trend: "+0.1% accuracy" },
              { icon: Database, label: "Uptime", value: "99.9%", desc: "always available", trend: "30 days perfect" }
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="group relative">
                  {/* Subtle glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-stone-950/80 backdrop-blur-sm border border-stone-800 rounded-2xl p-6 hover:border-stone-700 transition-all duration-300 overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    {/* Icon container with enhanced styling */}
                    <div className="relative mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 border border-stone-700 rounded-xl flex items-center justify-center group-hover:border-stone-600 transition-colors duration-300 relative overflow-hidden">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Icon className="w-6 h-6 text-stone-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                      </div>
                      
                      {/* Floating indicator */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full h-full bg-white/20 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Value display with enhanced typography */}
                    <div className="relative mb-4">
                      <div className="flex items-baseline space-x-2 mb-2">
                        <span className="text-4xl font-light text-white tracking-tight relative">
                          {metric.value}
                          {/* Subtle text glow on hover */}
                          <span className="absolute inset-0 text-white/0 group-hover:text-white/20 transition-colors duration-300 blur-sm">
                            {metric.value}
                          </span>
                        </span>
                      </div>
                      
                      {/* Label and description */}
                      <div className="space-y-1">
                        <div className="text-sm text-stone-300 font-medium group-hover:text-white transition-colors duration-300">
                          {metric.label}
                        </div>
                        <div className="text-xs text-stone-500 group-hover:text-stone-400 transition-colors duration-300">
                          {metric.desc}
                        </div>
                      </div>
                    </div>
                    
                    {/* Trend indicator */}
                    <div className="relative">
                      <div className="flex items-center space-x-2 text-xs text-stone-600 group-hover:text-stone-500 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse"></div>
                        <span className="font-medium">{metric.trend}</span>
                      </div>
                      
                      {/* Bottom accent line */}
                      <div className="absolute -bottom-6 left-0 w-full h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Feature Overview */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-stone-950/80 backdrop-blur-sm border border-stone-800 rounded-3xl p-8 hover:border-stone-700 transition-all duration-300 overflow-hidden">
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                    backgroundSize: '12px 12px'
                  }}></div>
                </div>
                
                <div className="relative">
                  {/* Enhanced icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 border border-stone-700 rounded-2xl flex items-center justify-center mb-6 group-hover:border-stone-600 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <MessageSquare className="w-7 h-7 text-stone-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-3 group-hover:text-white transition-colors duration-300">
                    AI Processing
                  </h3>
                  <p className="text-stone-400 leading-relaxed text-sm group-hover:text-stone-300 transition-colors duration-300">
                    Generate contextual responses using real order data from your Shopify store with neural processing.
                  </p>
                  
                  {/* Subtle progress indicator */}
                  <div className="mt-4 w-full bg-stone-800/50 rounded-full h-1 overflow-hidden">
                    <div className="w-0 h-full bg-gradient-to-r from-white/20 to-white/40 group-hover:w-3/4 transition-all duration-1000 ease-out rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-stone-950/80 backdrop-blur-sm border border-stone-800 rounded-3xl p-8 hover:border-stone-700 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                    backgroundSize: '12px 12px'
                  }}></div>
                </div>
                
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 border border-stone-700 rounded-2xl flex items-center justify-center mb-6 group-hover:border-stone-600 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <Package className="w-7 h-7 text-stone-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-3 group-hover:text-white transition-colors duration-300">
                    Live Integration
                  </h3>
                  <p className="text-stone-400 leading-relaxed text-sm group-hover:text-stone-300 transition-colors duration-300">
                    Real-time sync with order status, tracking information, and carrier integration.
                  </p>
                  
                  <div className="mt-4 w-full bg-stone-800/50 rounded-full h-1 overflow-hidden">
                    <div className="w-0 h-full bg-gradient-to-r from-white/20 to-white/40 group-hover:w-4/5 transition-all duration-1000 ease-out rounded-full delay-100"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-stone-950/80 backdrop-blur-sm border border-stone-800 rounded-3xl p-8 hover:border-stone-700 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                    backgroundSize: '12px 12px'
                  }}></div>
                </div>
                
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 border border-stone-700 rounded-2xl flex items-center justify-center mb-6 group-hover:border-stone-600 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <Activity className="w-7 h-7 text-stone-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-3 group-hover:text-white transition-colors duration-300">
                    Analytics
                  </h3>
                  <p className="text-stone-400 leading-relaxed text-sm group-hover:text-stone-300 transition-colors duration-300">
                    Track performance metrics and identify patterns in customer support queries.
                  </p>
                  
                  <div className="mt-4 w-full bg-stone-800/50 rounded-full h-1 overflow-hidden">
                    <div className="w-0 h-full bg-gradient-to-r from-white/20 to-white/40 group-hover:w-2/3 transition-all duration-1000 ease-out rounded-full delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Demo Tabs */}
          <Tabs defaultValue="ai-demo" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-stone-900/50 border border-stone-800 rounded-xl p-1">
              <TabsTrigger 
                value="ai-demo" 
                className="flex items-center space-x-2 rounded-lg text-stone-400 data-[state=active]:bg-white data-[state=active]:text-black transition-all duration-300"
              >
                <Bot className="w-4 h-4" />
                <span>Neural Demo</span>
              </TabsTrigger>
              <TabsTrigger 
                value="raw-data" 
                className="flex items-center space-x-2 rounded-lg text-stone-400 data-[state=active]:bg-stone-700 data-[state=active]:text-white transition-all duration-300"
              >
                <Database className="w-4 h-4" />
                <span>Raw Data</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai-demo">
              <div className="bg-stone-950/50 border border-stone-700/50 rounded-3xl overflow-hidden">
                <div className="bg-white text-black p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-black/10 rounded-xl flex items-center justify-center">
                      <Brain className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Neural Response Generator</h3>
                      <p className="text-black/60">AI-powered WISMO automation in action</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-black/60">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                      <span>Real-time processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4" />
                      <span>Live Shopify data</span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <AIDemo />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="raw-data">
              <div className="bg-stone-950/50 border border-stone-700/50 rounded-3xl overflow-hidden">
                <div className="bg-stone-800 text-white p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Raw Data Interface</h3>
                      <p className="text-stone-300">Direct Shopify connection without AI processing</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-stone-400">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span>Shopify connected</span>
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
                      <label className="block text-sm font-medium text-stone-300 mb-3">
                        Order Number
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-stone-900/50 text-white focus:border-white focus:outline-none transition-all duration-300 font-mono"
                        value={orderName}
                        onChange={(e) => setOrderName(e.target.value)}
                        placeholder="#1001"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-stone-800 text-white py-3 rounded-xl font-medium hover:bg-stone-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 border border-stone-600"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Fetching...</span>
                        </>
                      ) : (
                        <>
                          <Package className="w-4 h-4" />
                          <span>Get Data</span>
                        </>
                      )}
                    </button>
                  </form>

                  {err && (
                    <div className="mt-6 p-4 bg-stone-900/50 border border-stone-700 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <span className="text-black text-xs">!</span>
                        </div>
                        <div>
                          <p className="font-medium text-white">Error</p>
                          <p className="text-stone-400 text-sm">{err}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {resp && (
                    <div className="mt-6 bg-stone-900/50 rounded-xl border border-stone-700 overflow-hidden">
                      <div className="bg-stone-800/50 px-6 py-4 border-b border-stone-700">
                        <h4 className="font-medium text-white flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span>Shopify Response</span>
                        </h4>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div>
                              <span className="text-xs text-stone-500 uppercase tracking-wide">Order</span>
                              <p className="text-lg font-mono text-white">{resp.name}</p>
                            </div>
                            <div>
                              <span className="text-xs text-stone-500 uppercase tracking-wide">Status</span>
                              <div className="mt-1">
                                <span className="inline-flex px-2 py-1 bg-white/10 text-white rounded text-sm">
                                  {resp.status || 'Unknown'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {resp.tracking ? (
                              <div className="space-y-3">
                                <div>
                                  <span className="text-xs text-stone-500 uppercase tracking-wide">Carrier</span>
                                  <p className="text-lg text-white">{resp.tracking.company}</p>
                                </div>
                                <div>
                                  <span className="text-xs text-stone-500 uppercase tracking-wide">Tracking</span>
                                  <p className="text-lg font-mono text-white">{resp.tracking.number}</p>
                                  <div className="mt-1">
                                    <a
                                      className="inline-flex items-center space-x-1 text-white hover:text-stone-300 text-sm transition-colors"
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
                                <span className="text-xs text-stone-500 uppercase tracking-wide">Tracking</span>
                                <p className="text-stone-500 italic">No tracking available</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {(resp.shipTo || resp.total) && (
                          <div className="pt-4 border-t border-stone-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {resp.shipTo && (
                              <div>
                                <span className="text-xs text-stone-500 uppercase tracking-wide">Ship To</span>
                                <p className="text-white">{resp.shipTo}</p>
                              </div>
                            )}
                            {resp.total && (
                              <div>
                                <span className="text-xs text-stone-500 uppercase tracking-wide">Total</span>
                                <p className="text-lg font-medium text-white">
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

          {/* Clean CTA */}
          <div className="mt-20 bg-stone-950 rounded-2xl p-12 text-center border border-stone-800">
            <h2 className="text-3xl font-light text-white mb-4">Ready to Deploy?</h2>
            <p className="text-stone-400 mb-8 max-w-2xl mx-auto">
              Integrate Glidia with your Shopify store and start reducing support tickets immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors">
                Install App
              </button>
              <button className="border border-stone-700 text-white px-8 py-3 rounded-lg font-medium hover:border-stone-600 transition-colors">
                Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}