'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { 
  Package, 
  MessageSquare, 
  Zap, 
  BarChart3, 
  ArrowRight, 
  CheckCircle,
  TrendingUp,
  Shield,
  Bot,
  Clock,
  Users,
  Sparkles,
  Globe,
  ChevronDown,
  Star,
  Play,
  Brain,
  Target,
  Activity,
  Eye,
  Layers,
  Code,
  Database,
  Cpu,
  Network,
  Lock,
  Gauge,
  LineChart,
  PieChart,
  BarChart,
  MousePointer,
  Smartphone,
  Monitor,
  Headphones,
  Award,
  Rocket,
  Heart,
  ThumbsUp,
  MessageCircle,
  Calendar,
  DollarSign,
  Percent,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Building,
  ShoppingCart,
  TrendingDown,
  Minus,
  Plus,
  Send,
  Inbox,
  User,
  RefreshCw,
  Mail,
  Phone,
  Menu,
  X
} from 'lucide-react';

export default function GlidiaLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [activeStoryStep, setActiveStoryStep] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animatedGlitch, setAnimatedGlitch] = useState(false);
  const [showLiveDemo, setShowLiveDemo] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMessages, setDemoMessages] = useState([
    { sender: 'user', text: "Where's my order #12345? It was supposed to arrive yesterday." }
  ]);
  const [demoTyping, setDemoTyping] = useState(false);
  const [demoStage, setDemoStage] = useState(0);
  
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const testimonialRef = useRef(null);
  const pricingRef = useRef(null);
  const storyStepsRef = useRef([]);
  const liveDemoRef = useRef(null);

  // Enhanced scroll effects with intersection observer
  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    setScrollPosition(position);
    
    // Auto-advance story steps based on scroll
    const storySection = storyRef.current;
    if (storySection) {
      const rect = storySection.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const newStep = Math.floor(progress * storySteps.length);
      if (newStep !== activeStoryStep && newStep < storySteps.length) {
        setActiveStoryStep(newStep);
      }
    }
  }, [activeStoryStep]);

  // Initialize effects
  useEffect(() => {
    setIsVisible(true);
    
    window.addEventListener('scroll', handleScroll);
    
    // Run initial scroll check
    handleScroll();
    
    // Trigger glitch animation occasionally
    const glitchInterval = setInterval(() => {
      setAnimatedGlitch(true);
      setTimeout(() => setAnimatedGlitch(false), 500);
    }, 15000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glitchInterval);
    };
  }, [handleScroll]);

  // Auto-cycle metrics
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(metricsInterval);
  }, []);

  // Process demo messages with realistic timing
  useEffect(() => {
    if (showLiveDemo && demoStage < 3) {
      const stages = [
        // Stage 1: AI response
        () => {
          setDemoTyping(true);
          setTimeout(() => {
            setDemoTyping(false);
            setDemoMessages(prev => [
              ...prev, 
              { 
                sender: 'ai', 
                text: "Hi Sarah, I've located your order #12345. According to the tracking information, your package was actually delivered today at 2:37 PM to your front porch. There should be a confirmation photo in your email. Is there anything else I can help with?",
                metadata: {
                  confidence: 98.7,
                  response_time: '1.2s',
                  source: 'Shopify + USPS API'
                }
              }
            ]);
            setDemoStage(1);
          }, 2500);
        },
        // Stage 2: User follow-up
        () => {
          setTimeout(() => {
            setDemoMessages(prev => [
              ...prev,
              { sender: 'user', text: "I don't see it. Can you help me contact the courier?" }
            ]);
            setDemoStage(2);
          }, 4000);
        },
        // Stage 3: AI resolution
        () => {
          setDemoTyping(true);
          setTimeout(() => {
            setDemoTyping(false);
            setDemoMessages(prev => [
              ...prev,
              { 
                sender: 'ai', 
                text: "I've initiated a delivery investigation with USPS (ref #US7823) and notified our fulfillment team. You'll receive updates via email. If the package isn't found by tomorrow, we'll ship a replacement with expedited delivery at no cost. Would you like me to text you when I have an update?",
                metadata: {
                  actions_taken: ['USPS investigation', 'Team notification'],
                  contingency: 'Replacement ready'
                }
              }
            ]);
            setDemoStage(3);
          }, 3000);
        }
      ];
      
      if (stages[demoStage]) {
        stages[demoStage]();
      }
    }
  }, [showLiveDemo, demoStage]);

  // Stats with improved metrics
  const stats = [
    { 
      value: "83%", 
      label: "Ticket Reduction", 
      icon: TrendingDown,
      description: "Less support burden",
      color: "text-red-400",
      gradient: "from-red-500 to-red-600"
    },
    { 
      value: "1.8s", 
      label: "Response Time", 
      icon: Clock,
      description: "Lightning fast AI",
      color: "text-amber-400",
      gradient: "from-amber-400 to-amber-600"
    },
    { 
      value: "99.3%", 
      label: "Accuracy Rate", 
      icon: Target,
      description: "Human-level precision",
      color: "text-emerald-400",
      gradient: "from-emerald-500 to-emerald-600"
    },
    { 
      value: "24/7", 
      label: "Availability", 
      icon: Shield,
      description: "Global coverage",
      color: "text-red-400",
      gradient: "from-red-500 to-red-600"
    }
  ];

  // Enhanced story flow with Lottie-style illustrations
  const storySteps = [
    {
      step: 1,
      title: "Customer Query Detection",
      description: "Natural language processing identifies urgent WISMO queries with contextual understanding and sentiment analysis",
      icon: MessageSquare,
      color: "from-red-500 to-red-600",
      animation: "customerQuery"
    },
    {
      step: 2,
      title: "Neural Processing Engine",
      description: "Advanced AI analyzes sentiment, urgency, customer history, and order patterns for personalized responses",
      icon: Brain,
      color: "from-amber-500 to-red-500",
      animation: "neuralProcessing"
    },
    {
      step: 3,
      title: "Real-time Data Integration",
      description: "Seamlessly connects with Shopify, carriers, payment systems, and order databases for accurate information",
      icon: Database,
      color: "from-amber-500 to-amber-600",
      animation: "dataIntegration"
    },
    {
      step: 4,
      title: "Intelligent Solution Generation",
      description: "Generates empathetic, branded responses with actionable next steps, follow-up actions, and proactive solutions",
      icon: Send,
      color: "from-red-500 to-red-600",
      animation: "solutionGeneration"
    }
  ];

  // Enhanced testimonials
  const testimonials = [
    {
      quote: "Game changer. 85% fewer tickets, team focuses on strategy now.",
      author: "Sarah Chen",
      role: "Head of CX",
      company: "ModernStore",
      avatarFallback: "SC",
      rating: 5,
      impact: "-85% tickets",
      expanded: "Before Glidia, our team was drowning in WISMO tickets. Now we're focusing on CX strategy while the AI handles 85% of routine queries perfectly. The ROI was immediate and the implementation took just days."
    },
    {
      quote: "Customers think they're talking to our best agents. It's incredible.",
      author: "Marcus Rodriguez", 
      role: "CTO",
      company: "TechGear Pro",
      avatarFallback: "MR",
      rating: 5,
      impact: "97% accuracy",
      expanded: "We integrated Glidia with our Shopify Plus store and saw immediate results. Our customers get instant responses that perfectly match our brand voice, with personalized solutions to their order issues. The sentiment analysis is uncanny."
    },
    {
      quote: "Saved $28k first month. ROI was immediate and massive.",
      author: "Emily Zhang",
      role: "VP Ops",
      company: "GrowthCorp",
      avatarFallback: "EZ",
      rating: 5,
      impact: "$28k saved",
      expanded: "The cost savings exceeded our expectations immediately. We reduced our support staff needs by 60% while improving customer satisfaction scores. Glidia's AI doesn't just respond faster - it finds better solutions than our agents did."
    }
  ];

  // Pricing plans
  const pricingPlans = [
    {
      name: "Starter",
      price: 9.99,
      description: "Perfect for small stores",
      responses: 100,
      features: [
        { text: "100 AI responses/month", available: true },
        { text: "Basic analytics dashboard", available: true },
        { text: "Email support", available: true },
        { text: "Shopify integration", available: true },
        { text: "Custom brand voice", available: false },
        { text: "Advanced analytics", available: false }
      ],
      cta: "Start free trial",
      popular: false
    },
    {
      name: "Growth", 
      price: 29.99,
      description: "Most popular choice",
      responses: 1000,
      features: [
        { text: "1,000 AI responses/month", available: true },
        { text: "Advanced analytics dashboard", available: true },
        { text: "Priority support", available: true },
        { text: "Custom brand voice", available: true },
        { text: "Performance insights", available: true },
        { text: "API access", available: false }
      ],
      cta: "Start free trial",
      popular: true
    },
    {
      name: "Pro",
      price: 79.99,
      description: "For scaling operations",
      responses: "unlimited",
      features: [
        { text: "Unlimited AI responses", available: true },
        { text: "Advanced analytics suite", available: true },
        { text: "Custom branding options", available: true },
        { text: "Dedicated support team", available: true },
        { text: "Full API access", available: true },
        { text: "White-label options", available: true }
      ],
      cta: "Contact sales",
      popular: false
    }
  ];

  // Neural network background component
  const NeuralNetworkBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <svg 
        className="w-full h-full opacity-10" 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Static neural network lines */}
        <defs>
          <pattern id="neural-grid" patternUnits="userSpaceOnUse" width="100" height="100">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-grid)" />
        
        {/* Animated neural connections */}
        <g stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" fill="none">
          <line x1="0" y1="200" x2="400" y2="150" className="animate-pulse" style={{ animationDelay: '0s' }}>
            <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="400" y1="150" x2="800" y2="250" className="animate-pulse" style={{ animationDelay: '0.5s' }}>
            <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="800" y1="250" x2="1200" y2="200" className="animate-pulse" style={{ animationDelay: '1s' }}>
            <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="1200" y1="200" x2="1600" y2="300" className="animate-pulse" style={{ animationDelay: '1.5s' }}>
            <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
          </line>
          
          {/* Vertical connections */}
          <line x1="200" y1="0" x2="150" y2="400" className="animate-pulse" style={{ animationDelay: '2s' }}>
            <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="600" y1="0" x2="650" y2="400" className="animate-pulse" style={{ animationDelay: '2.5s' }}>
            <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="1000" y1="0" x2="950" y2="400" className="animate-pulse" style={{ animationDelay: '3s' }}>
            <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="1400" y1="0" x2="1450" y2="400" className="animate-pulse" style={{ animationDelay: '3.5s' }}>
            <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite" />
          </line>
        </g>
        
        {/* Neural nodes */}
        <g fill="rgba(239, 68, 68, 0.6)">
          <circle cx="200" cy="200" r="3" className="animate-pulse" style={{ animationDelay: '0s' }} />
          <circle cx="600" cy="150" r="3" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="1000" cy="250" r="3" className="animate-pulse" style={{ animationDelay: '2s' }} />
          <circle cx="1400" cy="200" r="3" className="animate-pulse" style={{ animationDelay: '3s' }} />
          <circle cx="400" cy="350" r="3" className="animate-pulse" style={{ animationDelay: '4s' }} />
          <circle cx="800" cy="300" r="3" className="animate-pulse" style={{ animationDelay: '5s' }} />
          <circle cx="1200" cy="400" r="3" className="animate-pulse" style={{ animationDelay: '6s' }} />
        </g>
      </svg>
    </div>
  );

  // Enhanced Navbar Component with Dropdown
  const EnhancedNavbar = () => (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-stone-800/50 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image 
                src="/GlidiaLogo.png" 
                alt="Glidia Logo" 
                width={40} 
                height={40} 
                className="rounded-xl"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
                Glidia
              </h1>
              <p className="text-xs text-stone-400 font-medium">AI Support Intelligence</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center space-x-1 text-stone-300 hover:text-red-400 transition-colors"
                onMouseEnter={() => setShowProductsDropdown(true)}
                onMouseLeave={() => setShowProductsDropdown(false)}
              >
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showProductsDropdown && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-stone-900/95 backdrop-blur-xl border border-stone-700/50 rounded-xl shadow-xl z-50"
                  onMouseEnter={() => setShowProductsDropdown(true)}
                  onMouseLeave={() => setShowProductsDropdown(false)}
                >
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">Glidia Care</h3>
                          <p className="text-xs text-stone-400">WISMO Automation</p>
                        </div>
                      </div>
                      <p className="text-sm text-stone-300">Automate order tracking queries with empathetic AI responses</p>
                    </div>
                    
                    <div className="border-t border-stone-700/50 pt-3">
                      <p className="text-xs text-stone-500 mb-2">Coming Soon:</p>
                      <div className="space-y-2">
                        <div className="text-sm text-stone-400">• Glidia Engage - Proactive outreach</div>
                        <div className="text-sm text-stone-400">• Glidia Insights - Analytics suite</div>
                        <div className="text-sm text-stone-400">• Glidia Automate - Full automation</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <a href="#about" className="text-stone-300 hover:text-red-400 transition-colors">About</a>
            <a href="#contact" className="text-stone-300 hover:text-red-400 transition-colors">Contact</a>
            <a href="#support" className="text-stone-300 hover:text-red-400 transition-colors">Support</a>
            
            <div className="flex items-center space-x-2 text-sm text-stone-400">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="font-medium">AI Active</span>
            </div>
            
            <button 
              onClick={() => window.open('/app/dashboard?shop=glidiatest.myshopify.com', '_blank')}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Try For Free
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-stone-800/50">
          <div className="px-6 py-4 space-y-4">
            <a href="#product" className="block text-stone-300 hover:text-red-400 transition-colors">Products</a>
            <a href="#about" className="block text-stone-300 hover:text-red-400 transition-colors">About</a>
            <a href="#contact" className="block text-stone-300 hover:text-red-400 transition-colors">Contact</a>
            <a href="#support" className="block text-stone-300 hover:text-red-400 transition-colors">Support</a>
            <button 
              onClick={() => window.open('/app/dashboard?shop=glidiatest.myshopify.com', '_blank')}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Try For Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  // Render custom glitch effect
  const renderGlitchText = (text, isActive = false) => (
    <div className="relative inline-block">
      <span className={`relative z-10 ${isActive ? 'text-transparent' : ''}`}>{text}</span>
      {isActive && (
        <>
          <span className="absolute top-0 left-0 text-red-500 opacity-70 z-20 animate-pulse">{text}</span>
          <span className="absolute top-0 left-0 text-amber-500 opacity-70 z-20 animate-pulse">{text}</span>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-stone-100 relative">
      {/* Neural Network Background */}
      <NeuralNetworkBackground />
      
      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-800 { animation-delay: 800ms; }
      `}</style>

      {/* Enhanced Navbar */}
     <Navbar variant="landing" showDashboardLink={true} />

      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen pt-28 pb-20 px-6 lg:px-8 flex items-center"
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-amber-900/10 z-10"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
<div className="opacity-0 animate-slideInLeft z-30 relative">
  <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-900/60 border border-red-600/50 text-red-300 text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
    <Sparkles className="w-4 h-4" />
    <span>Glidia AI</span>
    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
  </div>
  
  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight relative z-10">
    <span className="block">Eliminate</span>
    <span className="block bg-gradient-to-r from-red-400 via-red-500 to-amber-500 bg-clip-text text-transparent">
      Customer Support
    </span>
    <span className="block text-stone-200">
      Chaos Forever
    </span>
  </h1>
              
              <p className="text-xl text-stone-300 mb-8 max-w-xl leading-relaxed">
                AI-powered WISMO automation that transforms frustrated customers into satisfied advocates. 
                <span className="text-red-400 font-semibold"> Reduce tickets by 83%</span> with empathetic, intelligent responses.
              </p>

              {/* Credibility Blurb */}
              <div className="mb-10 p-4 bg-stone-900/50 rounded-lg border border-stone-700/30 backdrop-blur-sm">
                <p className="text-stone-300 text-sm">
                  <span className="text-red-400 font-semibold">Powered by Glidia Neural Engine:</span> Advanced AI that understands context, 
                  sentiment, and urgency to deliver human-like customer support at scale.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                <button 
                  onClick={() => setShowLiveDemo(true)}
                  className="group bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center space-x-3 shadow-lg shadow-red-500/25"
                >
                  <Play className="w-5 h-5" />
                  <span>Try Live Demo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => pricingRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-stone-800/60 text-stone-200 px-8 py-4 rounded-lg font-semibold hover:bg-stone-700/60 border border-stone-600/30 transition-all duration-300 flex items-center space-x-3 backdrop-blur-sm"
                >
                 <DollarSign className="w-5 h-5" />
                 <span>View Pricing</span>
               </button>
             </div>

             {/* Enhanced Metrics - Sleeker Cards */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {stats.map((stat, index) => {
                 const Icon = stat.icon;
                 const isActive = activeMetric === index;
                 return (
                   <div 
                     key={index} 
                     className={`relative group cursor-pointer transition-all duration-500 bg-gradient-to-br from-stone-900/80 to-black/80 backdrop-blur-sm border border-stone-700/40 rounded-xl p-5 hover:border-red-500/30 ${
                       isActive ? 'transform scale-105 border-red-500/50 shadow-lg shadow-red-500/10' : ''
                     }`}
                     onMouseEnter={() => setActiveMetric(index)}
                   >
                     {/* Sleek gradient overlay */}
                     <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${stat.gradient} opacity-0 transition-opacity duration-300 ${isActive ? 'opacity-5' : 'group-hover:opacity-5'}`}></div>
                     
                     <div className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
                       isActive 
                         ? `bg-gradient-to-r ${stat.gradient} shadow-lg` 
                         : 'bg-stone-800/80'
                     }`}>
                       <Icon className={`w-5 h-5 transition-colors duration-300 ${
                         isActive ? 'text-white' : stat.color
                       }`} />
                     </div>
                     <div className={`relative z-10 text-2xl font-bold mb-1 transition-all duration-300 ${
                       isActive ? 'text-white' : stat.color
                     }`}>
                       {stat.value}
                     </div>
                     <div className="relative z-10 text-sm font-medium text-stone-300 mb-1">{stat.label}</div>
                     <div className="relative z-10 text-xs text-stone-400">{stat.description}</div>
                   </div>
                 );
               })}
             </div>
           </div>
           
           {/* Interactive Demo Panel */}
           <div className="opacity-0 animate-slideInRight delay-200">
             <div className="relative">
               {/* Demo Container */}
               <div className="bg-gradient-to-br from-stone-900/90 to-black/90 rounded-2xl border border-stone-700/50 shadow-2xl backdrop-blur-sm overflow-hidden">
                 {/* Demo Header */}
                 <div className="bg-stone-800/80 px-6 py-4 flex items-center justify-between border-b border-stone-700/50">
                   <div className="flex space-x-2">
                     <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                     <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                     <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                   </div>
                   <div className="text-stone-300 text-sm font-mono">glidia-neural-engine</div>
                   <div className="flex items-center text-sm text-emerald-400">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                     Live
                   </div>
                 </div>
                 
                 {/* Demo Content */}
                 <div className="p-6">
                   {/* Status Bar */}
                   <div className="flex items-center justify-between mb-6 bg-stone-800/50 rounded-lg p-4 border border-stone-700/30">
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                         <Bot className="w-5 h-5 text-white" />
                       </div>
                       <div>
                         <h3 className="font-semibold text-white">Neural Engine</h3>
                         <div className="flex items-center text-sm">
                           <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                           <span className="text-emerald-400">Processing queries</span>
                         </div>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="text-xs text-stone-400">Response Time</div>
                       <div className="text-lg font-mono text-emerald-400">1.8s</div>
                     </div>
                   </div>
                   
                   {/* Chat Interface - Fixed positioning */}
                   <div className="space-y-4 mb-6 h-80 overflow-y-auto">
                     {demoMessages.map((msg, idx) => (
                       <div 
                         key={idx} 
                         className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                       >
                         <div className={`max-w-xs rounded-xl p-4 ${
                           msg.sender === 'user' 
                             ? 'bg-stone-700/80 text-white' 
                             : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                         }`}>
                           <p className="text-sm leading-relaxed">{msg.text}</p>
                           
                           {msg.sender === 'ai' && msg.metadata && (
                             <div className="mt-3 pt-3 border-t border-white/20 space-y-1">
                               {Object.entries(msg.metadata).map(([key, value]) => (
                                 <div key={key} className="text-xs flex justify-between">
                                   <span className="text-red-100">{key.replace('_', ' ')}:</span>
                                   <span className="font-mono">{Array.isArray(value) ? value.join(', ') : value}</span>
                                 </div>
                               ))}
                             </div>
                           )}
                         </div>
                       </div>
                     ))}
                     
                     {demoTyping && (
                       <div className="flex justify-start">
                         <div className="bg-red-500/50 rounded-xl p-4">
                           <div className="flex space-x-1">
                             <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                             <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                             <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                           </div>
                         </div>
                       </div>
                     )}
                   </div>
                   
                   {/* Demo Controls */}
                   <div className="pt-4 border-t border-stone-700/30">
                     {!showLiveDemo ? (
                       <button 
                         onClick={() => setShowLiveDemo(true)}
                         className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-3"
                       >
                         <Play className="w-4 h-4" />
                         <span>Run Live Demo</span>
                       </button>
                     ) : demoStage < 3 ? (
                       <div className="text-center text-stone-400">
                         <div className="flex items-center justify-center space-x-2">
                           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                           <span>Demo running... Stage {demoStage + 1}/3</span>
                         </div>
                       </div>
                     ) : (
                       <button 
                         onClick={() => {
                           setDemoMessages([
                             { sender: 'user', text: "Where's my order #12345? It was supposed to arrive yesterday." }
                           ]);
                           setDemoStage(0);
                           setShowLiveDemo(false);
                         }}
                         className="w-full bg-stone-700/80 text-white px-6 py-3 rounded-lg font-semibold hover:bg-stone-600/80 transition-all duration-300 flex items-center justify-center space-x-3"
                       >
                         <RefreshCw className="w-4 h-4" />
                         <span>Restart Demo</span>
                       </button>
                     )}
                   </div>
                 </div>
               </div>
               
               {/* Floating Performance Badges */}
               <div className="absolute -top-4 -right-4 bg-stone-800/90 text-white px-4 py-2 rounded-full text-sm font-medium border border-stone-600/50 shadow-lg backdrop-blur-sm animate-float">
                 <div className="flex items-center space-x-2">
                   <Clock className="w-4 h-4 text-emerald-400" />
                   <span>1.8s avg response</span>
                 </div>
               </div>
               
               <div className="absolute -bottom-4 -left-4 bg-stone-800/90 text-white px-4 py-2 rounded-full text-sm font-medium border border-stone-600/50 shadow-lg backdrop-blur-sm animate-float delay-500">
                 <div className="flex items-center space-x-2">
                   <TrendingDown className="w-4 h-4 text-red-400" />
                   <span>83% fewer tickets</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>

     {/* Glidia Care Product Section - Illustrative Story */}
     <section 
       id="product"
       className="py-24 px-6 lg:px-8 bg-gradient-to-br from-black to-stone-900 relative overflow-hidden"
     >
       <div className="absolute inset-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(239,68,68,0.1),transparent_50%)]"></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.1),transparent_50%)]"></div>
       </div>
       
       <div className="max-w-7xl mx-auto relative z-10">
         <div className="text-center mb-20">
           <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-900/40 to-amber-900/40 border border-red-700/30 text-red-300 text-sm font-medium mb-6 backdrop-blur-sm">
             <Package className="w-4 h-4" />
             <span>Glidia Care</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-fadeInUp">
             Meet <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">Glidia Care</span>
             <br />Your WISMO Solution
           </h2>
           <p className="text-xl text-stone-300 max-w-3xl mx-auto opacity-0 animate-fadeInUp delay-200">
             Our flagship product that automates WISMO (Where Is My Order?) and WISMR (Where Is My Refund?) queries 
             with AI-powered empathy and real-time data integration.
           </p>
         </div>

         {/* Story Timeline - Illustrative Process */}
         <div className="relative mb-20">
           {/* Timeline Line */}
           <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 via-amber-500 to-red-500 opacity-30"></div>
           
           <div className="space-y-20">
             {/* Story Step 1 */}
             <div className="flex items-center justify-between">
               <div className="w-5/12 opacity-0 animate-slideInLeft delay-100">
                 <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-2xl p-8 border border-stone-700/30">
                   <div className="flex items-center space-x-4 mb-4">
                     <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                       <User className="w-6 h-6 text-white" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-white">Customer Frustration</h3>
                       <p className="text-stone-400">The journey begins</p>
                     </div>
                   </div>
                   <p className="text-stone-300 leading-relaxed">
                     Sarah ordered a gift for her daughter's birthday. It's been a week with no updates. 
                     She's frustrated, worried, and reaching out for help at 11 PM.
                   </p>
                 </div>
               </div>
               
               <div className="w-2/12 flex justify-center">
                 <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center relative z-10">
                   <span className="text-white font-bold text-sm">1</span>
                 </div>
               </div>
               
               <div className="w-5/12">
                 <div className="bg-stone-800/50 rounded-xl p-6 border border-stone-700/30">
                   <div className="text-stone-300 text-sm italic">
                     "Hi, I ordered a birthday gift last week (Order #12345) but haven't received any updates. 
                     My daughter's party is tomorrow and I'm really worried it won't arrive in time. Can someone please help me?"
                   </div>
                   <div className="mt-3 text-xs text-stone-500">Customer: Sarah M. | Time: 11:07 PM</div>
                 </div>
               </div>
             </div>

             {/* Story Step 2 */}
             <div className="flex items-center justify-between">
               <div className="w-5/12">
                 <div className="bg-gradient-to-br from-amber-900/30 to-red-900/30 rounded-xl p-6 border border-amber-700/30">
                   <div className="grid grid-cols-3 gap-3 mb-4">
                     <div className="text-center">
                       <div className="w-8 h-8 bg-amber-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                         <Brain className="w-4 h-4 text-white" />
                       </div>
                       <div className="text-xs text-amber-300">NLP Analysis</div>
                     </div>
                     <div className="text-center">
                       <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center animate-pulse">
                         <Activity className="w-4 h-4 text-white" />
                       </div>
                       <div className="text-xs text-red-300">Sentiment: Urgent</div>
                     </div>
                     <div className="text-center">
                       <div className="w-8 h-8 bg-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                         <Target className="w-4 h-4 text-white" />
                       </div>
                       <div className="text-xs text-emerald-300">Context: WISMO</div>
                     </div>
                   </div>
                   <div className="text-center text-stone-400 text-sm">
                     Processing query in 0.3 seconds...
                   </div>
                 </div>
               </div>
               
               <div className="w-2/12 flex justify-center">
                 <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center relative z-10">
                   <span className="text-white font-bold text-sm">2</span>
                 </div>
               </div>
               
               <div className="w-5/12 opacity-0 animate-slideInRight delay-300">
                 <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-2xl p-8 border border-stone-700/30">
                   <div className="flex items-center space-x-4 mb-4">
                     <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-red-500 rounded-xl flex items-center justify-center">
                       <Brain className="w-6 h-6 text-white" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-white">Neural Processing</h3>
                       <p className="text-stone-400">AI understands context</p>
                     </div>
                   </div>
                   <p className="text-stone-300 leading-relaxed">
                     Glidia's neural engine instantly recognizes this is a time-sensitive WISMO query. 
                     It detects urgency, emotional state, and prepares to gather order information.
                   </p>
                 </div>
               </div>
             </div>

             {/* Story Step 3 */}
             <div className="flex items-center justify-between">
               <div className="w-5/12 opacity-0 animate-slideInLeft delay-500">
                 <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-2xl p-8 border border-stone-700/30">
                   <div className="flex items-center space-x-4 mb-4">
                     <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                       <Database className="w-6 h-6 text-white" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-white">Data Integration</h3>
                       <p className="text-stone-400">Real-time lookup</p>
                     </div>
                   </div>
                   <p className="text-stone-300 leading-relaxed">
                     Within seconds, Glidia connects to Shopify, checks UPS tracking, 
                     reviews delivery notes, and cross-references weather delays in Sarah's area.
                   </p>
                 </div>
               </div>
               
               <div className="w-2/12 flex justify-center">
                 <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center relative z-10">
                   <span className="text-white font-bold text-sm">3</span>
                 </div>
               </div>
               
               <div className="w-5/12">
                 <div className="bg-gradient-to-br from-emerald-900/30 to-stone-900/30 rounded-xl p-6 border border-emerald-700/30">
                   <div className="space-y-3">
                     <div className="flex items-center justify-between p-3 bg-emerald-800/20 rounded-lg">
                       <span className="text-emerald-300 text-sm">Shopify Order Status</span>
                       <span className="text-white font-mono text-xs">✓ Shipped</span>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-emerald-800/20 rounded-lg">
                       <span className="text-emerald-300 text-sm">UPS Tracking</span>
                       <span className="text-white font-mono text-xs">✓ Out for delivery</span>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-amber-800/20 rounded-lg">
                       <span className="text-amber-300 text-sm">Weather Check</span>
                       <span className="text-white font-mono text-xs">! Delay possible</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Story Step 4 */}
             <div className="flex items-center justify-between">
               <div className="w-5/12">
                 <div className="bg-gradient-to-br from-red-900/30 to-amber-900/30 rounded-xl p-6 border border-red-700/30">
                   <div className="text-white text-sm leading-relaxed">
                     "Hi Sarah! I have great news about order #12345. Your package is actually out for delivery today 
                     and should arrive by 3 PM - perfect timing for the party! 🎉 
                     <br /><br />
                     I can see there was a slight delay due to yesterday's weather, but UPS confirmed delivery today. 
                     I've sent you a text with the tracking link so you can watch it in real-time. 
                     <br /><br />
                     If it doesn't arrive by 4 PM, I'll immediately escalate to expedited replacement. 
                     Would you like me to text you when it's delivered?"
                   </div>
                   <div className="mt-4 text-xs text-red-300">Response time: 1.8 seconds | Confidence: 98.7%</div>
                 </div>
               </div>
               
               <div className="w-2/12 flex justify-center">
                 <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center relative z-10">
                   <span className="text-white font-bold text-sm">4</span>
                 </div>
               </div>
               
               <div className="w-5/12 opacity-0 animate-slideInRight delay-700">
                 <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-2xl p-8 border border-stone-700/30">
                   <div className="flex items-center space-x-4 mb-4">
                     <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                       <Heart className="w-6 h-6 text-white" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-white">Happy Customer</h3>
                       <p className="text-stone-400">Problem solved instantly</p>
                     </div>
                   </div>
                   <p className="text-stone-300 leading-relaxed">
                     Sarah goes from frustrated to relieved in under 2 seconds. The party is saved, 
                     trust is restored, and she becomes a brand advocate. No human agent needed.
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Results Summary */}
         <div className="bg-gradient-to-br from-stone-800/30 to-stone-900/30 rounded-3xl p-8 lg:p-12 border border-stone-600/30 backdrop-blur-sm opacity-0 animate-fadeInUp delay-800">
           <div className="text-center mb-8">
             <h3 className="text-3xl font-bold text-white mb-4">The Glidia Care Difference</h3>
             <p className="text-lg text-stone-300">From frustration to satisfaction in 1.8 seconds</p>
           </div>
           
           <div className="grid md:grid-cols-4 gap-6">
             {[
               { label: "Response Time", value: "1.8s", desc: "vs 2-24 hours human", icon: Clock, color: "from-red-500 to-red-600" },
               { label: "Customer Satisfaction", value: "96%", desc: "Happy customers", icon: Heart, color: "from-emerald-500 to-emerald-600" },
               { label: "Accuracy Rate", value: "99.3%", desc: "Correct solutions", icon: Target, color: "from-amber-500 to-amber-600" },
               { label: "Cost Savings", value: "$28k", desc: "Per month average", icon: DollarSign, color: "from-red-500 to-amber-500" }
             ].map((metric, index) => {
               const Icon = metric.icon;
               return (
                 <div key={index} className="text-center">
                   <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                     <Icon className="w-8 h-8 text-white" />
                   </div>
                   <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                   <div className="text-sm font-medium text-stone-300 mb-1">{metric.label}</div>
                   <div className="text-xs text-stone-400">{metric.desc}</div>
                 </div>
               );
             })}
           </div>

           <div className="text-center mt-8">
             <button 
               onClick={() => window.open('/app/dashboard?shop=glidiatest.myshopify.com', '_blank')}
               className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center space-x-3 mx-auto"
             >
               <Play className="w-5 h-5" />
               <span>Experience Glidia Care</span>
               <ArrowRight className="w-5 h-5" />
             </button>
           </div>
         </div>
       </div>
     </section>

     {/* Enhanced Neural Processing Story Section */}
     <section 
       id="how-it-works"
       ref={storyRef}
       className="py-24 px-6 lg:px-8 bg-gradient-to-br from-stone-900 to-black relative overflow-hidden"
     >
       {/* Enhanced Neural Background */}
       <div className="absolute inset-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent_60%)]"></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.1),transparent_50%)]"></div>
       </div>
       
       <div className="max-w-7xl mx-auto relative z-10">
         <div className="text-center mb-20">
           <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-900/40 to-amber-900/40 border border-red-700/30 text-red-300 text-sm font-medium mb-6 backdrop-blur-sm">
             <Cpu className="w-4 h-4" />
             <span>Neural Processing Engine</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-fadeInUp">
             From Query to Solution
             <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent"> in Seconds</span>
           </h2>
           <p className="text-xl text-stone-300 max-w-3xl mx-auto opacity-0 animate-fadeInUp delay-200">
             Watch how our advanced neural network transforms customer queries into empathetic, 
             actionable solutions through intelligent processing
           </p>
         </div>

         {/* Interactive Story Timeline */}
         <div className="relative">
           {/* Progress Line */}
           <div className="hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-stone-700/50">
             <div 
               className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-1000 ease-out"
               style={{ width: `${((activeStoryStep + 1) / storySteps.length) * 100}%` }}
             ></div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
             {storySteps.map((step, index) => {
               const Icon = step.icon;
               const isActive = activeStoryStep === index;
               const isCompleted = activeStoryStep > index;
               
               return (
                 <div 
                   key={index}
                   className={`relative opacity-0 animate-fadeInUp group cursor-pointer transition-all duration-700 ${
                     isActive ? 'lg:scale-110' : ''
                   }`}
                   style={{ animationDelay: `${index * 200}ms` }}
                   onClick={() => setActiveStoryStep(index)}
                 >
                   {/* Step Card */}
                   <div className={`relative bg-gradient-to-br from-stone-800/80 to-stone-900/80 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500 ${
                     isActive 
                       ? 'border-red-500/50 shadow-xl shadow-red-500/10 bg-gradient-to-br from-stone-800 to-red-900/20' 
                       : isCompleted
                       ? 'border-amber-500/30 bg-gradient-to-br from-stone-800/90 to-amber-900/10'
                       : 'border-stone-600/30 hover:border-stone-500/50'
                   }`}>
                    {/* Step Number Indicator */}
                     <div className={`absolute -top-6 left-8 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                       isActive
                         ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30'
                         : isCompleted
                         ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                         : 'bg-stone-700/80 text-stone-300'
                     }`}>
                       {isCompleted && !isActive ? (
                         <CheckCircle className="w-6 h-6" />
                       ) : (
                         step.step
                       )}
                     </div>
                     
                     {/* Icon */}
                     <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
                       isActive
                         ? `bg-gradient-to-r ${step.color} shadow-lg`
                         : 'bg-stone-700/50'
                     }`}>
                       <Icon className={`w-8 h-8 transition-colors duration-500 ${
                         isActive ? 'text-white' : 'text-stone-300'
                       }`} />
                     </div>
                     
                     {/* Content */}
                     <h3 className={`font-bold text-xl mb-4 transition-colors duration-500 ${
                       isActive ? 'text-white' : 'text-stone-200'
                     }`}>
                       {step.title}
                     </h3>
                     
                     <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                       isActive ? 'text-stone-200' : 'text-stone-400'
                     }`}>
                       {step.description}
                     </p>
                     
                     {/* Interactive Animation */}
                     <div className="mt-6 h-32 flex items-center justify-center">
                       {isActive && (
                         <div className="relative w-full h-full">
                           {/* Custom animated illustration based on step */}
                           {step.animation === 'customerQuery' && (
                             <div className="relative w-full h-full flex items-center justify-center">
                               <div className="relative">
                                 <MessageSquare className="w-16 h-16 text-red-400 animate-pulse" />
                                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                                   <span className="text-white text-xs font-bold">!</span>
                                 </div>
                               </div>
                               <div className="absolute inset-0 border-2 border-red-400/20 rounded-full animate-ping"></div>
                             </div>
                           )}
                           
                           {step.animation === 'neuralProcessing' && (
                             <div className="relative w-full h-full">
                               <Brain className="w-16 h-16 text-amber-400 mx-auto animate-pulse" />
                               <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="grid grid-cols-3 gap-2 absolute">
                                   {Array.from({ length: 9 }).map((_, i) => (
                                     <div 
                                       key={i}
                                       className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
                                       style={{ animationDelay: `${i * 100}ms` }}
                                     ></div>
                                   ))}
                                 </div>
                               </div>
                             </div>
                           )}
                           
                           {step.animation === 'dataIntegration' && (
                             <div className="relative w-full h-full flex items-center justify-center">
                               <Database className="w-16 h-16 text-emerald-400 animate-pulse" />
                               <div className="absolute -top-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
                               <div className="absolute -top-4 -right-4 w-6 h-6 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '500ms' }}></div>
                               <div className="absolute -bottom-4 w-6 h-6 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '1000ms' }}></div>
                             </div>
                           )}
                           
                           {step.animation === 'solutionGeneration' && (
                             <div className="relative w-full h-full flex items-center justify-center">
                               <Send className="w-16 h-16 text-red-400 animate-bounce" />
                               <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                                 <CheckCircle className="w-5 h-5 text-white" />
                               </div>
                             </div>
                           )}
                         </div>
                       )}
                     </div>
                     
                     {/* Progress Indicator */}
                     <div className="mt-4 w-full bg-stone-700/30 rounded-full h-1">
                       <div 
                         className={`h-full rounded-full transition-all duration-1000 ${
                           isCompleted || isActive ? `bg-gradient-to-r ${step.color}` : 'bg-stone-600/50'
                         }`}
                         style={{ 
                           width: isCompleted ? '100%' : isActive ? '75%' : '0%' 
                         }}
                       ></div>
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>
         </div>
         
         {/* Story Navigation */}
         <div className="mt-16 flex justify-center">
           <div className="flex space-x-2">
             {storySteps.map((_, index) => (
               <button
                 key={index}
                 onClick={() => setActiveStoryStep(index)}
                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
                   activeStoryStep === index
                     ? 'bg-red-500'
                     : activeStoryStep > index
                     ? 'bg-amber-500'
                     : 'bg-stone-600'
                 }`}
               />
             ))}
           </div>
         </div>
       </div>
     </section>

     {/* Enhanced Testimonials */}
     <section 
       ref={testimonialRef}
       className="py-24 px-6 lg:px-8 bg-black relative overflow-hidden"
     >
       <div className="absolute inset-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05),transparent_70%)]"></div>
       </div>
       
       <div className="max-w-7xl mx-auto relative z-10">
         <div className="text-center mb-20">
           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-fadeInUp">
             Trusted by <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">Industry Leaders</span>
           </h2>
           <p className="text-xl text-stone-300 max-w-3xl mx-auto opacity-0 animate-fadeInUp delay-200">
             See why innovative brands choose Glidia for customer support excellence
           </p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
           {testimonials.map((testimonial, index) => (
             <div 
               key={index} 
               className="relative group opacity-0 animate-fadeInUp"
               style={{ animationDelay: `${index * 200}ms` }}
             >
               <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 backdrop-blur-sm rounded-2xl border border-stone-600/30 overflow-hidden hover:border-red-500/30 transition-all duration-500 h-full">
                 {/* Gradient accent */}
                 <div className="h-1 bg-gradient-to-r from-red-500 to-amber-500"></div>
                 
                 <div className="p-8">
                   {/* Rating */}
                   <div className="flex items-center space-x-1 mb-4">
                     {Array.from({ length: testimonial.rating }).map((_, i) => (
                       <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                     ))}
                   </div>
                   
                   {/* Quote */}
                   <blockquote className="text-white text-xl leading-relaxed mb-6 font-medium">
                     "{testimonial.quote}"
                   </blockquote>
                   
                   {/* Expanded content on hover */}
                   <div className="max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 opacity-0 group-hover:opacity-100">
                     <p className="text-stone-300 text-sm leading-relaxed mb-4">{testimonial.expanded}</p>
                   </div>
                   
                   {/* Impact Badge */}
                   <div className="inline-flex px-3 py-1.5 bg-gradient-to-r from-emerald-900/40 to-emerald-800/40 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-700/30">
                     <TrendingUp className="w-4 h-4 mr-2" />
                     {testimonial.impact}
                   </div>
                   
                   {/* Author */}
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                       {testimonial.avatarFallback}
                     </div>
                     <div>
                       <p className="font-semibold text-white">{testimonial.author}</p>
                       <p className="text-stone-400 text-sm">{testimonial.role}, {testimonial.company}</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>

     {/* Enhanced Pricing Section */}
     <section 
       id="pricing" 
       ref={pricingRef}
       className="py-24 px-6 lg:px-8 bg-gradient-to-br from-stone-900 to-black relative overflow-hidden"
     >
       <div className="absolute inset-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05),transparent_70%)]"></div>
       </div>
       
       <div className="max-w-7xl mx-auto relative z-10">
         <div className="text-center mb-20">
           <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-900/40 to-amber-900/40 border border-red-700/30 text-red-300 text-sm font-medium mb-6 backdrop-blur-sm">
             <DollarSign className="w-4 h-4" />
             <span>Simple Pricing</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-fadeInUp">
             <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">Transparent</span> Pricing
           </h2>
           <p className="text-xl text-stone-300 max-w-3xl mx-auto opacity-0 animate-fadeInUp delay-200">
             Start with a 14-day free trial, no credit card required
           </p>
         </div>

         <div className="grid md:grid-cols-3 gap-8 mb-12">
           {pricingPlans.map((plan, index) => (
             <div 
               key={index} 
               className={`relative opacity-0 animate-fadeInUp transition-all duration-500 ${
                 plan.popular 
                   ? 'md:scale-105 md:-translate-y-4' 
                   : ''
               }`}
               style={{ animationDelay: `${index * 200}ms` }}
             >
               {plan.popular && (
                 <div className="absolute -top-6 left-0 right-0 flex justify-center">
                   <span className="bg-gradient-to-r from-red-500 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                     Most Popular
                   </span>
                 </div>
               )}
               
               <div className={`bg-gradient-to-br from-stone-800/50 to-stone-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 h-full ${
                 plan.popular 
                   ? 'border-red-500/50 shadow-xl shadow-red-500/10' 
                   : 'border-stone-600/30 hover:border-red-500/30'
               }`}>
                 <div className="p-8">
                   <div className="text-center mb-8">
                     <h3 className="font-bold text-white text-2xl mb-2">{plan.name}</h3>
                     <p className="text-stone-400 mb-6">{plan.description}</p>
                     <div className="mb-4">
                       <span className="text-5xl font-bold text-white">${plan.price}</span>
                       <span className="text-stone-400 text-xl">/mo</span>
                     </div>
                     <p className="text-sm text-stone-500 bg-stone-800/50 rounded-full py-2 px-4 inline-block">
                       {typeof plan.responses === 'number' ? `${plan.responses.toLocaleString()} responses included` : 'Unlimited responses'}
                     </p>
                   </div>
                   
                   <ul className="space-y-4 mb-8">
                     {plan.features.map((feature, idx) => (
                       <li key={idx} className="flex items-start space-x-3">
                         {feature.available ? (
                           <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                         ) : (
                           <Minus className="w-5 h-5 text-stone-600 flex-shrink-0 mt-0.5" />
                         )}
                         <span className={feature.available ? 'text-stone-300' : 'text-stone-500'}>
                           {feature.text}
                         </span>
                       </li>
                     ))}
                   </ul>
                   
                   <button className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ${
                     plan.popular
                       ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/20'
                       : 'bg-stone-700/80 text-white hover:bg-stone-600/80'
                   }`}>
                     {plan.cta}
                   </button>
                 </div>
               </div>
             </div>
           ))}
         </div>
         
         {/* Enterprise tier */}
         <div className="bg-gradient-to-r from-stone-800/50 to-stone-900/50 rounded-2xl p-8 border border-stone-600/30 backdrop-blur-sm opacity-0 animate-fadeInUp delay-600">
           <div className="flex flex-col md:flex-row md:items-center justify-between">
             <div>
               <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
               <p className="text-stone-300 mb-4 md:mb-0">Custom solutions for large-scale operations with dedicated support</p>
             </div>
             <button className="bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-600 hover:to-stone-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-3 whitespace-nowrap">
               <Briefcase className="w-5 h-5" />
               <span>Contact Sales</span>
             </button>
           </div>
         </div>
       </div>
     </section>

     {/* Final CTA Section */}
     <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-black via-stone-900 to-black relative overflow-hidden">
       <div className="absolute inset-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15),transparent_70%)]"></div>
         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
       </div>
       
       <div className="max-w-5xl mx-auto text-center relative z-10">
         <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 opacity-0 animate-fadeInUp">
           Transform Your Support Experience
         </h2>
         <p className="text-xl text-stone-300 mb-12 max-w-3xl mx-auto opacity-0 animate-fadeInUp delay-200">
           Join 500+ brands delivering exceptional customer experiences with neural AI
         </p>

         <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 animate-fadeInUp delay-400">
           <button 
             onClick={() => window.open('/app/dashboard?shop=glidiatest.myshopify.com', '_blank')}
             className="group bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center space-x-3 shadow-lg shadow-red-500/25"
           >
             <span>Start Free 14-Day Trial</span>
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
           <button className="bg-stone-800/80 backdrop-blur-sm text-stone-200 px-8 py-4 rounded-lg font-semibold hover:bg-stone-700/80 border border-stone-600/50 transition-all duration-300 flex items-center space-x-3">
             <Calendar className="w-5 h-5" />
             <span>Schedule Demo</span>
           </button>
         </div>
         
         {/* Trust indicators */}
         <div className="mt-20 opacity-0 animate-fadeInUp delay-600">
           <p className="text-stone-400 mb-8">Trusted by innovative companies worldwide</p>
           <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
             {Array.from({ length: 5 }).map((_, i) => (
               <div key={i} className="h-8 w-32 bg-stone-700/30 rounded-lg animate-pulse"></div>
             ))}
           </div>
         </div>
       </div>
     </section>

     {/* Footer */}
     <Footer />
   </div>
 );
}