import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabaseClient';
import { calculateTax, PROVINCES } from '../utils/tax';

const shippingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(2, 'Province is required'),
  postalCode: z.string().min(5, 'Valid postal code is required'),
  email: z.string().email('Invalid email address')
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

const CheckoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      province: 'ON'
    }
  });

  const selectedProvince = watch('province');
  const { taxAmount, rate } = calculateTax(cartTotal, selectedProvince);
  const finalTotal = cartTotal + taxAmount;

  const onSubmit = async (data: ShippingFormValues) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const orderData = {
        user_id: user?.id || null,
        status: 'pending',
        total_amount: finalTotal,
        shipping_address: data,
        contact_email: data.email,
        stripe_payment_id: 'mock_payment_id' // Mocking payment for MVP
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        variant_id: item.variantId,
        quantity: item.quantity,
        price_at_time: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-bg-light pb-32">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-bg-light/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => navigate(-1)} className="text-text-main flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-text-main text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Secure Checkout</h2>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} id="checkout-form">
          {/* Shipping Section */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-slate-700">
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                </span>
                <h2 className="text-lg font-bold text-text-main">Shipping</h2>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
                <input {...register('email')} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none" placeholder="email@example.com" type="email" />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>
              <div className="flex gap-4">
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">First Name</label>
                  <input {...register('firstName')} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none" placeholder="Jane" />
                  {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Name</label>
                  <input {...register('lastName')} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none" placeholder="Doe" />
                  {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</label>
                <input {...register('address')} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none" placeholder="123 Maple Street" />
                {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
              </div>
              <div className="flex gap-4">
                <div className="flex-[2] space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">City</label>
                  <input {...register('city')} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none" placeholder="Toronto" />
                  {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prov</label>
                  <select {...register('province')} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-3 text-sm outline-none">
                    {PROVINCES.map(p => (
                      <option key={p.code} value={p.code}>{p.code}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Postal Code</label>
                <input {...register('postalCode')} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none" placeholder="M5V 2H1" />
                {errors.postalCode && <span className="text-red-500 text-xs">{errors.postalCode.message}</span>}
              </div>
            </div>
          </section>
        </form>

        {/* Order Summary */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <button
            onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
            className="w-full p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-slate-700">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              </span>
              <h2 className="text-lg font-bold text-text-main">Order Summary</h2>
            </div>
            <span className={`material-symbols-outlined text-slate-400 transition-transform ${isOrderSummaryOpen ? 'rotate-180' : ''}`}>expand_more</span>
          </button>

          {isOrderSummaryOpen && (
            <div className="px-5 pb-5 border-t border-slate-100 pt-4 animate-in slide-in-from-top-2 duration-200">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 mb-4">
                  <div className="h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 relative">
                    <img alt={item.name} className="h-full w-full object-cover" src={item.image} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-text-main leading-tight line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">Size: {item.size}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-semibold text-text-main">${item.price.toFixed(2)}</p>
                      <span className="text-xs text-slate-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="space-y-3 pt-4 border-t border-dashed border-slate-200">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-text-main">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping (Canada Post)</span>
                  <span className="font-medium text-text-main">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax ({selectedProvince} @ {(rate * 100).toFixed(1)}%)</span>
                  <span className="font-medium text-text-main">${taxAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer / Place Order */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4 pb-8 z-30 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] safe-bottom">
        <div className="max-w-md mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total CAD</span>
            <span className="text-2xl font-bold text-text-main tracking-tight">${finalTotal.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting || cartItems.length === 0}
            className="flex-1 h-14 bg-primary text-[#111712] rounded-full font-bold text-lg hover:bg-primary-dark active:scale-[0.98] transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : (
              <>
                <span>Place Order</span>
                <span className="material-symbols-outlined text-[20px] font-bold">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutScreen;