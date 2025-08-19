// src/app/app/billing/page.tsx
import { Suspense } from 'react';
import BillingClient from './BillingClient';

export default function BillingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillingClient />
    </Suspense>
  );
}