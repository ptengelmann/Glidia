'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  User, 
  Zap, 
  MessageSquare, 
  Clock, 
  Target,
  Brain,
  Activity,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shuffle,
  Copy,
  Download,
  Share2,
  Heart,
  Package,
  RefreshCw
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
    title: 'Missing Package Anxiety',
    query: "Hi, I ordered something 2 weeks ago and it still hasn't arrived. The tracking shows delivered but I never got it. I'm really worried about my $300 order!",
    orderNumber: '#WM-1001',
    context: 'High-value order concern',
    icon: Package,
    urgency: 'high'
  },
  {
    id: 'wismo-delay', 
    title: 'Shipping Delay Query',
    query: "Hello, my order was supposed to arrive yesterday but tracking says it's still in transit. When will I actually get it?",
    orderNumber: '#WM-1002',
    context: 'Standard delay inquiry',
    icon: Clock,
    urgency: 'medium'
  },
  {
    id: 'wismr-defective',
    title: 'Defective Product Return',
    query: "The product I received is broken and doesn't work at all. I need to return this immediately and get my money back!",
    orderNumber: '#WM-1003',
    context: 'Product quality issue',
    icon: AlertCircle,
    urgency: 'high'
  },
  {
    id: 'wismo-gift',
    title: 'Gift Delivery Timing',
    query: "I ordered this as a birthday gift and it needs to arrive by Friday. Can you please confirm it will make it on time?",
    orderNumber: '#WM-1004',
    context: 'Time-sensitive delivery',
    icon: Heart,
    urgency: 'medium'
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
        content: `Absolutely! I understand how important this birthday gift is. Good news - your order #WM-1004 is on track for Thursday delivery, one day ahead of your Friday deadline!\n\nI've added signature confirmation and gift packaging notes to ensure safe delivery. You'll receive a delivery notification with photo confirmation as soon as it arrives.\n\nIf anything changes, I have backup options ready including local store pickup or expedited replacement. This gift will definitely make it on time!`,
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
      content: 'Neural engine analyzing query...',
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

  const resetDemo = () => {
    setMessages([]);
    setShowMetrics(false);
    setRealTimeMetrics({
      accuracy: 0,
      responseTime: 0,
      customerSatisfaction: 0,
      escalationReduction: 0
    });
    setProcessingSteps([]);
  };

  const getUrgencyIndicator = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-white border-stone-600';
      case 'medium': return 'bg-stone-800 border-stone-700';
      default: return 'bg-stone-900 border-stone-800';
    }
  };

  return (
    <div className="w-full">
      {/* Clean Metrics Dashboard */}
      {showMetrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Target, label: 'Accuracy', value: realTimeMetrics.accuracy.toFixed(1), unit: '%' },
            { icon: Clock, label: 'Response Time', value: realTimeMetrics.responseTime.toFixed(1), unit: 's' },
            { icon: Heart, label: 'Satisfaction', value: realTimeMetrics.customerSatisfaction.toFixed(1), unit: '%' },
            { icon: Activity, label: 'Reduction', value: realTimeMetrics.escalationReduction.toFixed(1), unit: '%' }
          ].map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-stone-950/50 border border-stone-800 rounded-2xl p-4 hover:border-stone-700 transition-all duration-300">
                <div className="w-8 h-8 border border-stone-700 rounded-lg flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-stone-400" />
                </div>
                <div className="flex items-baseline space-x-1 mb-2">
                  <span className="text-2xl font-light text-white">{metric.value}</span>
                  <span className="text-sm text-stone-500">{metric.unit}</span>
                </div>
                <p className="text-xs text-stone-500">{metric.label}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Clean Scenario Selector */}
        <div className="lg:col-span-1">
          <div className="bg-stone-950/50 border border-stone-800 rounded-2xl p-6 sticky top-24">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Shuffle className="w-4 h-4 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Demo Scenarios</h3>
                <p className="text-xs text-stone-500">Select a customer query</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              {DEMO_SCENARIOS.map((scenario) => {
                const Icon = scenario.icon;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => setCurrentScenario(scenario)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      currentScenario.id === scenario.id
                        ? 'border-white bg-white/5'
                        : 'border-stone-800 hover:border-stone-700 hover:bg-stone-900/50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${getUrgencyIndicator(scenario.urgency)}`}>
                        <Icon className="w-3 h-3 text-stone-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white mb-1 text-sm">{scenario.title}</h4>
                        <p className="text-xs text-stone-500 mb-2">{scenario.context}</p>
                        <span className="inline-flex px-2 py-1 bg-stone-800 text-stone-400 text-xs font-mono rounded">
                          {scenario.orderNumber}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              <button
                onClick={handleSendMessage}
                disabled={isProcessing}
                className="w-full bg-white text-black py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-100 transition-all flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Send Query</span>
                  </>
                )}
              </button>
              
              {messages.length > 0 && (
                <button
                  onClick={resetDemo}
                  className="w-full bg-stone-800 text-white py-3 rounded-xl font-medium hover:bg-stone-700 transition-all flex items-center justify-center space-x-2 border border-stone-700"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset Demo</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Clean Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-stone-950/50 border border-stone-800 rounded-2xl overflow-hidden">
            {/* Minimal Chat Header */}
            <div className="bg-white text-black p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black/10 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Glidia Care</h3>
                    <p className="text-black/60 text-sm">WISMO Automation</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
                  <span className="text-sm font-medium">AI Active</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-6 h-6 text-black" />
                  </div>
                  <p className="text-white mb-2">Neural Engine Ready</p>
                  <p className="text-stone-500 text-sm">Select a scenario and send query to see AI in action</p>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md rounded-2xl overflow-hidden ${
                    message.type === 'user'
                      ? 'bg-stone-900 border border-stone-700'
                      : message.type === 'system'
                      ? 'bg-stone-800 border border-stone-700'
                      : 'bg-white text-black'
                  }`}>
                    <div className="px-4 py-3">
                      {message.type !== 'system' && (
                        <div className="flex items-center space-x-2 mb-2">
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-stone-400" />
                          ) : (
                            <Bot className="w-4 h-4 text-black" />
                          )}
                          <span className="font-medium text-sm">
                            {message.type === 'user' ? 'Customer' : 'Glidia Care'}
                          </span>
                        </div>
                      )}
                      
                      <p className="leading-relaxed text-sm">
                        {message.content}
                      </p>

                      {/* Clean AI Metadata */}
                      {message.metadata && (
                        <div className="mt-4 pt-3 border-t border-stone-300/20 space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2 py-1 bg-black/10 text-black text-xs rounded">
                              {message.metadata.tone}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 bg-black/10 text-black text-xs rounded">
                              {message.metadata.confidence}% confident
                            </span>
                            <span className="inline-flex items-center px-2 py-1 bg-black/10 text-black text-xs rounded">
                              {message.metadata.sentiment}
                            </span>
                          </div>
                          
                          {message.metadata.suggestions && (
                            <div className="text-xs text-black/70">
                              <p className="font-medium mb-2 text-black">Auto-generated actions:</p>
                              <ul className="space-y-1">
                                {message.metadata.suggestions.map((suggestion, idx) => (
                                  <li key={idx} className="flex items-center space-x-2">
                                    <CheckCircle className="w-3 h-3 text-black flex-shrink-0" />
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
                </div>
              ))}

              {/* Clean Processing Steps */}
              {isProcessing && processingSteps.length > 0 && (
                <div className="bg-stone-800 rounded-xl p-4 border border-stone-700">
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="w-4 h-4 text-white animate-pulse" />
                    <span className="font-medium text-white">Neural Processing</span>
                  </div>
                  <div className="space-y-2">
                    {processingSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />
                        <span className="text-stone-300">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Clean Chat Actions */}
            <div className="border-t border-stone-800 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-stone-500">
                  Powered by Glidia Neural Engine
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-stone-500 hover:text-white transition-colors rounded-lg hover:bg-stone-800">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-stone-500 hover:text-white transition-colors rounded-lg hover:bg-stone-800">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-stone-500 hover:text-white transition-colors rounded-lg hover:bg-stone-800">
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