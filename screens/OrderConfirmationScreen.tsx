import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderConfirmationScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-bg-light p-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-green-600 text-5xl">check_circle</span>
            </div>
            <h1 className="text-3xl font-bold text-text-main mb-2">Order Confirmed!</h1>
            <p className="text-gray-500 mb-8 max-w-md">
                Thank you for your purchase. Your order <span className="font-mono font-semibold text-text-main">#{id?.slice(0, 8)}</span> has been received and is being processed.
            </p>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full max-w-sm mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">What happens next?</h3>
                <ol className="text-left text-sm space-y-3 text-gray-600">
                    <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary">mail</span>
                        <span>You will receive an order confirmation email shortly.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary">local_shipping</span>
                        <span>We will notify you when your items ship.</span>
                    </li>
                </ol>
            </div>

            <button
                onClick={() => navigate('/products')}
                className="px-8 py-3 bg-primary text-text-main font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
                Continue Shopping
            </button>
        </div>
    );
};

export default OrderConfirmationScreen;
