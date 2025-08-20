// src/components/Footer.tsx
import { Package, Mail, ExternalLink, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black py-20 px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-8">
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
                       const nextSibling = e.currentTarget.nextElementSibling;
                       if (nextSibling) {
                         (nextSibling as HTMLElement).style.display = 'block';
                       }
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
                <h3 className="text-lg font-medium text-white">Glidia</h3>
                <div className="text-xs text-stone-500 font-mono -mt-0.5">NEURAL.AI</div>
              </div>
            </div>
            
            <p className="text-stone-400 max-w-md leading-relaxed mb-8 text-sm">
              AI-powered customer support automation that transforms post-purchase queries 
              into satisfied customers. <span className="text-white">Eliminate support chaos forever.</span>
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-stone-500">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@glidia.ai" className="hover:text-white transition-colors text-sm">
                  hello@glidia.ai
                </a>
              </div>
            </div>
          </div>
          
          {/* Products Section */}
          <div>
            <h4 className="font-medium text-white mb-6">Products</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#product" className="text-stone-400 hover:text-white transition-colors flex items-center group">
                  <span>Glidia Care</span>
                  <div className="ml-2 w-2 h-2 bg-emerald-500 rounded-full"></div>
                </a>
              </li>
              <li>
                <span className="text-stone-600 flex items-center">
                  Glidia Engage
                  <div className="ml-2 w-2 h-2 bg-amber-500 rounded-full opacity-50"></div>
                </span>
              </li>
              <li>
                <span className="text-stone-600 flex items-center">
                  Glidia Insights
                  <div className="ml-2 w-2 h-2 bg-amber-500 rounded-full opacity-50"></div>
                </span>
              </li>
              <li>
                <a href="#" className="text-stone-400 hover:text-white transition-colors flex items-center">
                  API Docs
                  <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" />
                </a>
              </li>
              <li><a href="#pricing" className="text-stone-400 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          {/* Company Section */}
          <div>
            <h4 className="font-medium text-white mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#about" className="text-stone-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-stone-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#support" className="text-stone-400 hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="text-stone-400 hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="text-stone-400 hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        {/* Social Links & Status */}
        <div className="border-t border-white/5 pt-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-stone-500 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-stone-500 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-stone-500 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-stone-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-500 text-sm mb-4 md:mb-0">
              © 2025 Glidia. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-stone-500 hover:text-white transition-colors text-sm">
                Privacy
              </a>
              <a href="#" className="text-stone-500 hover:text-white transition-colors text-sm">
                Terms
              </a>
              <a href="#" className="text-stone-500 hover:text-white transition-colors text-sm">
                Security
              </a>
            </div>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-stone-600 text-xs mb-3">Trusted by 500+ brands</p>
              <div className="flex items-center space-x-4 opacity-30">
                <div className="h-4 w-16 bg-white/10 rounded"></div>
                <div className="h-4 w-20 bg-white/10 rounded"></div>
                <div className="h-4 w-14 bg-white/10 rounded"></div>
                <div className="h-4 w-18 bg-white/10 rounded"></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-xs text-stone-600">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span>SOC 2</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-stone-600">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span>GDPR</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-stone-600">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}