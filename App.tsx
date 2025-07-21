import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { QuoteCartModal } from './components/QuoteCartModal';
import { Toast } from './components/Toast';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    // Simula una carga de datos
    setProducts(PRODUCTS);
  }, []);
  
  const showToast = (message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.id === product.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    showToast(`${product.name} añadido a la cotización.`);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const handleUpdateQuantity = (productId: number, quantity: number) => {
     if (quantity <= 0) {
       handleRemoveFromCart(productId);
       return;
     }
     setCartItems(prevItems => prevItems.map(item => item.id === productId ? {...item, quantity} : item));
  }

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSubmitQuote = (userInfo: { name: string; email: string; phone: string }) => {
    console.log("Solicitud de cotización enviada:", {
      userInfo,
      items: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    });
    setIsCartOpen(false);
    setCartItems([]);
    showToast("¡Cotización enviada con éxito!", 'success');
  };

  return (
    <div className="font-sans bg-brand-light-gray min-h-screen text-brand-dark">
      <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-brand-dark mb-2 font-display">Fabricamos</h1>
            <p className="text-lg text-gray-600">Puertas, closets, cocinas, colocación de pisos de madera y trabajos de Corian. ¡Hacemos tu presupuesto!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>
       <QuoteCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onSubmit={handleSubmitQuote}
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
       <footer className="text-center py-6 mt-12 bg-white border-t border-gray-200">
            <p className="text-gray-500">&copy; {new Date().getFullYear()} Carpintería Sobre Diseño C & Jimenez. Todos los derechos reservados.</p>
        </footer>
    </div>
  );
}

export default App;