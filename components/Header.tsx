import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <Icon name="logo" className="h-8 w-8 text-brand-brown"/>
            <span className="text-xl sm:text-2xl font-semibold text-brand-dark tracking-tight">Carpintería Sobre Diseño C & Jimenez</span>
        </div>
        <button
          onClick={onCartClick}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Ver carrito de cotización"
        >
          <Icon name="cart" className="h-7 w-7 text-gray-700"/>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};