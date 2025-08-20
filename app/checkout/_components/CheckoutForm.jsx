'use client';

import {
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { CartContext } from '../../_context/CartContext';
import { useUser } from '@clerk/nextjs';
import OrderApi from '../../_Utils/OrderApi';
import cartApis from '../../_Utils/cartApis';
import Swal from 'sweetalert2';

export default function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    try {
      const productIds = cart.map(el => el?.product?.id);
      console.log('Creating order with:', {
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
        amount,
        products: productIds
      });

      const res = await OrderApi.createOrder({
        data: {
          email: user.primaryEmailAddress.emailAddress,
          username: user.fullName,
          amount,
          products: productIds
        }
      });


      for (const el of cart) {
        if (!el?.documentId) {
          continue;
        }
        try {
          const delRes = await cartApis.deleteCartItem(el.documentId);
          console.log('🗑 Deleted cart item:', el.documentId, delRes.data);
          setCart(prev => prev.filter(i => i.documentId !== el.documentId));
        } catch (delErr) {
          console.error('❌ Failed to delete cart item:', el.documentId, delErr);
          Swal.fire({
            title: 'Delete Error ❌',
            text: delErr.response?.data?.message || 'Failed to delete item from cart.',
            icon: 'error'
          });
        }
      }

      Swal.fire({
        title: 'Success ✅',
        text: 'Your order has been placed successfully.',
        icon: 'success'
      });

    } catch (error) {
      console.error( error);
      Swal.fire({
        title: 'Order Error ❌',
        text: error.response?.data?.message || 'Something went wrong while creating the order.',
        icon: 'error'
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/payment-confirm`
      }
    });

    if (error?.message) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    await createOrder();

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-primary">
          Complete Your Payment
        </h2>

        <PaymentElement className="mt-4" />

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary-dark transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Processing' : `Pay ${amount / 100} USD`}
        </button>

        {message && (
          <p className="text-center text-red-500 text-sm mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
