import { useStore } from '../store/useStore';
import { Heart, Clock, Calendar } from 'lucide-react';

const History = () => {
  const orders = useStore((state) => state.orders);
  const menuItems = useStore((state) => state.menuItems);
  const allMenuItems = menuItems;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderTotal = (order: any) => {
    return order.cartItems.reduce((total: number, cartItem: any) => {
      const menuItem = allMenuItems.find(item => item.id === cartItem.menuItemId);
      return total + (menuItem?.price || 0) * cartItem.quantity;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Clock className="mx-auto mb-4" size={40} />
          <h1 className="text-3xl font-bold mb-2">历史订单</h1>
          <p className="text-lg opacity-90">记录我们一起吃过的美食 💕</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-500 mb-2">还没有订单记录</h3>
            <p className="text-gray-400">开始你们的第一次点单吧！</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-pink-500" size={20} />
                    <span className="font-bold text-gray-700">{formatDate(order.date)}</span>
                  </div>
                  <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-1 rounded-full font-bold">
                    ¥{getOrderTotal(order)}
                  </span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    {order.cartItems.map((cartItem: any) => {
                      const menuItem = allMenuItems.find(item => item.id === cartItem.menuItemId);
                      if (!menuItem) return null;
                      return (
                        <div key={cartItem.id} className="text-center">
                          <img
                            src={menuItem.image}
                            alt={menuItem.name}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                          <p className="text-sm font-medium text-gray-700">{menuItem.name}</p>
                          <p className="text-xs text-gray-500">x{cartItem.quantity}</p>
                        </div>
                      );
                    })}
                  </div>
                  {order.notes && (
                    <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">备注：</span>{order.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
