
import React, { useEffect, useState } from 'react';
import { Icon } from './Icon';

interface ToastProps {
  message: string;
  type: 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 2700);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, type]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-blue-500';
  const iconName = type === 'success' ? 'success' : 'info';
  
  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center p-4 rounded-lg text-white shadow-lg transition-transform duration-300 ease-in-out ${bgColor} ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      role="alert"
    >
        <Icon name={iconName} className="h-6 w-6 mr-3"/>
      <span className="font-medium">{message}</span>
    </div>
  );
};
