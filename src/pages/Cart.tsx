import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, getCartTotal } from '../store/useStore';
import { Heart, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const menuItems = useStore((state) => state.menuItems);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const placeOrder = useStore((state) => state.placeOrder);
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const allMenuItems = menuItems;
  const total = getCartTotal(cart, allMenuItems);

  const handlePlaceOrder = () => {
    placeOrder(notes);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/history');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <ShoppingCart className="mx-auto mb-4" size={40} />
          <h1 className="text-3xl font-bold mb-2">购物车</h1>
          <p className="text-lg opacity-90">确认你们的选择，准备下单吧！</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl mb-6 text-center">
            <Heart className="inline mr-2 fill-green-500" />
            <span className="font-medium">下单成功！正在跳转...</span>
          </div>
        )}

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-500 mb-2">购物车是空的</h3>
            <p className="text-gray-400 mb-6">去挑选一些美食吧！</p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-xl font-medium hover:from-pink-500 hover:to-purple-500 transition-all"
            >
              去选餐
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="text-pink-500" />
                已选菜品
              </h2>
              <div className="space-y-4">
                {cart.map((cartItem) => {
                  const menuItem = allMenuItems.find(item => item.id === cartItem.menuItemId);
                  if (!menuItem) return null;
                  
                  return (
                    <div key={cartItem.id} className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
                      <img
                        src={menuItem.image}
                        alt={menuItem.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{menuItem.name}</h3>
                        <p className="text-pink-500 font-medium">¥{menuItem.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(menuItem.id, cartItem.quantity - 1)}
                          className="w-8 h-8 bg-pink-400 text-white rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold text-gray-800 w-8 text-center">{cartItem.quantity}</span>
                        <button
                          onClick={() => updateQuantity(menuItem.id, cartItem.quantity + 1)}
                          className="w-8 h-8 bg-pink-400 text-white rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(menuItem.id)}
                        className="text-red-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">备注</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="有什么特殊要求吗？比如不要香菜、少辣等..."
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                rows={3}
              />
            </div>

            {/* Total & Checkout */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">总计</span>
                <span className="text-3xl font-bold text-pink-500">¥{total}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-500 hover:to-purple-500 transition-all transform hover:scale-105"
              >
                💕 确认下单 💕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
