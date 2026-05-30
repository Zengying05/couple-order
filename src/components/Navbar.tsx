import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Heart, ShoppingCart, Clock, Home, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const cart = useStore((state) => state.cart);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="text-white fill-white" size={24} />
            <span className="text-white font-bold text-xl">情侣点单</span>
          </div>
          
          <div className="flex space-x-1 sm:space-x-6">
            <Link 
              to="/" 
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Home className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">首页</span>
            </Link>
            
            <Link 
              to="/select" 
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/select') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">选餐</span>
            </Link>
            
            <Link 
              to="/cart" 
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/cart') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">购物车</span>
              {cartCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/history" 
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/history') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Clock className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">历史</span>
            </Link>
            
            <Link 
              to="/manage-menu" 
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/manage-menu') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Settings className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">管理</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
