// src/components/AIDemo.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  User, 
  Sparkles, 
  Zap, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Target,
  Brain,
  Activity,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Mic,
  Send,
  Shuffle,
  Copy,
  Download,
  Share2,
  BarChart3,
  Eye,
  Heart,
  ThumbsUp
} from 'lucide-react';

interface AIMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: number;
  metadata?: {
    tone: 'empathetic' | 'professional' | 'urgent' | 'reassuring' | 'apologetic';
    confidence: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    escalationScore: number;
    processingTime: number;
    orderData?: any;
    suggestions?: string[];
  };
}

interface AIMetrics {
  accuracy: number;
  responseTime: number;
  customerSatisfaction: number;
  escalationReduction: number;
}

const DEMO_SCENARIOS = [
  {
    id: 'wismo-anxious',
    title: 'Anxious Customer - Missing Package',
    query: "Hi, I ordered something 2 weeks ago and it still hasn't arrived. The tracking shows delivered but I never got it. I'm really worried about my $300 order!",
    orderNumber: '#WM-1001',
    context: 'High-value order, delivery confusion'
  },
  {
    id: 'wismo-delay', 
    title: 'Shipping Delay Inquiry',
    query: "Hello, my order was supposed to arrive yesterday but tracking says it's still in transit. When will I actually get it?",
    orderNumber: '#WM-1002',
    context: 'Standard delay inquiry'
  },
  {
    id: 'wismr-defective',
    title: 'Defective Product Return',
    query: "The product I received is broken and doesn't work at all. I need to return this immediately and get my money back!",
    orderNumber: '#WM-1003',
    context: 'Angry customer, defective product'
  },
  {
    id: 'wismo-gift',
    title: 'Gift Delivery Concern',
    query: "I ordered this as a birthday gift and it needs to arrive by Friday. Can you please confirm it will make it on time?",
    orderNumber: '#WM-1004',
    context: 'Time-sensitive gift delivery'
  }
];

export default function AIDemo() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(DEMO_SCENARIOS[0]);
  const [showMetrics, setShowMetrics] = useState(false);
  const [realTimeMetrics, setRealTimeMetrics] = useState<AIMetrics>({
    accuracy: 0,
    responseTime: 0,
    customerSatisfaction: 0,
    escalationReduction: 0
  });
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Animate metrics counter
  useEffect(() => {
    if (showMetrics) {
      const interval = setInterval(() => {
        setRealTimeMetrics(prev => ({
          accuracy: Math.min(98.7, prev.accuracy + 2.1),
          responseTime: Math.max(1.2, prev.responseTime - 0.1),
          customerSatisfaction: Math.min(96.3, prev.customerSatisfaction + 1.8),
          escalationReduction: Math.min(84.2, prev.escalationReduction + 2.3)
        }));
      }, 100);

      setTimeout(() => clearInterval(interval), 2000);
      return () => clearInterval(interval);
    }
  }, [showMetrics]);

  const simulateAIProcessing = async (query: string, orderNumber: string) => {
    const steps = [
      'Analyzing customer query...',
      'Fetching Shopify order data...',
      'Processing sentiment & urgency...',
      'Generating contextual response...',
      'Optimizing for brand voice...',
      'Finalizing empathetic tone...'
    ];

    setProcessingSteps([]);
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
      setProcessingSteps(prev => [...prev, steps[i]]);
    }

    // Simulate API call
    const startTime = Date.now();
    await new Promise(resolve => setTimeout(resolve, 800));
    const processingTime = Date.now() - startTime;

    // Generate AI response based on scenario
    const responses = {
      'wismo-anxious': {
        content: `Hi there! I completely understand your concern about your $300 order #WM-1001. I've located your package and I have great news - it was actually delivered to your building's package room on Floor 2. The carrier left it with the building management due to security protocols.\n\nI've also arranged for a $30 credit to your account for the confusion and stress this caused. Your satisfaction is our top priority!\n\nWould you like me to send you the exact delivery photos and contact information for your building's package room?`,
        tone: 'empathetic' as const,
        confidence: 94.2,
        sentiment: 'negative' as const,
        escalationScore: 25,
        suggestions: ['Provide delivery photos', 'Contact building management', 'Issue goodwill credit']
      },
      'wismo-delay': {
        content: `Hello! Thanks for reaching out about order #WM-1002. I can see the delay is due to unexpected weather conditions affecting our shipping partner's routes.\n\nYour package is currently at the final sorting facility and will be delivered tomorrow by 2 PM. I've upgraded your shipping to priority at no cost and added 2-day expedited shipping to your next order as an apology.\n\nI'll send you real-time updates via SMS so you know exactly when it's out for delivery!`,
        tone: 'professional' as const,
        confidence: 97.1,
        sentiment: 'neutral' as const,
        escalationScore: 15,
        suggestions: ['Upgrade shipping', 'Provide SMS updates', 'Compensate with future benefit']
      },
      'wismr-defective': {
        content: `I'm so sorry to hear about the defective product in order #WM-1003! That's absolutely not the experience we want for you.\n\nI've immediately processed a full refund of $89.99 which will appear in your account within 24 hours. I'm also sending you a prepaid return label via email right now - no need to pay for return shipping.\n\nAs an apology, I'd like to offer you a 25% discount on a replacement item or any future purchase. Would you like me to help you find a replacement right now?`,
        tone: 'apologetic' as const,
        confidence: 96.8,
        sentiment: 'negative' as const,
        escalationScore: 35,
        suggestions: ['Process immediate refund', 'Send prepaid return label', 'Offer replacement discount']
      },
      'wismo-gift': {
        content: `Absolutely! I understand how important this birthday gift is. Good news - your order #WM-1004 is on track for Thursday delivery, one day ahead of your Friday deadline! 🎁\n\nI've added signature confirmation and gift packaging notes to ensure safe delivery. You'll receive a delivery notification with photo confirmation as soon as it arrives.\n\nIf anything changes, I have backup options ready including local store pickup or expedited replacement. This gift will definitely make it on time!`,
        tone: 'reassuring' as const,
        confidence: 95.5,
        sentiment: 'positive' as const,
        escalationScore: 10,
        suggestions: ['Confirm delivery timeline', 'Add signature confirmation', 'Prepare backup options']
      }
    };

    const responseData = responses[currentScenario.id as keyof typeof responses];

    return {
      ...responseData,
      processingTime,
      orderData: {
        orderNumber,
        status: 'Processing',
        value: '$89.99',
        customer: 'Sarah Johnson',
        shippingMethod: 'Express'
      }
    };
  };

  const handleSendMessage = async () => {
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: currentScenario.query,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    setShowMetrics(true);

    // Add system message showing AI is thinking
    const systemMessage: AIMessage = {
      id: `system-${Date.now()}`,
      type: 'system',
      content: 'AI is analyzing your query...',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, systemMessage]);

    try {
      const aiResponse = await simulateAIProcessing(currentScenario.query, currentScenario.orderNumber);
      
      // Remove system message and add AI response
      setMessages(prev => prev.filter(msg => msg.type !== 'system'));
      
      const aiMessage: AIMessage = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: aiResponse.content,
        timestamp: Date.now(),
        metadata: {
          tone: aiResponse.tone,
          confidence: aiResponse.confidence,
          sentiment: aiResponse.sentiment,
          escalationScore: aiResponse.escalationScore,
          processingTime: aiResponse.processingTime,
          orderData: aiResponse.orderData,
          suggestions: aiResponse.suggestions
        }
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI processing error:', error);
    } finally {
      setIsProcessing(false);
      setProcessingSteps([]);
    }
  };

  const getToneColor = (tone: string) => {
    const colors = {
      empathetic: 'text-purple-600 bg-purple-50 border-purple-200',
      professional: 'text-blue-600 bg-blue-50 border-blue-200',
      urgent: 'text-red-600 bg-red-50 border-red-200',
      reassuring: 'text-green-600 bg-green-50 border-green-200',
      apologetic: 'text-orange-600 bg-orange-50 border-orange-200'
    };
    return colors[tone as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="w-4 h-4 text-green-500" />;
      case 'negative': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with Live Metrics */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-50 to-stone-50 border border-red-100 text-red-700 text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            <span>Neural Response Engine</span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Next-Generation AI
            <span className="bg-gradient-to-r from-red-500 to-stone-700 bg-clip-text text-transparent"> Support Intelligence</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Watch our neural engine analyze customer emotions, fetch real order data, 
            and craft perfect responses in real-time
          </p>
        </div>

        {/* Live Metrics Dashboard */}
        {showMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-red-600" />
                <span className="text-2xl font-bold text-stone-900">{realTimeMetrics.accuracy.toFixed(1)}%</span>
              </div>
              <p className="text-sm text-stone-600">Accuracy Rate</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-stone-900">{realTimeMetrics.responseTime.toFixed(1)}s</span>
              </div>
              <p className="text-sm text-stone-600">Response Time</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Heart className="w-5 h-5 text-green-600" />
                <span className="text-2xl font-bold text-stone-900">{realTimeMetrics.customerSatisfaction.toFixed(1)}%</span>
              </div>
              <p className="text-sm text-stone-600">Satisfaction</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-2xl font-bold text-stone-900">{realTimeMetrics.escalationReduction.toFixed(1)}%</span>
              </div>
              <p className="text-sm text-stone-600">Escalation Reduction</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Scenario Selector */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center space-x-2">
              <Shuffle className="w-5 h-5 text-red-600" />
              <span>Demo Scenarios</span>
            </h3>
            <div className="space-y-3">
              {DEMO_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => setCurrentScenario(scenario)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    currentScenario.id === scenario.id
                      ? 'border-red-200 bg-red-50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <h4 className="font-semibold text-stone-900 mb-1">{scenario.title}</h4>
                  <p className="text-sm text-stone-600 mb-2">{scenario.context}</p>
                  <span className="inline-flex px-2 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-mono">
                    {scenario.orderNumber}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={handleSendMessage}
              disabled={isProcessing}
              className="w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Send Query</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-stone-800 to-black p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Glidia AI Assistant</h3>
                    <p className="text-stone-300 text-sm">Neural Response Engine v2.1</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                  <p className="text-stone-500">Select a scenario and click "Send Query" to see the AI in action</p>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-red-500 text-white'
                      : message.type === 'system'
                      ? 'bg-stone-100 text-stone-600'
                      : 'bg-stone-50 border border-stone-200'
                  }`}>
                    {message.type !== 'system' && (
                      <div className="flex items-center space-x-2 mb-2">
                        {message.type === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4 text-red-600" />
                        )}
                        <span className="font-medium text-sm">
                          {message.type === 'user' ? 'Customer' : 'AI Assistant'}
                        </span>
                      </div>
                    )}
                    
                    <p className={`leading-relaxed ${message.type === 'ai' ? 'text-stone-700' : ''}`}>
                      {message.content}
                    </p>

                    {/* AI Metadata */}
                    {message.metadata && (
                      <div className="mt-4 pt-3 border-t border-stone-200 space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getToneColor(message.metadata.tone)}`}>
                            {message.metadata.tone}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs border border-blue-200">
                            {message.metadata.confidence}% confident
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-stone-100 text-stone-700 text-xs border border-stone-200">
                            {getSentimentIcon(message.metadata.sentiment)}
                            <span className="ml-1">{message.metadata.sentiment}</span>
                          </span>
                        </div>
                        
                        {message.metadata.suggestions && (
                          <div className="text-xs text-stone-600">
                            <p className="font-medium mb-1">Auto-generated actions:</p>
                            <ul className="space-y-1">
                              {message.metadata.suggestions.map((suggestion, idx) => (
                                <li key={idx} className="flex items-center space-x-1">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  <span>{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Processing Steps */}
              {isProcessing && processingSteps.length > 0 && (
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Activity className="w-4 h-4 text-red-600 animate-pulse" />
                    <span className="font-medium text-stone-900">AI Processing</span>
                  </div>
                  <div className="space-y-2">
                    {processingSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-stone-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Actions */}
            <div className="border-t border-stone-200 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-stone-500">
                  Powered by Glidia Neural Engine
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-stone-500 hover:text-stone-700 transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-stone-500 hover:text-stone-700 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-stone-500 hover:text-stone-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
