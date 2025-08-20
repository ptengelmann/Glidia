// src/app/api/test-iframe/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Glidia Test</title>
    </head>
    <body style="background: #1a1a1a; color: white; padding: 20px; font-family: Arial;">
      <h1>🎉 Glidia Dashboard</h1>
      <p>If you can see this in Shopify admin, the iframe is working!</p>
      <div style="background: #333; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3>✅ Success!</h3>
        <p>Your app is now properly embedded in Shopify admin.</p>
      </div>
      <script>
        console.log('Glidia iframe test loaded successfully');
        // Test if we're in Shopify admin
        if (window.top !== window.self) {
          console.log('Running inside Shopify admin iframe');
        }
      </script>
    </body>
    </html>
  `;

  const response = new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Security-Policy': "frame-ancestors 'self' https://*.shopify.com https://*.myshopify.com https://admin.shopify.com;",
    },
  });

  // Explicitly remove X-Frame-Options
  response.headers.delete('X-Frame-Options');
  
  return response;
}