// src/components/Footer.tsx
import { Package, Mail, Phone, MapPin, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black py-16 px-6 lg:px-8 border-t border-stone-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Image 
                    src="/GlidiaLogo.png" 
                    alt="Glidia Logo" 
                    width={28} 
                    height={28} 
                    className="rounded"
                    onError={(e) => {
                       e.currentTarget.style.display = 'none';
                       const nextSibling = e.currentTarget.nextElementSibling;
                       if (nextSibling) {
                         (nextSibling as HTMLElement).style.display = 'block';                       }
                     }}
                  />
                  <Package className="w-6 h-6 text-white hidden" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
                  Glidia
                </h3>
                <p className="text-stone-400 text-sm font-medium">AI Support Intelligence</p>
              </div>
            </div>
            <p className="text-stone-400 max-w-md leading-relaxed mb-6">
              Advanced AI platform that transforms customer support through intelligent automation 
              and empathetic response generation. <span className="text-red-400 font-semibold">Eliminate WISMO chaos forever.</span>
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-stone-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@glidia.ai" className="hover:text-red-400 transition-colors">
                  hello@glidia.ai
                </a>
              </div>
              <div className="flex items-center space-x-3 text-stone-400">
                <Phone className="w-4 h-4" />
                <a href="tel:+1-555-GLIDIA" className="hover:text-red-400 transition-colors">
                  +1 (555) GLIDIA
                </a>
              </div>
            </div>
          </div>
          
          {/* Products Section */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Products</h4>
            <ul className="space-y-3 text-stone-400">
              <li>
                <a href="#product" className="hover:text-red-400 transition-colors flex items-center group">
                  <span>Glidia Care</span>
                  <span className="ml-2 px-2 py-0.5 bg-red-900/30 text-red-300 text-xs rounded-full border border-red-700/30">
                    Available
                  </span>
                </a>
              </li>
              <li>
                <span className="text-stone-500 flex items-center">
                  Glidia Engage
                  <span className="ml-2 px-2 py-0.5 bg-amber-900/30 text-amber-300 text-xs rounded-full border border-amber-700/30">
                    Coming Soon
                  </span>
                </span>
              </li>
              <li>
                <span className="text-stone-500 flex items-center">
                  Glidia Insights
                  <span className="ml-2 px-2 py-0.5 bg-amber-900/30 text-amber-300 text-xs rounded-full border border-amber-700/30">
                    Coming Soon
                  </span>
                </span>
              </li>
              <li>
                <span className="text-stone-500 flex items-center">
                  Glidia Automate
                  <span className="ml-2 px-2 py-0.5 bg-amber-900/30 text-amber-300 text-xs rounded-full border border-amber-700/30">
                    Coming Soon
                  </span>
                </span>
              </li>
              <li><a href="#pricing" className="hover:text-red-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Integrations</a></li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors flex items-center">
                  API Documentation
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Company Section */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-stone-400">
              <li><a href="#about" className="hover:text-red-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-red-400 transition-colors">Contact</a></li>
              <li><a href="#support" className="hover:text-red-400 transition-colors">Support Center</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Status Page</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="border-t border-stone-800 pt-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-stone-400 hover:text-red-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-red-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-red-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-stone-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-stone-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-400 text-sm mb-4 md:mb-0">
              © 2025 Glidia. All rights reserved. 
              <span className="ml-2 text-stone-500">Powered by Neural AI.</span>
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-stone-400 hover:text-red-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-stone-400 hover:text-red-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-stone-400 hover:text-red-400 transition-colors text-sm">
                Cookie Policy
              </a>
              <a href="#" className="text-stone-400 hover:text-red-400 transition-colors text-sm">
                Security
              </a>
            </div>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-stone-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-stone-500 text-xs mb-2">Trusted by 500+ innovative brands</p>
              <div className="flex items-center space-x-4 opacity-60">
                {/* Placeholder for company logos */}
                <div className="h-6 w-20 bg-stone-700/30 rounded"></div>
                <div className="h-6 w-24 bg-stone-700/30 rounded"></div>
                <div className="h-6 w-18 bg-stone-700/30 rounded"></div>
                <div className="h-6 w-22 bg-stone-700/30 rounded"></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-stone-500">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-stone-500">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>GDPR Ready</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-stone-500">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}