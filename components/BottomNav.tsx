import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/home' && (currentPath === '/home' || currentPath === '/')) return true;
    return currentPath.startsWith(path);
  };

  const navItems = [
    { icon: 'home', label: 'Home', path: '/home' },
    { icon: 'grid_view', label: 'Shop', path: '/products' }, // Using grid_view as Search/Shop icon
    { icon: 'favorite', label: 'Saved', path: '/saved' },
    { icon: 'person', label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-100 pb-safe pt-2 px-6 h-[80px] flex justify-between items-start shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] safe-bottom">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          aria-label={`Navigate to ${item.label}`}
          aria-current={isActive(item.path) ? 'page' : undefined}
          className={`group flex flex-1 flex-col items-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1 ${
            isActive(item.path) ? 'text-text-main' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <span className={`material-symbols-outlined transition-transform group-active:scale-95 ${isActive(item.path) ? 'font-semibold fill-1' : ''}`} style={{ fontSize: '24px' }}>
            {item.icon}
          </span>
          <span className={`text-[10px] ${isActive(item.path) ? 'font-bold' : 'font-medium'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;