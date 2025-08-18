// src/app/docs/page.tsx
import { ArrowLeft, Code, Zap, Shield, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              Back to Demo
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-semibold text-gray-900">Glidia Docs</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Glidia Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete guide to implementing AI-powered WISMO & WISMR automation for your Shopify store.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-purple-600" />
            Quick Start
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">1. Install the App</h3>
              <p className="text-gray-600 mb-3">Install Glidia on your Shopify store through the Partners dashboard.</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <code className="text-sm">Partners Dashboard → Test App → Install on Store</code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Configure Brand Voice</h3>
              <p className="text-gray-600 mb-3">Choose how Glidia should respond to your customers:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li><strong>Professional:</strong> Courteous and direct</li>
                <li><strong>Friendly:</strong> Warm and conversational</li>
                <li><strong>Casual:</strong> Relaxed and informal</li>
                <li><strong>Luxury:</strong> Elegant and premium</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Test with Orders</h3>
              <p className="text-gray-600">Try the AI demo with real orders from your store to see how Glidia responds.</p>
            </div>
          </div>
        </div>

        {/* App Already Installed Notice */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-800 mb-2">✅ App Status</h3>
          <p className="text-green-700">
            Glidia is already installed and working on your development store! 
            The AI demo above shows real responses using your store's order data.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold">API Integration</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Seamlessly connects to your Shopify store using GraphQL Admin API for real-time order data.
            </p>
            <div className="bg-gray-50 rounded-lg p-3">
              <code className="text-sm text-gray-700">
                POST /api/wismo/ai<br/>
                {"{"}"orderName": "#1001", "customerName": "Sarah"{"}"}
              </code>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold">Secure & Private</h3>
            </div>
            <p className="text-gray-600 mb-4">
              OAuth 2.0 authentication ensures secure access to your store data with proper permission scopes.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Encrypted data transmission</li>
              <li>• Minimal permission requests</li>
              <li>• No sensitive data storage</li>
            </ul>
          </div>
        </div>

        {/* ROI Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-semibold">Business Impact</h3>
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

        {/* Technical Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="text-xl font-semibold mb-6">Technical Architecture</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Frontend</h4>
              <p className="text-gray-600 text-sm">Next.js 15, React 19, Tailwind CSS 4, TypeScript</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Backend</h4>
              <p className="text-gray-600 text-sm">Next.js API Routes, MongoDB, Mongoose ODM</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Integrations</h4>
              <p className="text-gray-600 text-sm">Shopify GraphQL Admin API, OpenAI GPT-4, OAuth 2.0</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Deployment</h4>
              <p className="text-gray-600 text-sm">Vercel-ready, Environment variable configuration</p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="text-center mt-12 p-8 bg-white rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            Check out our GitHub repository for detailed setup instructions and code examples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/ptengelmann/Glidia"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              View on GitHub
            </a>
            <Link
              href="/"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Try the Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}