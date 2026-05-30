import { MenuItem } from '../data/menuData';
import { useStore } from '../store/useStore';
import { Heart, Plus, Minus } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard = ({ item }: MenuCardProps) => {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  
  const cartItem = cart.find(ci => ci.menuItemId === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-pink-400 text-white px-3 py-1 rounded-full text-sm font-medium">
          {item.category}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          <span className="text-xl font-bold text-pink-500">¥{item.price}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        
        {quantity > 0 ? (
          <div className="flex items-center justify-between bg-pink-50 rounded-xl p-3">
            <button
              onClick={() => updateQuantity(item.id, quantity - 1)}
              className="w-8 h-8 bg-pink-400 text-white rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="font-bold text-gray-800">{quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, quantity + 1)}
              className="w-8 h-8 bg-pink-400 text-white rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(item.id)}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:from-pink-500 hover:to-purple-500 transition-all transform hover:scale-105"
          >
            <Heart size={18} />
            <span>加入购物车</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
