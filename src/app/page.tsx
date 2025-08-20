'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Brain, 
  Zap, 
  Database, 
  MessageSquare, 
  Target,
  ArrowRight,
  Play,
  Clock,
  TrendingDown,
  Shield,
  CheckCircle,
  Star,
  DollarSign,
  Calendar,
  Package,
  Activity,
  Network,
  Eye,
  Layers,
  Code,
  Cpu,
  Bot,
  Send,
  User,
  RefreshCw,
  Sparkles,
  ChevronRight,
  Search,
  FileCheck,
  Reply
} from 'lucide-react';

// Type definitions
type UserMessage = {
  type: 'user';
  text: string;
};

type AiMessage = {
  type: 'ai';
  text: string;
  metadata?: {
    confidence: string;
    responseTime: string;
    source: string;
    actions?: string[];
  };
};

type DemoMessage = UserMessage | AiMessage;

export default function GlidiaLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [demoVisible, setDemoVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [demoMessages, setDemoMessages] = useState<DemoMessage[]>([
    { type: 'user', text: "Hi, where's my order #GLD-4821? It's been 3 days with no updates and I'm getting worried." },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Auto-advance story steps based on scroll
      if (storyRef.current) {
        const rect = storyRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
        const newStep = Math.floor(progress * 4);
        if (newStep !== activeStep && newStep < 4) {
          setActiveStep(newStep);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStep]);

  // Enhanced demo simulation
  useEffect(() => {
    if (demoVisible && demoMessages.length === 1) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setDemoMessages(prev => [...prev, {
            type: 'ai',
            text: "Hi Sarah! I've located your order #GLD-4821. It shipped yesterday via FedEx and is currently out for delivery in Chicago. Expected arrival: today by 3 PM. There was a slight weather delay, but it's on track now. I've sent updated tracking to your email with delivery photo notifications. Would you like me to text you when it arrives?",
            metadata: {
              confidence: "98.7%",
              responseTime: "1.2s",
              source: "Shopify + FedEx API",
              actions: ["Located order", "Checked tracking", "Sent notification"]
            }
          }]);
        }, 3000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [demoVisible, demoMessages.length]);

  // Minimal grid background component
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

  const storySteps = [
    {
      step: 1,
      title: "Customer Reaches Out",
      description: "Sarah is anxious about her daughter's birthday gift. She opens your support widget at 11 PM, frustrated and worried about delivery timing.",
      icon: MessageSquare,
      illustration: (
        <div className="relative w-full h-48 bg-stone-900/30 rounded-2xl border border-stone-800 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center border border-stone-700">
                <User className="w-8 h-8 text-stone-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">!</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-stone-800/80 backdrop-blur-sm rounded-lg p-3">
            <p className="text-stone-300 text-xs">"Where's my order? It's been 3 days..."</p>
          </div>
        </div>
      )
    },
    {
      step: 2,
      title: "Instant Detection & Analysis",
      description: "Glidia's neural engine immediately recognizes this as a high-urgency WISMO query, analyzes sentiment (anxious), and prepares contextual response.",
      icon: Brain,
      illustration: (
        <div className="relative w-full h-48 bg-stone-900/30 rounded-2xl border border-stone-800 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Brain className="w-16 h-16 text-white animate-pulse" />
              <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-stone-800/80 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-white text-xs font-mono">ANALYZING...</span>
          </div>
          <div className="absolute bottom-4 right-4 bg-stone-800/80 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-stone-300 text-xs">Sentiment: Urgent</span>
          </div>
        </div>
      )
    },
    {
      step: 3,
      title: "Real-Time Data Gathering",
      description: "Within milliseconds, Glidia pulls live data from Shopify, FedEx tracking, weather APIs, and delivery databases to build complete context.",
      icon: Database,
      illustration: (
        <div className="relative w-full h-48 bg-stone-900/30 rounded-2xl border border-stone-800 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Database className="w-16 h-16 text-white" />
          </div>
          <div className="absolute top-4 left-4 space-y-1">
            <div className="bg-emerald-900/40 border border-emerald-500/30 rounded px-2 py-1">
              <span className="text-emerald-300 text-xs">Shopify ✓</span>
            </div>
            <div className="bg-blue-900/40 border border-blue-500/30 rounded px-2 py-1">
              <span className="text-blue-300 text-xs">FedEx ✓</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 space-y-1">
            <div className="bg-purple-900/40 border border-purple-500/30 rounded px-2 py-1">
              <span className="text-purple-300 text-xs">Weather ✓</span>
            </div>
            <div className="bg-orange-900/40 border border-orange-500/30 rounded px-2 py-1">
              <span className="text-orange-300 text-xs">Location ✓</span>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 4,
      title: "Empathetic Response Delivered",
      description: "Glidia crafts a personalized, empathetic response that acknowledges Sarah's concern, provides exact tracking info, explains the delay, and offers proactive follow-up.",
      icon: Reply,
      illustration: (
        <div className="relative w-full h-48 bg-stone-900/30 rounded-2xl border border-stone-800 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-black" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <p className="text-black text-xs">"Hi Sarah! Found your order - it's out for delivery today by 3 PM..."</p>
          </div>
          <div className="absolute top-4 right-4 bg-emerald-800/80 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-emerald-300 text-xs font-mono">1.2s</span>
          </div>
        </div>
      )
    }
  ];

  const neuralPillars = [
    {
      title: "Natural Language Understanding",
      description: "Advanced transformer models decode customer intent, emotion, and urgency",
      icon: Brain
    },
    {
      title: "Real-time Data Integration", 
      description: "Seamless connectivity with commerce platforms and logistics providers",
      icon: Network
    },
    {
      title: "Sentiment + Urgency Analysis",
      description: "Emotional intelligence that adapts response tone and priority",
      icon: Activity
    },
    {
      title: "Brand Tone Controls",
      description: "Maintains your unique voice while delivering consistent experiences",
      icon: Target
    }
  ];

  const testimonials = [
    {
      quote: "Reduced our support load by 87% in first month. Customers think they're talking to our best agents.",
      author: "Sarah Chen",
      role: "Head of Customer Experience",
      company: "TechFlow",
      impact: "87% reduction",
      rating: 5
    },
    {
      quote: "ROI was immediate. $45k saved monthly while improving response times from hours to seconds.",
      author: "Marcus Rodriguez",
      role: "VP Operations", 
      company: "ScaleCommerce",
      impact: "$45k saved",
      rating: 5
    },
    {
      quote: "Implementation took 2 hours. Results were instant. This is the future of customer support.",
      author: "Emily Zhang",
      role: "CTO",
      company: "NextGen Retail",
      impact: "2hr setup",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <MinimalBackground />
      
      {/* Navbar */}
      <Navbar variant="landing" showDashboardLink={true} />

      {/* Centered Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-24">
        {/* Enhanced background with dashboard-style pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Brand Tag */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 border border-stone-800 rounded-full text-stone-400 text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Glidia™ AI</span>
          </div>

          {/* Main Header - Centered */}
          <h1 className="text-6xl lg:text-8xl font-extralight leading-[0.9] tracking-tight mb-8">
            <div className="text-white mb-3">Eliminate</div>
            <div className="text-white mb-3">Post-Purchase</div>
            <div className="text-stone-400 font-light">Support Chaos</div>
          </h1>
          
          {/* Enhanced Subheader Box */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-stone-950/60 backdrop-blur-xl border border-stone-700/50 rounded-2xl p-8">
              <p className="text-xl lg:text-2xl text-stone-300 leading-relaxed font-light mb-6">
                AI-powered WISMO automation that transforms frustrated customers into advocates in <span className="text-white font-medium">under 2 seconds</span>
              </p>
              
              {/* Key Benefits */}
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-light text-white">83%</div>
                  <div className="text-sm text-stone-400">Fewer Support Tickets</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-light text-white">1.8s</div>
                  <div className="text-sm text-stone-400">Average Response Time</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-light text-white">99.3%</div>
                  <div className="text-sm text-stone-400">Resolution Accuracy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Glidia Care Widget Demo */}
          <div className="max-w-2xl mx-auto">
            {/* Demo Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-white mb-3">Experience Glidia Care</h2>
              <p className="text-stone-400">Watch our AI handle a real customer query in real-time</p>
            </div>

            {/* Widget Container */}
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute -inset-6 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl blur-2xl opacity-50"></div>
              
              <div className="relative bg-stone-950/80 backdrop-blur-xl border border-stone-700/50 rounded-3xl overflow-hidden shadow-2xl">
                {/* Widget Header */}
                <div className="bg-white text-black px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black/10 rounded-xl flex items-center justify-center">
                      <Bot className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Glidia Care</div>
                      <div className="text-xs text-black/60">AI Support Assistant</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Live Demo</span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-6 space-y-4 min-h-[400px]">
                  {demoMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'user' ? (
                        <div className="max-w-sm bg-stone-800/80 border border-stone-700 rounded-2xl p-4">
                          <p className="text-stone-100 text-sm leading-relaxed">{message.text}</p>
                        </div>
                      ) : (
                        <div className="max-w-lg bg-white text-black rounded-2xl p-4 shadow-lg">
                          <p className="text-sm leading-relaxed mb-4">{message.text}</p>
                          
                          {/* AI Metadata */}
                          {message.metadata && (
                            <>
                              <div className="grid grid-cols-3 gap-3 text-xs mb-4 pt-3 border-t border-stone-200">
                                <div className="flex items-center space-x-1">
                                  <Target className="w-3 h-3 text-emerald-600" />
                                  <span className="text-stone-600">{message.metadata.confidence}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3 text-blue-600" />
                                  <span className="text-stone-600">{message.metadata.responseTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Database className="w-3 h-3 text-purple-600" />
                                  <span className="text-stone-600">{message.metadata.source}</span>
                                </div>
                              </div>
                              
                              {/* Actions taken */}
                              {message.metadata.actions && (
                                <div className="bg-stone-50 rounded-lg p-3 text-xs">
                                  <div className="font-medium text-stone-700 mb-2">Actions Taken:</div>
                                  <div className="space-y-1">
                                    {message.metadata.actions.map((action, idx) => (
                                      <div key={idx} className="text-stone-600">✓ {action}</div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl p-4 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                          <span className="text-stone-500 text-xs">Glidia is analyzing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Widget Footer with Demo Controls */}
                <div className="px-6 py-4 bg-stone-900/50 border-t border-stone-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => {
                          setDemoMessages([demoMessages[0]]);
                          setDemoVisible(true);
                        }}
                        disabled={isTyping}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-white text-black rounded-lg text-xs font-medium hover:bg-stone-100 transition-colors disabled:opacity-50"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Restart Demo</span>
                      </button>
                      <div className="text-xs text-stone-500">
                        Powered by Glidia Neural Engine
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-stone-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>1.8s avg</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingDown className="w-3 h-3" />
                        <span>83% reduction</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Performance Indicators */}
              <div className="absolute -top-3 -right-3 bg-black/90 backdrop-blur-xl border border-stone-700/50 rounded-2xl px-3 py-2 text-xs">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span className="text-white">AI Powered</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center space-x-4 mt-12">
              <button 
                onClick={() => window.open('/app/dashboard?shop=glidiatest.myshopify.com', '_blank')}
                className="group px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-stone-100 transition-all duration-300 flex items-center space-x-3"
              >
                <Play className="w-5 h-5" />
                <span>Try Full Dashboard</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button 
                onClick={() => setDemoVisible(true)}
                className="px-8 py-4 border border-stone-700 text-stone-300 rounded-xl font-medium hover:border-stone-600 hover:text-white transition-all duration-300"
              >
                Watch Demo Again
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Storytelling Section */}
      <section ref={storyRef} className="py-32 px-6 lg:px-8 relative bg-black">
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-2 px-4 py-2 border border-stone-800 rounded-full text-stone-400 text-sm font-medium mb-8">
              <Package className="w-4 h-4" />
              <span>How Glidia Care Works</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light mb-8">
              From <span className="text-white">Frustrated Query</span><br />
              to <span className="text-white">Happy Customer</span>
            </h2>
            <p className="text-xl text-stone-500 max-w-3xl mx-auto leading-relaxed font-light">
              Watch how our AI transforms a real customer support interaction in real-time
            </p>
          </div>

          {/* Vertical Story Timeline */}
          <div className="space-y-24">
            {storySteps.map((step, index) => (
              <div 
                key={index}
                className={`relative transition-all duration-1000 ${
                  activeStep >= index ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-12'
                }`}
              >
                {/* Connection line */}
                {index < storySteps.length - 1 && (
                  <div className="absolute left-8 top-24 w-px h-24 bg-stone-800"></div>
                )}
                
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Step content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${
                        activeStep >= index 
                          ? 'border-white bg-white text-black' 
                          : 'border-stone-700 text-stone-400'
                      }`}>
                        <step.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-sm text-stone-500 font-medium">Step {step.step}</div>
                        <h3 className="text-2xl font-medium text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-stone-400 text-lg leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>

                  {/* Illustration */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {step.illustration}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results summary */}
          <div className="mt-32 text-center">
            <div className="bg-stone-950/60 backdrop-blur-xl border border-stone-700/50 rounded-3xl p-12">
              <h3 className="text-3xl font-light text-white mb-8">The Result</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-light text-white mb-2">1.2s</div>
                  <div className="text-stone-400">Total resolution time</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-white mb-2">100%</div>
                  <div className="text-stone-400">Customer satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-white mb-2">$0</div>
                  <div className="text-stone-400">Human agent cost</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neural Engine Section */}
      <section className="py-32 px-6 lg:px-8 bg-stone-950 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 border border-stone-800 rounded-full text-stone-400 text-sm font-medium mb-8">
              <Cpu className="w-4 h-4" />
              <span>Neural Engine</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light mb-8">
              The <span className="text-white">Intelligence</span><br />
              Behind It All
            </h2>
            <p className="text-xl text-stone-500 max-w-3xl mx-auto leading-relaxed font-light">
              Advanced AI architecture that powers human-like understanding at enterprise scale.
            </p>
          </div>

          {/* Clean Pillars */}
          <div className="grid lg:grid-cols-4 gap-8">
            {neuralPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="relative group">
                  <div className="bg-black/20 border border-stone-800 rounded-2xl p-8 h-full hover:border-stone-700 transition-all duration-300">
                    <div className="w-10 h-10 border border-stone-700 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-stone-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-4">{pillar.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed font-light">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl font-light mb-8">
              Trusted by <span className="text-white">Industry Leaders</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-stone-950/50 border border-stone-800 rounded-2xl overflow-hidden">
                <div className="h-px bg-white"></div>
                <div className="p-8">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-white fill-current" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-white text-lg leading-relaxed mb-6 font-light">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Impact */}
                  <div className="inline-flex px-3 py-1 border border-stone-700 text-stone-300 rounded-full text-sm font-medium mb-6">
                    {testimonial.impact}
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-medium text-sm">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-white">{testimonial.author}</div>
                      <div className="text-stone-500 text-sm">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 lg:px-8 bg-stone-950 relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl lg:text-6xl font-light mb-8">
            Transform Your Support Experience
          </h2>
          <p className="text-xl text-stone-500 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Join 500+ brands delivering exceptional customer experiences with AI
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => window.open('http://localhost:3000/app/dashboard?shop=glidiatest.myshopify.com', '_blank')}
              className="px-8 py-4 bg-white text-black rounded font-medium hover:bg-stone-100 transition-colors duration-200"
            >
              Start Free Trial
            </button>
            <button className="px-8 py-4 border border-stone-800 text-stone-300 rounded font-medium hover:border-stone-700 hover:text-white transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}