import React from 'react';
import Link from 'next/link';

function paymentConfirm() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-3xl font-bold text-primary">
        ✅ Payment Successful !
      </h1>
      <p className="mt-4 text-lg">
        Thank you for your purchase. Your order is being processed.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primaryHover transition"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default paymentConfirm;
