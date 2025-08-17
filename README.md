# 🚀 Glidia - AI-Powered WISMO & WISMR SaaS

**The AI assistant that eliminates customer support headaches by automating order & refund queries.**

Glidia helps eCommerce brands reduce WISMO (Where is my order?) and WISMR (Where is my refund?) support tickets by up to 80% using AI-generated, empathetic responses powered by real Shopify data.

![Glidia Demo](https://via.placeholder.com/800x400/6366f1/white?text=Glidia+AI+Demo)

## ✨ Key Features

- **🤖 AI-Powered Responses** - Generate empathetic, branded responses using real order data
- **📦 Real-Time Order Tracking** - Seamless Shopify integration with live order status
- **💰 Refund Transparency** - Track refunds just like packages (coming soon)
- **🎨 Brand Voice Customization** - Professional, friendly, casual, or luxury tone
- **📊 Analytics Dashboard** - Track support ticket reduction and query patterns
- **⚡ Instant Setup** - Plug & play Shopify app integration

## 🎯 Live Demo

✅ **Shopify Connected** - Real store integration  
✅ **AI Ready** - GPT-4 powered responses  
✅ **Working OAuth** - Complete app installation flow  

**Example AI Response:**
> "Hello Sarah, Thank you for reaching out to us about your order from Glidia Demo Store. We're pleased to inform you that your Order #1002, placed on August 17, 2025, has been fulfilled and is on its way to you! Although we can't provide a direct tracking link with our current carrier, you can manually track your shipment using the tracking number 1234567..."

## 🛠️ Tech Stack

- **Framework**: Next.js 15 + React 19
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB + Mongoose
- **AI**: OpenAI GPT-4
- **eCommerce**: Shopify GraphQL Admin API
- **Type Safety**: TypeScript + Zod validation
- **Icons**: Lucide React

## 🚦 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB database (MongoDB Atlas recommended)
- Shopify Partner account
- Shopify development store
- OpenAI API key

### 1. Clone & Install

```bash
git clone https://github.com/ptengelmann/Glidia.git
cd Glidia
npm install
```

### 2. Environment Setup

Copy the environment template:
```bash
cp .env.example .env.local
```

Fill in your credentials in `.env.local`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Glidia

# Shopify Partner App
SHOPIFY_API_KEY=your_api_key_from_partners_dashboard
SHOPIFY_API_SECRET=your_api_secret_from_partners_dashboard

# OpenAI
OPENAI_API_KEY=sk-proj-your_openai_key_here
```

### 3. Shopify Partner App Setup

1. Go to [Shopify Partners](https://partners.shopify.com)
2. Create a new app → "Create app manually"
3. Configure these URLs:
   - **App URL:** `http://localhost:3000`
   - **Allowed redirection URL:** `http://localhost:3000/api/auth/shopify/callback`
4. Copy your API key and secret to `.env.local`
5. Request "Read all orders" permission in API access

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the demo!

### 5. Install on Development Store

1. In Shopify Partners → Your App → Overview
2. Click "Select store" under "Test your app"
3. Choose your development store
4. Click "Install app"

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── wismo/
│   │   │   ├── route.ts              # Raw Shopify data endpoint
│   │   │   └── ai/route.ts           # AI-powered responses
│   │   ├── auth/shopify/
│   │   │   ├── install/route.ts      # OAuth installation
│   │   │   └── callback/route.ts     # OAuth callback
│   │   ├── handle-install/route.ts   # Installation handler
│   │   ├── installations/route.ts    # Check installations
│   │   └── debug/route.ts           # Debug endpoint
│   ├── app/
│   │   ├── dashboard/page.tsx        # Merchant dashboard
│   │   └── error/page.tsx           # Error handling
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                     # Main demo page
├── components/
│   ├── AIDemo.tsx                   # AI response demo interface
│   └── ui/
│       └── tabs.tsx                 # Reusable UI components
├── lib/
│   ├── ai.ts                        # AI response generation engine
│   ├── db.ts                        # MongoDB connection
│   ├── shopify.ts                   # Shopify GraphQL client
│   ├── shopify-oauth.ts             # OAuth authentication
│   └── utils.ts                     # Utility functions
└── ...
```

## 🤖 AI Response Engine

The core of Glidia is the AI response engine (`src/lib/ai.ts`) that:

1. **Fetches real order data** from Shopify GraphQL API
2. **Analyzes order status** (delivered, shipped, pending, etc.)
3. **Determines appropriate tone** (positive, neutral, apologetic)
4. **Generates empathetic response** using OpenAI GPT-4
5. **Includes actionable next steps** for customers
6. **Flags escalation needs** for complex issues

### Example Usage

```typescript
import { generateWismoResponse } from '@/lib/ai';

const response = await generateWismoResponse({
  orderName: '#1001',
  customerName: 'Sarah',
  storeInfo: {
    name: 'Your Store',
    brandVoice: 'friendly',
    supportEmail: 'support@yourstore.com'
  }
});

console.log(response.message);
// "Hi Sarah! Great news about order #1001 - it's on its way to you! 
//  Your package shipped yesterday with FedEx (tracking: 1234567890) 
//  and should arrive by tomorrow. You can track it here: [link]"
```

## 🔧 API Endpoints

### `POST /api/wismo`
Get raw order data from Shopify
```json
{
  "orderName": "#1001"
}
```

### `POST /api/wismo/ai`
Generate AI-powered customer response
```json
{
  "orderName": "#1001",
  "customerName": "Sarah",
  "customerQuery": "Where is my order?",
  "storeInfo": {
    "name": "Your Store",
    "brandVoice": "friendly"
  }
}
```

## 🎨 Brand Voice Options

Glidia supports 4 brand voice settings:

- **Professional** - Courteous and direct
- **Friendly** - Warm and conversational 
- **Casual** - Relaxed and informal
- **Luxury** - Elegant and premium

Each voice generates contextually appropriate responses while maintaining helpful accuracy.

## 📊 Planned Features

- [ ] **Shopify App Store Submission**
- [ ] **Multi-channel Support** (Email, WhatsApp, SMS)
- [ ] **Refund Tracking** (WISMR)
- [ ] **Proactive Notifications**
- [ ] **Advanced Analytics Dashboard**
- [ ] **WooCommerce Integration**
- [ ] **Webhook Support**
- [ ] **Customer Portal**
- [ ] **Escalation Workflows**

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is proprietary software. All rights reserved.

## 🆘 Support

- **Documentation**: [docs.glidia.com](https://docs.glidia.com)
- **Support Email**: support@glidia.com
- **Discord**: [Join our community](https://discord.gg/glidia)

---

**Built with ❤️ for eCommerce merchants who want to focus on growing their business, not answering "Where's my order?" tickets.**