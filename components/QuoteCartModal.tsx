
import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { Icon } from './Icon';

interface QuoteCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onClearCart: () => void;
  onSubmit: (userInfo: { name: string; email: string; phone: string }) => void;
}

export const QuoteCartModal: React.FC<QuoteCartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string; phone?: string}>({});

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (!isOpen) {
      // Reset state on close
      setName('');
      setEmail('');
      setPhone('');
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {name?: string; email?: string; phone?: string} = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!email.trim()) newErrors.email = "El email es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "El formato del email no es válido.";
    if (!phone.trim()) newErrors.phone = "El teléfono es obligatorio.";
    else if (!/^\d{10,}$/.test(phone.replace(/\s/g, ''))) newErrors.phone = "El teléfono debe tener al menos 10 dígitos.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit({ name, email, phone });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-brand-dark">Solicitud de Cotización</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full"><Icon name="close" className="h-6 w-6" /></button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center p-12">
            <Icon name="emptyCart" className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Tu carrito de cotización está vacío</h3>
            <p className="text-gray-500 mt-2">Añade productos del catálogo para solicitar una cotización.</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-5">
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center py-4">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="ml-4 flex-grow">
                    <h4 className="font-semibold text-brand-dark">{item.name}</h4>
                    <p className="text-sm text-gray-500">${item.price.toLocaleString('es-MX')}</p>
                    <div className="flex items-center mt-2">
                        <input type="number" value={item.quantity} onChange={e => onUpdateQuantity(item.id, parseInt(e.target.value, 10))} className="w-16 text-center border rounded-md"/>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-brand-dark">${(item.price * item.quantity).toLocaleString('es-MX')}</p>
                    <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 text-sm mt-1">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right py-2">
                <button onClick={onClearCart} className="text-sm text-gray-500 hover:text-brand-dark">Limpiar carrito</button>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <div className="text-right mb-4">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-2xl font-bold text-brand-dark ml-2">${subtotal.toLocaleString('es-MX')}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <h3 className="text-lg font-semibold mb-3 text-brand-dark">Tus datos de contacto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input type="text" placeholder="Nombre completo" value={name} onChange={e => setName(e.target.value)} className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                     <div>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                     <div>
                        <input type="tel" placeholder="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                </div>
                 <button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-brand-brown text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors disabled:bg-gray-400 flex items-center justify-center">
                    {isSubmitting ? <Icon name="spinner" className="animate-spin h-5 w-5 mr-3"/> : null}
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud de Cotización'}
                 </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
