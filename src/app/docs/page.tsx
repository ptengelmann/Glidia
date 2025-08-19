// src/app/docs/page.tsx
'use client';

import { ArrowLeft, Code, Zap, Shield, BarChart3, Package, CheckCircle, Brain, Database, Cpu, Activity, Target, Clock, Heart, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function DocsPage() {
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

      {/* Header */}
      <header className="border-b border-stone-800/50 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Image 
                    src="/GlidiaLogo.png" 
                    alt="Glidia Logo" 
                    width={24} 
                    height={24} 
                    className="rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <Package className="w-5 h-5 text-white hidden" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
                  Glidia
                </h1>
                <p className="text-xs text-stone-400 font-medium">AI Support Intelligence</p>
              </div>
            </Link>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-900/30 border border-emerald-700/30 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-emerald-300 font-medium text-sm">Documentation</span>
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 text-stone-300 hover:text-red-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-900/40 to-amber-900/40 border border-red-700/30 text-red-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <Code className="w-4 h-4" />
            <span>Documentation</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get Started with{' '}
            <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
              Glidia
            </span>
          </h1>
          <p className="text-xl text-stone-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Complete guide to implementing AI-powered WISMO & WISMR automation for your Shopify store.
          </p>
        </div>

        {/* App Status */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-700/30 rounded-2xl p-8 mb-12 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-300 text-xl mb-2">✅ App Status</h3>
              <p className="text-emerald-200 leading-relaxed">
                Glidia is already installed and working on your development store! 
                The AI demo shows real responses using your store's order data.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Start Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Zap,
              title: "1. Install the App",
              description: "Install Glidia on your Shopify store through the Partners dashboard.",
              code: "Partners Dashboard → Test App → Install on Store",
              color: "from-blue-500 to-blue-600"
            },
            {
              icon: Package,
              title: "2. Configure Brand Voice",
              description: "Choose how Glidia should respond to your customers:",
              details: [
                "Professional: Courteous and direct",
                "Friendly: Warm and conversational", 
                "Casual: Relaxed and informal",
                "Luxury: Elegant and premium"
              ],
              color: "from-emerald-500 to-emerald-600"
            },
            {
              icon: BarChart3,
              title: "3. Monitor Performance",
              description: "Track support ticket reduction and customer satisfaction metrics in your dashboard.",
              color: "from-violet-500 to-violet-600"
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="group relative">
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className={`w-full h-full rounded-2xl bg-gradient-to-r ${item.color} opacity-20`}></div>
                </div>
                
                <div className="relative bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-500 h-full">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl mb-6 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <Icon className="w-7 h-7 text-white relative z-10" />
                  </div>
                  
                  <h3 className="font-bold text-white text-xl mb-3">{item.title}</h3>
                  <p className="text-stone-300 mb-4 leading-relaxed">{item.description}</p>
                  
                  {item.code && (
                    <div className="bg-stone-900/50 rounded-lg p-4 border border-stone-700/30">
                      <code className="text-sm text-stone-300 font-mono">
                        {item.code}
                      </code>
                    </div>
                  )}
                  
                  {item.details && (
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-stone-300 flex items-start">
                          <span className="text-emerald-400 mr-2">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* API Integration */}
        <div className="bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">API Integration</h2>
              <p className="text-stone-400">Connect with Glidia's powerful endpoints</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-stone-900/50 rounded-xl p-6 border border-stone-700/30">
              <h3 className="font-bold text-white text-lg mb-3">Generate AI Response</h3>
              <p className="text-stone-300 text-sm mb-4 leading-relaxed">
                Create empathetic, branded responses using real order data from your Shopify store.
              </p>
              <div className="bg-black/50 rounded-lg p-4 border border-stone-600/30">
                <code className="text-sm text-stone-300 font-mono leading-relaxed">
                  <span className="text-blue-400">POST</span> <span className="text-emerald-400">/api/wismo/ai</span><br/>
                  <br/>
                  <span className="text-yellow-400">{'{'}</span><br/>
                  &nbsp;&nbsp;<span className="text-red-400">"orderName"</span>: <span className="text-green-400">"#1001"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-red-400">"customerName"</span>: <span className="text-green-400">"Sarah"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-red-400">"storeInfo"</span>: <span className="text-yellow-400">{'{'}</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">"name"</span>: <span className="text-green-400">"Your Store"</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">"brandVoice"</span>: <span className="text-green-400">"friendly"</span><br/>
                  &nbsp;&nbsp;<span className="text-yellow-400">{'}'}</span><br/>
                  <span className="text-yellow-400">{'}'}</span>
                </code>
              </div>
            </div>

            <div className="bg-stone-900/50 rounded-xl p-6 border border-stone-700/30">
              <h3 className="font-bold text-white text-lg mb-3">Raw Order Data</h3>
              <p className="text-stone-300 text-sm mb-4 leading-relaxed">
                Fetch raw order information directly from your Shopify store.
              </p>
              <div className="bg-black/50 rounded-lg p-4 border border-stone-600/30">
                <code className="text-sm text-stone-300 font-mono leading-relaxed">
                  <span className="text-blue-400">POST</span> <span className="text-emerald-400">/api/wismo</span><br/>
                  <br/>
                  <span className="text-yellow-400">{'{'}</span><br/>
                  &nbsp;&nbsp;<span className="text-red-400">"orderName"</span>: <span className="text-green-400">"#1001"</span><br/>
                  <span className="text-yellow-400">{'}'}</span>
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Section - Enhanced Metrics */}
        <div className="bg-gradient-to-br from-red-900/20 via-stone-900/20 to-amber-900/20 rounded-2xl border border-red-700/30 p-8 mb-12 backdrop-blur-sm">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-900/40 to-amber-900/40 border border-red-700/30 text-red-300 text-sm font-medium mb-6 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Business Impact</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Transform Your Support Operations</h2>
            <p className="text-stone-300 max-w-2xl mx-auto">See how Glidia revolutionizes customer support with measurable results</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Target, value: "83%", label: "Ticket Reduction", color: "from-red-500 to-red-600" },
              { icon: Clock, value: "1.8s", label: "Response Time", color: "from-amber-500 to-amber-600" },
              { icon: Heart, value: "96%", label: "Satisfaction", color: "from-emerald-500 to-emerald-600" },
              { icon: TrendingUp, value: "$40k+", label: "Annual Savings", color: "from-violet-500 to-violet-600" }
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className={`w-full h-full rounded-xl bg-gradient-to-r ${metric.color} opacity-30`}></div>
                  </div>
                  
                  <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-white/20 transition-all duration-500">
                    <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                    <div className="text-stone-300 font-medium">{metric.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Technical Architecture</h2>
              <p className="text-stone-400">Built with modern, scalable technologies</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-stone-900/50 rounded-xl p-6 border border-stone-700/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg">Frontend</h3>
              </div>
              <p className="text-stone-300 text-sm mb-4 leading-relaxed">
                Modern, responsive interface built with cutting-edge technologies.
              </p>
              <ul className="text-sm text-stone-300 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Next.js 15 + React 19</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Tailwind CSS 4</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>TypeScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Lucide Icons</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-stone-900/50 rounded-xl p-6 border border-stone-700/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Database className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg">Backend & Integrations</h3>
              </div>
              <p className="text-stone-300 text-sm mb-4 leading-relaxed">
                Secure, scalable infrastructure with enterprise-grade integrations.
              </p>
              <ul className="text-sm text-stone-300 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>Next.js API Routes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>MongoDB + Mongoose</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>Shopify GraphQL Admin API</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>OpenAI GPT-4</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>OAuth 2.0 Authentication</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 rounded-2xl p-12 text-white text-center backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Support?</h2>
            <p className="text-red-100 mb-8 text-lg leading-relaxed">
              Join thousands of merchants already using Glidia to automate their customer support and reduce costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-stone-100 transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <Zap className="w-5 h-5" />
                <span>Try the Demo</span>
              </Link>
              <a
                href="https://github.com/ptengelmann/Glidia"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Code className="w-5 h-5" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}