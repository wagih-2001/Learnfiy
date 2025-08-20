'use client';

import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from './CheckoutForm';
import { getStripe } from '../../_Utils/stripe';

export default function CheckoutContent() {
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const rawAmount = Number(searchParams.get('amount') || 0);
    if (!rawAmount) return;

    const amountInCents = Math.round(rawAmount * 100);
    setAmount(amountInCents);

    fetch('/api/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amountInCents })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [searchParams]);

  const appearance = { theme: 'stripe' };
  const options = { clientSecret, appearance };
  const stripePromise = getStripe();

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>
      )}
    </div>
  );
}
