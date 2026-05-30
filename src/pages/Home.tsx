import { useState } from 'react';
import { useStore } from '../store/useStore';
import MenuCard from '../components/MenuCard';
import { Heart, Sparkles } from 'lucide-react';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const menuItems = useStore((state) => state.menuItems);

  const allMenuItems = menuItems;

  const categories = ["全部", ...Array.from(new Set(allMenuItems.map(item => item.category)))];
  
  const filteredMenu = selectedCategory === "全部" 
    ? allMenuItems 
    : allMenuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="fill-white animate-pulse" size={48} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            欢迎来到情侣点单
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            为你们的约会增添甜蜜，一起挑选美食，记录美好时光 💕
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Sparkles className="text-yellow-200" />
            <span className="text-yellow-100 font-medium">精选美食 · 温馨时光</span>
            <Sparkles className="text-yellow-200" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-pink-50 shadow'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        
        {filteredMenu.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">暂无该分类的菜品</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
