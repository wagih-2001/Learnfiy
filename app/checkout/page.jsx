import { Suspense } from "react";
import CheckoutContent from "./_components/CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
