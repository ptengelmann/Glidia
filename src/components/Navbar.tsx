// src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import { Package, ChevronDown, Menu, X } from 'lucide-react';
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
    <nav className={`fixed top-0 w-full backdrop-blur-xl border-b z-50 ${
      isLanding 
        ? 'bg-black/80 border-stone-800/50' 
        : 'bg-stone-50/80 border-stone-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-4">
            <div className="relative">
              {/* Try to use the logo, fallback to Package icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Image 
                  src="/GlidiaLogo.png" 
                  alt="Glidia Logo" 
                  width={24} 
                  height={24} 
                  className="rounded"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <Package className="w-5 h-5 text-white hidden" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className={`text-xl font-bold bg-gradient-to-r ${
                isLanding
                  ? 'from-red-400 to-amber-400'
                  : 'from-stone-900 to-stone-700'
              } bg-clip-text text-transparent`}>
                Glidia
              </h1>
              <p className={`text-xs font-medium ${
                isLanding ? 'text-stone-400' : 'text-stone-500'
              }`}>
                AI Support Intelligence
              </p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {isLanding ? (
              <>
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
                
                {showDashboardLink && (
                  <button 
                    onClick={() => window.open('/app/dashboard?shop=glidiatest.myshopify.com', '_blank')}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
                  >
                    Try For Free
                  </button>
                )}
              </>
            ) : (
              <>
                {/* Dashboard variant */}
                <div className="flex items-center space-x-6 text-sm text-stone-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="font-medium">Live Demo Mode</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="font-medium">AI Active</span>
                  </div>
                </div>
                
                {showDashboardLink && (
                  <Link
                    href="/app/dashboard?shop=glidiatest.myshopify.com"
                    className="bg-black text-stone-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-900 transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                )}
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className={`md:hidden ${isLanding ? 'text-white' : 'text-stone-900'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t ${
          isLanding 
            ? 'bg-black/95 backdrop-blur-xl border-stone-800/50' 
            : 'bg-stone-50/95 backdrop-blur-xl border-stone-200/50'
        }`}>
          <div className="px-6 py-4 space-y-4">
            {isLanding ? (
              <>
                <a href="#product" className="block text-stone-300 hover:text-red-400 transition-colors">Products</a>
                <a href="#about" className="block text-stone-300 hover:text-red-400 transition-colors">About</a>
                <a href="#contact" className="block text-stone-300 hover:text-red-400 transition-colors">Contact</a>
                <a href="#support" className="block text-stone-300 hover:text-red-400 transition-colors">Support</a>
                {showDashboardLink && (
                  <button 
                    onClick={() => window.open('/app/dashboard?shop=glidiatest.myshopify.com', '_blank')}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
                  >
                    Try For Free
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 text-sm text-stone-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="font-medium">Live Demo Mode</span>
                </div>
                {showDashboardLink && (
                  <Link
                    href="/app/dashboard?shop=glidiatest.myshopify.com"
                    className="block bg-black text-stone-50 px-4 py-3 rounded-lg text-sm font-medium hover:bg-stone-900 transition-all duration-200 text-center"
                  >
                    Dashboard
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}