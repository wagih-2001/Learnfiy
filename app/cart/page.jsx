'use client';
import React, { useContext } from 'react';
import { CartContext } from '../_context/CartContext';
import cartApis from '../_Utils/cartApis';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

function Cart() {
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach(ele => {
      totalAmount += Number(ele?.product?.price);
    });
    return totalAmount;
  };

  const deleteCartItemFromList = documentId => {
    Swal.fire({
      title: 'Are you sure ',
      text: 'Do you really want to remove this product from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      background: '#fff',
      color: '#333'
    }).then(result => {
      if (result.isConfirmed) {
        cartApis
          .deleteCartItem(documentId)
          .then(res => {
            if (res?.status === 200 || res?.status === 204) {
              setCart(oldCart =>
                oldCart.filter(item => item.documentId !== documentId)
              );
              Swal.fire({
                title: 'Deleted! ✅',
                text: 'The product has been removed from your cart.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
              });
            }
          })
          .catch(error => {
            console.error(' Error deleting cart item:', error);
            Swal.fire({
              title: 'Error ',
              text: 'An error occurred while deleting. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
          });
      }
    });
  };

  const totalAmount = getTotalAmount();
  const discountRate = 10;
  const discount = (totalAmount * discountRate) / 100;
  const totalAfterDiscount = totalAmount - discount;

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart.map(item => {
                console.log(item.id);

                return (
                  <li key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.product?.banner?.url}
                      alt="banner-cart"
                      className="size-16 rounded-sm object-cover"
                    />
                    <div>
                      <h3 className="text-sm text-gray-900">
                        {item.product?.title}
                      </h3>
                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Category :</dt>
                          <dd className="inline"> {item.product?.category}</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex flex-1 items-center justify-end gap-2">
                      <dd className="inline">$ {item.product?.price}</dd>
                      <button
                        className="text-gray-600 transition hover:text-red-600"
                        onClick={() => deleteCartItemFromList(item?.documentId)}
                      >
                        <span className="sr-only">Remove item</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9M19.228 5.79l-1.068 13.883A2.25 2.25 0 0115.916 21H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.11 48.11 0 00-3.478-.397m-12 .562a48.11 48.11 0 013.478-.397m7.5 0v-.916a2.25 2.25 0 00-2.09-2.201 51.964 51.964 0 00-3.32 0 2.25 2.25 0 00-2.09 2.201v.916"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>${totalAmount.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd className="text-red-600">- ${discount.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>${totalAfterDiscount.toFixed(2)}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                      />
                    </svg>
                    <p className="text-xs whitespace-nowrap">
                      {discountRate}% Discount Applied
                    </p>
                  </span>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      router.push(
                        `/checkout?amount=${totalAfterDiscount.toFixed(2)}`
                      )
                    }
                    className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            <h2 className="text-gray-500  text-[12px]">
              Note : All Items will be sent via Email{' '}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
