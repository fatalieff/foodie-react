import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';

const CartSidebar = () => {
  const { items, isOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subtotal = items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(toggleCart())}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-6 border-b border-[#f0e6de] flex items-center justify-between">
            <h2 className="text-2xl font-bold nunito text-[#2d2d2d] flex items-center gap-2">
              <i className="fa-solid fa-cart-shopping text-[#F03328]" />
              Your Basket
            </h2>
            <button 
              onClick={() => dispatch(toggleCart())}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <i className="fa-solid fa-xmark text-xl text-[#666666]" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-basket-shopping text-4xl text-gray-300" />
                </div>
                <p className="text-[#666666] nunito">Your basket is empty.</p>
                <button 
                  onClick={() => dispatch(toggleCart())}
                  className="text-[#F03328] font-bold hover:underline"
                >
                  Go shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.idMeal} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-[#f0e6de]">
                      <img src={item.strMealThumb} alt={item.strMeal} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-[#2d2d2d] nunito truncate pr-2">{item.strMeal}</h4>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.idMeal))}
                          className="text-gray-400 hover:text-[#F03328] transition-colors"
                        >
                          <i className="fa-solid fa-trash-can text-sm" />
                        </button>
                      </div>
                      <p className="text-[#F03328] font-bold mb-2">${item.price}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#f0e6de] rounded-lg overflow-hidden bg-gray-50">
                          <button 
                            onClick={() => dispatch(updateQuantity({ idMeal: item.idMeal, quantity: item.quantity - 1 }))}
                            className="px-2 py-1 hover:bg-white text-gray-600 transition-colors"
                          >
                            <i className="fa-solid fa-minus text-[10px]" />
                          </button>
                          <span className="px-3 py-1 font-bold text-sm text-[#2d2d2d] min-w-[32px] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => dispatch(updateQuantity({ idMeal: item.idMeal, quantity: item.quantity + 1 }))}
                            className="px-2 py-1 hover:bg-white text-gray-600 transition-colors"
                          >
                            <i className="fa-solid fa-plus text-[10px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-6 py-8 border-t border-[#f0e6de] bg-gray-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#666666] font-medium">Subtotal</span>
                <span className="text-2xl font-bold text-[#2d2d2d]">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-[#999] text-center">Taxes and shipping calculated at checkout</p>
              <button 
                className="w-full bg-gradient-to-r from-[#F03328] to-[#FF9E0C] text-white py-4 rounded-2xl font-extrabold text-lg shadow-lg shadow-red-200 hover:shadow-red-300 hover:-translate-y-px transition-all active:scale-[0.98]"
              >
                Checkout Now
              </button>
              <button 
                onClick={() => dispatch(clearCart())}
                className="w-full text-[#666666] text-sm font-medium hover:text-[#F03328] transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
