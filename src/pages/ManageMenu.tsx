import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { MenuItem } from '../data/menuData';

const ManageMenu = () => {
  const menuItems = useStore((state) => state.menuItems);
  const addMenuItem = useStore((state) => state.addMenuItem);
  const updateMenuItem = useStore((state) => state.updateMenuItem);
  const deleteMenuItem = useStore((state) => state.deleteMenuItem);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: ''
  });

  const allMenuItems = menuItems;
  const categories = Array.from(new Set(allMenuItems.map(item => item.category))).filter(Boolean);

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.image) {
      alert('请填写所有字段');
      return;
    }

    if (editingId) {
      updateMenuItem(editingId, formData);
      setEditingId(null);
    } else {
      addMenuItem(formData);
      setIsAdding(false);
    }

    setFormData({
      name: '',
      description: '',
      price: 0,
      category: categories[0] || '',
      image: ''
    });
  };

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: categories[0] || '',
      image: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">菜单管理</h1>
          <p className="text-lg opacity-90">添加、编辑和删除菜品</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Add Button */}
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center justify-center gap-3 hover:shadow-xl transition-all"
          >
            <Plus className="text-pink-500" size={32} />
            <span className="text-xl font-bold text-gray-700">添加新菜品</span>
          </button>
        )}

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? '编辑菜品' : '添加新菜品'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  菜品名称
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="例如：浪漫双人牛排"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  描述
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                  rows={3}
                  placeholder="描述这道菜的特色..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    价格 (元)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="88"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    分类
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  图片 URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image && (
                  <img 
                    src={formData.image} 
                    alt="预览" 
                    className="mt-2 w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=图片加载失败';
                    }}
                  />
                )}
              </div>
              
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-pink-500 hover:to-purple-500 transition-all"
              >
                <Save size={20} />
                {editingId ? '保存修改' : '添加菜品'}
              </button>
            </div>
          </div>
        )}

        {/* Menu List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-pink-100 to-purple-100">
            <h2 className="text-xl font-bold text-gray-800">
              菜品列表 ({allMenuItems.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {allMenuItems.map((item) => (
              <div key={item.id} className="p-6 flex items-center gap-4 hover:bg-pink-50 transition-colors">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-pink-500">¥{item.price}</span>
                      <div className="mt-1">
                        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`确定要删除 "${item.name}" 吗？`)) {
                        deleteMenuItem(item.id);
                      }
                    }}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMenu;
