// src/app/docs/page.tsx
import { ArrowLeft, Code, Zap, Shield, BarChart3, Package, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Glidia</h1>
                <p className="text-sm text-gray-500">AI WISMO & WISMR Platform</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Documentation
                </span>
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Code className="w-4 h-4" />
            Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Started with{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Glidia
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Complete guide to implementing AI-powered WISMO & WISMR automation for your Shopify store.
          </p>
        </div>

        {/* App Status */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="font-semibold text-green-800">✅ App Status</h3>
              <p className="text-green-700">
                Glidia is already installed and working on your development store! 
                The AI demo shows real responses using your store's order data.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Start Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Install the App</h3>
            <p className="text-gray-600 text-sm mb-3">
              Install Glidia on your Shopify store through the Partners dashboard.
            </p>
            <div className="bg-gray-50 rounded-lg p-3">
              <code className="text-xs text-gray-700">
                Partners Dashboard → Test App → Install on Store
              </code>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Configure Brand Voice</h3>
            <p className="text-gray-600 text-sm mb-3">
              Choose how Glidia should respond to your customers:
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• <strong>Professional:</strong> Courteous and direct</li>
              <li>• <strong>Friendly:</strong> Warm and conversational</li>
              <li>• <strong>Casual:</strong> Relaxed and informal</li>
              <li>• <strong>Luxury:</strong> Elegant and premium</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Monitor Performance</h3>
            <p className="text-gray-600 text-sm">
              Track support ticket reduction and customer satisfaction metrics in your dashboard.
            </p>
          </div>
        </div>

        {/* API Integration */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Code className="w-6 h-6 text-blue-600" />
            API Integration
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Generate AI Response</h3>
              <p className="text-gray-600 text-sm mb-4">
                Create empathetic, branded responses using real order data from your Shopify store.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <code className="text-sm text-gray-700">
                  POST /api/wismo/ai<br/>
                  <br/>
                  {`{`}<br/>
                  &nbsp;&nbsp;"orderName": "#1001",<br/>
                  &nbsp;&nbsp;"customerName": "Sarah",<br/>
                  &nbsp;&nbsp;"storeInfo": {`{`}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"name": "Your Store",<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"brandVoice": "friendly"<br/>
                  &nbsp;&nbsp;{`}`}<br/>
                  {`}`}
                </code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Raw Order Data</h3>
              <p className="text-gray-600 text-sm mb-4">
                Fetch raw order information directly from your Shopify store.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <code className="text-sm text-gray-700">
                  POST /api/wismo<br/>
                  <br/>
                  {`{`}<br/>
                  &nbsp;&nbsp;"orderName": "#1001"<br/>
                  {`}`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Business Impact</h2>
            <p className="text-gray-600">See how Glidia transforms your customer support operations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">80%</div>
              <div className="text-gray-700">Reduction in WISMO tickets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$40k+</div>
              <div className="text-gray-700">Annual support cost savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-700">Instant customer responses</div>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-600" />
            Technical Architecture
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Frontend</h3>
              <p className="text-gray-600 text-sm mb-4">Modern, responsive interface built with cutting-edge technologies.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Next.js 15 + React 19</li>
                <li>• Tailwind CSS 4</li>
                <li>• TypeScript</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Backend & Integrations</h3>
              <p className="text-gray-600 text-sm mb-4">Secure, scalable infrastructure with enterprise-grade integrations.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Next.js API Routes</li>
                <li>• MongoDB + Mongoose</li>
                <li>• Shopify GraphQL Admin API</li>
                <li>• OpenAI GPT-4</li>
                <li>• OAuth 2.0 Authentication</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Join thousands of merchants already using Glidia to automate their customer support and reduce costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Try the Demo
            </Link>
            <a
              href="https://github.com/ptengelmann/Glidia"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}