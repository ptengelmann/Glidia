// src/components/AIDemo.tsx
'use client';

import { useState } from 'react';
import { Loader2, MessageSquare, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface AIResponse {
  message: string;
  tone: 'positive' | 'neutral' | 'apologetic';
  suggestedActions?: string[];
  escalationNeeded: boolean;
  timestamp: string;
}

export default function AIDemo() {
  const [orderName, setOrderName] = useState('#1001');
  const [customerName, setCustomerName] = useState('Sarah');
  const [brandVoice, setBrandVoice] = useState<'professional' | 'friendly' | 'casual' | 'luxury'>('friendly');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/wismo/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderName,
          customerName,
          customerQuery: "Hi, where is my order? I'm getting worried!",
          storeInfo: {
            name: 'Glidia Demo Store',
            brandVoice,
            supportEmail: 'support@glidia.com'
          }
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Request failed');
      setResponse(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getToneIcon = (tone: string) => {
    switch (tone) {
      case 'positive': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'apologetic': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      default: return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getToneBg = (tone: string) => {
    switch (tone) {
      case 'positive': return 'bg-green-50 border-green-200';
      case 'apologetic': return 'bg-amber-50 border-amber-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium">
          <MessageSquare className="w-4 h-4" />
          AI-Powered WISMO Demo
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          See Glidia's AI in Action
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter an order number and see how our AI generates empathetic, branded responses 
          using real Shopify data. Watch how the tone adapts based on order status.
        </p>
      </div>

      {/* Demo Form */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Number
              </label>
              <input
                type="text"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="#1001"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Sarah"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Brand Voice
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['professional', 'friendly', 'casual', 'luxury'] as const).map((voice) => (
                <button
                  key={voice}
                  type="button"
                  onClick={() => setBrandVoice(voice)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    brandVoice === voice
                      ? 'bg-purple-600 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {voice.charAt(0).toUpperCase() + voice.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating AI Response...
              </>
            ) : (
              <>
                <MessageSquare className="w-5 h-5" />
                Generate AI Response
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Response */}
      {response && (
        <div className="space-y-6">
          {/* Customer Query Simulation */}
          <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-gray-400">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {customerName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{customerName}</p>
                <p className="text-gray-600 mt-1">
                  "Hi, where is my order {orderName}? I'm getting worried!"
                </p>
                <p className="text-xs text-gray-500 mt-2">Just now</p>
              </div>
            </div>
          </div>

          {/* AI Response */}
          <div className={`rounded-xl p-6 border-l-4 ${getToneBg(response.tone)} ${
            response.tone === 'positive' ? 'border-green-400' :
            response.tone === 'apologetic' ? 'border-amber-400' : 'border-blue-400'
          }`}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                AI
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium text-gray-900">Glidia AI Assistant</p>
                  {getToneIcon(response.tone)}
                  <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-70 text-gray-600">
                    {response.tone} tone
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {response.message}
                </p>
                
                {/* Suggested Actions */}
                {response.suggestedActions && response.suggestedActions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Suggested Actions:</p>
                    <ul className="space-y-1">
                      {response.suggestedActions.map((action, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Escalation Flag */}
                {response.escalationNeeded && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Escalation Recommended
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-3">
                  Generated at {new Date(response.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          {/* Demo Insights */}
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              What Just Happened?
            </h3>
            <ul className="space-y-2 text-sm text-purple-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                Fetched real order data from your Shopify store
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                Analyzed order status and tracking information
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                Generated empathetic response matching your brand voice
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                Determined appropriate tone and escalation needs
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}