import React from 'react';
import { useToast } from '../context/ToastContext';

const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="pointer-events-auto animate-slide-in-right bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center gap-3 min-w-[280px]"
                    role="alert"
                    aria-live="polite"
                >
                    <span
                        className={`material-symbols-outlined shrink-0 ${
                            toast.type === 'success'
                                ? 'text-green-500'
                                : toast.type === 'error'
                                ? 'text-red-500'
                                : 'text-blue-500'
                        }`}
                        style={{ fontSize: '20px' }}
                    >
                        {toast.type === 'success'
                            ? 'check_circle'
                            : toast.type === 'error'
                            ? 'error'
                            : 'info'}
                    </span>
                    <p className="flex-1 text-sm font-medium text-text-main">{toast.message}</p>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close notification"
                    >
                        <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>
                            close
                        </span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;

