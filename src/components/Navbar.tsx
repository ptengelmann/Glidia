'use client';

import { useState } from 'react';
import { Package, ChevronDown, Menu, X, Activity, Brain, Clock, TrendingDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  variant?: 'landing' | 'dashboard';
  showDashboardLink?: boolean;
}

export default function Navbar({ variant = 'landing', showDashboardLink = true }: NavbarProps) {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = variant === 'landing';

  return (
    <nav className="fixed top-0 w-full bg-black/70 backdrop-blur-xl border-b border-white/5 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Minimal Logo Section */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                <Image 
                  src="/GlidiaLogo.png" 
                  alt="Glidia Logo" 
                  width={16} 
                  height={16} 
                  className="rounded relative z-10"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-4 h-4 bg-white rounded flex items-center justify-center hidden">
                  <span className="text-black text-xs font-bold">G</span>
                </div>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full">
                <div className="w-full h-full bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-medium text-white">Glidia</h1>
              <div className="text-xs text-stone-500 font-mono -mt-0.5">NEURAL.AI</div>
            </div>
          </Link>

          {/* Clean Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isLanding ? (
              <>
                {/* Minimal Products Dropdown */}
                <div className="relative group">
                  <button 
                    className="flex items-center space-x-1 text-stone-400 hover:text-white transition-colors text-sm"
                    onMouseEnter={() => setShowProductsDropdown(true)}
                    onMouseLeave={() => setShowProductsDropdown(false)}
                  >
                    <span>Products</span>
                    <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  
                  {showProductsDropdown && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-72 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50"
                      onMouseEnter={() => setShowProductsDropdown(true)}
                      onMouseLeave={() => setShowProductsDropdown(false)}
                    >
                      <div className="p-4">
                        <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-black" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white text-sm font-medium mb-1">Glidia Care</h3>
                            <p className="text-stone-400 text-xs mb-2">WISMO/WISMR Automation</p>
                            <p className="text-stone-300 text-xs leading-relaxed">
                              AI-powered post-purchase support automation
                            </p>
                          </div>
                        </div>
                        
                        <div className="border-t border-white/10 mt-3 pt-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-stone-500 font-mono">PIPELINE</span>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-stone-400 flex items-center space-x-2">
                              <Brain className="w-3 h-3" />
                              <span>Glidia Insights</span>
                            </div>
                            <div className="text-xs text-stone-400 flex items-center space-x-2">
                              <Activity className="w-3 h-3" />
                              <span>Glidia Engage</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <a href="#docs" className="text-stone-400 hover:text-white transition-colors text-sm">Docs</a>
                <a href="#api" className="text-stone-400 hover:text-white transition-colors text-sm">API</a>
                <a href="#support" className="text-stone-400 hover:text-white transition-colors text-sm">Support</a>
              </>
            ) : (
              <>
                <button 
                  onClick={() => window.open('/', '_self')}
                  className="text-stone-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </button>
                <a href="#docs" className="text-stone-400 hover:text-white transition-colors text-sm">Docs</a>
                <a href="#support" className="text-stone-400 hover:text-white transition-colors text-sm">Support</a>
              </>
            )}
          </div>

          {/* Minimal Action Section */}
          <div className="flex items-center space-x-3">
            {/* Compact Status - Landing only */}
            {isLanding && (
              <div className="hidden lg:flex items-center space-x-2 px-2 py-1 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                  <span className="text-emerald-400 text-xs font-mono">1.8ms</span>
                </div>
                <div className="w-px h-3 bg-white/20"></div>
                <div className="flex items-center space-x-1">
                  <span className="text-white text-xs font-mono">83%</span>
                </div>
              </div>
            )}

            {/* Sleek CTA Button */}
            {showDashboardLink && (
              <button 
                onClick={() => window.open('http://localhost:3000/app/dashboard?shop=glidiatest.myshopify.com', '_blank')}
                className="group px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Console</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            )}

            {/* Mobile Menu */}
            <button 
              className="md:hidden p-1.5 text-white hover:text-stone-300 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-4 space-y-3">
            {isLanding ? (
              <>
                <a href="#product" className="block text-stone-400 hover:text-white transition-colors text-sm">Products</a>
                <a href="#docs" className="block text-stone-400 hover:text-white transition-colors text-sm">Docs</a>
                <a href="#api" className="block text-stone-400 hover:text-white transition-colors text-sm">API</a>
                <a href="#support" className="block text-stone-400 hover:text-white transition-colors text-sm">Support</a>
                {showDashboardLink && (
                  <button 
                    onClick={() => window.open('http://localhost:3000/app/dashboard?shop=glidiatest.myshopify.com', '_blank')}
                    className="w-full bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-all duration-200"
                  >
                    Launch Console
                  </button>
                )}
              </>
            ) : (
              <>
                <button 
                  onClick={() => window.open('/', '_self')}
                  className="text-stone-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </button>
                <a href="#docs" className="text-stone-400 hover:text-white transition-colors text-sm">Docs</a>
                <a href="#support" className="text-stone-400 hover:text-white transition-colors text-sm">Support</a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}