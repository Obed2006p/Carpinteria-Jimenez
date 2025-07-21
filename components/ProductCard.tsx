
import React from 'react';
import { Product } from '../types';
import { Icon } from './Icon';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute top-2 left-2 bg-brand-cream/80 text-brand-dark px-3 py-1 text-sm font-semibold rounded-full">{product.category}</div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-brand-dark mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-2xl font-light text-brand-brown">
            ${product.price.toLocaleString('es-MX')}
          </p>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-brand-brown text-white px-4 py-2 rounded-full flex items-center space-x-2 font-semibold hover:bg-brand-dark transition-colors duration-300"
            aria-label={`Añadir ${product.name} a la cotización`}
          >
            <Icon name="plus" className="h-5 w-5" />
            <span>Cotizar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
