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
  ThumbsUp,
  Package,
  Database,
  Cpu
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
    context: 'High-value order, delivery confusion',
    icon: Package,
    urgency: 'high'
  },
  {
    id: 'wismo-delay', 
    title: 'Shipping Delay Inquiry',
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
    context: 'Angry customer, defective product',
    icon: AlertCircle,
    urgency: 'high'
  },
  {
    id: 'wismo-gift',
    title: 'Gift Delivery Concern',
    query: "I ordered this as a birthday gift and it needs to arrive by Friday. Can you please confirm it will make it on time?",
    orderNumber: '#WM-1004',
    context: 'Time-sensitive gift delivery',
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

  const getToneColor = (tone: string) => {
    const colors = {
      empathetic: 'from-purple-500 to-purple-600',
      professional: 'from-blue-500 to-blue-600',
      urgent: 'from-red-500 to-red-600',
      reassuring: 'from-emerald-500 to-emerald-600',
      apologetic: 'from-amber-500 to-amber-600'
    };
    return colors[tone as keyof typeof colors] || 'from-stone-500 to-stone-600';
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="w-4 h-4 text-emerald-400" />;
      case 'negative': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-500/30 bg-red-500/10';
      case 'medium': return 'border-amber-500/30 bg-amber-500/10';
      default: return 'border-emerald-500/30 bg-emerald-500/10';
    }
  };

  return (
    <div className="w-full">
      {/* Live Metrics Dashboard */}
      {showMetrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Target, label: 'Accuracy', value: realTimeMetrics.accuracy.toFixed(1), unit: '%', color: 'from-red-500 to-red-600' },
            { icon: Clock, label: 'Response Time', value: realTimeMetrics.responseTime.toFixed(1), unit: 's', color: 'from-amber-500 to-amber-600' },
            { icon: Heart, label: 'Satisfaction', value: realTimeMetrics.customerSatisfaction.toFixed(1), unit: '%', color: 'from-emerald-500 to-emerald-600' },
            { icon: TrendingUp, label: 'Reduction', value: realTimeMetrics.escalationReduction.toFixed(1), unit: '%', color: 'from-violet-500 to-violet-600' }
          ].map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="group relative">
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className={`w-full h-full rounded-2xl bg-gradient-to-r ${metric.color} opacity-20`}></div>
                </div>
                
                <div className="relative bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-3 right-3 w-2 h-2 bg-white/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-xl relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Icon className="w-6 h-6 text-white relative z-10" />
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl font-black text-white">{metric.value}</span>
                        <span className="text-lg font-bold text-white/60">{metric.unit}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-white/80 font-medium">{metric.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Scenario Selector */}
        <div className="lg:col-span-1">
          <div className="bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 sticky top-24">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Shuffle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Demo Scenarios</h3>
                <p className="text-xs text-white/60">Select a customer query</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              {DEMO_SCENARIOS.map((scenario) => {
                const Icon = scenario.icon;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => setCurrentScenario(scenario)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${
                      currentScenario.id === scenario.id
                        ? 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/10'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getUrgencyColor(scenario.urgency)}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white mb-1 text-sm">{scenario.title}</h4>
                        <p className="text-xs text-white/60 mb-2 line-clamp-2">{scenario.context}</p>
                        <span className="inline-flex px-2 py-1 rounded-md bg-white/10 text-white/80 text-xs font-mono">
                          {scenario.orderNumber}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSendMessage}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-red-500/25"
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
          <div className="bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Glidia Care</h3>
                    <p className="text-red-100 text-sm">WISMO & WISMR Automation</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <span className="text-sm font-medium">AI Active</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white/60 mb-2">Neural Engine Ready</p>
                  <p className="text-white/40 text-sm">Select a scenario and click "Send Query" to see the AI in action</p>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md rounded-2xl overflow-hidden ${
                    message.type === 'user'
                      ? 'bg-white/10 backdrop-blur-sm border border-white/20'
                      : message.type === 'system'
                      ? 'bg-amber-500/20 border border-amber-500/30'
                      : 'bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30'
                  }`}>
                    <div className="px-4 py-3">
                      {message.type !== 'system' && (
                        <div className="flex items-center space-x-2 mb-2">
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-white/80" />
                          ) : (
                            <Bot className="w-4 h-4 text-red-400" />
                          )}
                          <span className="font-medium text-sm text-white/90">
                            {message.type === 'user' ? 'Customer' : 'Glidia Care'}
                          </span>
                        </div>
                      )}
                      
                      <p className="leading-relaxed text-white/90 text-sm">
                        {message.content}
                      </p>

                      {/* AI Metadata */}
                      {message.metadata && (
                        <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r ${getToneColor(message.metadata.tone)} text-white`}>
                              {message.metadata.tone}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30">
                              {message.metadata.confidence}% confident
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/10 text-white/80 text-xs border border-white/20">
                              {getSentimentIcon(message.metadata.sentiment)}
                              <span className="ml-1">{message.metadata.sentiment}</span>
                            </span>
                          </div>
                          
                          {message.metadata.suggestions && (
                            <div className="text-xs text-white/70">
                              <p className="font-medium mb-2 text-white/90">Auto-generated actions:</p>
                              <ul className="space-y-1">
                                {message.metadata.suggestions.map((suggestion, idx) => (
                                  <li key={idx} className="flex items-center space-x-2">
                                    <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
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

              {/* Processing Steps */}
              {isProcessing && processingSteps.length > 0 && (
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <Cpu className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span className="font-medium text-amber-300">Glidia Neural Processing</span>
                  </div>
                  <div className="space-y-2">
                    {processingSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-white/80">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Actions */}
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/60">
                  Powered by Glidia Neural Engine
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-white/60 hover:text-white/80 transition-colors rounded-lg hover:bg-white/10">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white/60 hover:text-white/80 transition-colors rounded-lg hover:bg-white/10">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white/60 hover:text-white/80 transition-colors rounded-lg hover:bg-white/10">
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