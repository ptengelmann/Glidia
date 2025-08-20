// src/components/ShopifyAppProvider.tsx
'use client';

import { useEffect } from 'react';

interface ShopifyAppProviderProps {
  children: React.ReactNode;
}

export default function ShopifyAppProvider({ children }: ShopifyAppProviderProps) {
  useEffect(() => {
    // Load Shopify App Bridge
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@shopify/app-bridge@latest/umd/index.js';
    script.onload = () => {
      // Initialize App Bridge when script loads
      if (typeof window !== 'undefined' && (window as any).ShopifyAppBridge) {
        const { createApp } = (window as any).ShopifyAppBridge;
        const urlParams = new URLSearchParams(window.location.search);
        const shop = urlParams.get('shop');
        
        if (shop) {
          const app = createApp({
            apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY || '5575757e5b7ffbd035889017668d051e',
            shop: shop,
            forceRedirect: false,
          });
          
          console.log('Shopify App Bridge initialized for shop:', shop);
          
          // Store app instance globally for use in other components
          (window as any).shopifyApp = app;
        }
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return <>{children}</>;
}