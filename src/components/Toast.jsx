import React, { createContext, useContext, useReducer } from 'react';
import './Toast.css';

const ToastContext = createContext();

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, { ...action.toast, id: Date.now() }];
    case 'REMOVE_TOAST':
      return state.filter(toast => toast.id !== action.id);
    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    dispatch({ type: 'ADD_TOAST', toast: { id, message, type } });
    
    // Auto remove toast after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', id });
    }, 5000);
  };

  const removeToast = (id) => {
    dispatch({ type: 'REMOVE_TOAST', id });
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const Toast = ({ toast, onRemove }) => {
  return (
    <div className={`toast toast-${toast.type}`}>
      <span>{toast.message}</span>
      <button onClick={() => onRemove(toast.id)}>×</button>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;