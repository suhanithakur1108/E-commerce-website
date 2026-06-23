import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { CgClose } from 'react-icons/cg';


const PaymentModal = ({ isOpen, onClose, totalPrice }) => {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            toast.success(' Payment Successful! ');
            clearCart();           // Cart empty
            onClose();             // Modal band
            navigate('/');         // Home page
        }, 2000);
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
            <div className='bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative'>
                {/* Close Button */}
                <button onClick={onClose} className='absolute top-4 right-4 text-gray-500 hover:text-red-500'>
                    <CgClose className='w-6 h-6' />
                </button>

                <h2 className='text-2xl font-bold text-center mb-6'>💳 Payment</h2>

                <form onSubmit={handlePayment} className='space-y-4'>
                    {/* Card Number */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Card Number</label>
                        <input
                            type='text'
                            placeholder='4242 4242 4242 4242'
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none'
                            required
                        />
                    </div>

                    {/* Expiry & CVV */}
                    <div className='flex gap-4'>
                        <div className='w-1/2'>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Expiry</label>
                            <input
                                type='text'
                                placeholder='MM/YY'
                                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none'
                                required
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>CVV</label>
                            <input
                                type='password'
                                placeholder='123'
                                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none'
                                required
                            />
                        </div>
                    </div>

                    {/* Total Amount */}
                    <div className='bg-gray-50 p-3 rounded-lg flex justify-between'>
                        <span className='font-semibold'>Total Amount</span>
                        <span className='font-bold text-red-500 text-lg'>${totalPrice}</span>
                    </div>

                    {/* Pay Button */}
                    <button
                        type='submit'
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-white font-bold text-lg transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-linear-to-r from-red-500 to-purple-500 hover:scale-105'
                            }`}
                    >
                        {loading ? 'Processing...' : ' Pay Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;