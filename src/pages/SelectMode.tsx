import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import MenuCard from '../components/MenuCard';
import { Heart, User, Users, Sparkles } from 'lucide-react';

const SelectMode = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'single' | 'couple' | null>(null);
  const [person1Selections, setPerson1Selections] = useState<number[]>([]);
  const [person2Selections, setPerson2Selections] = useState<number[]>([]);
  const [shuffleIndex, setShuffleIndex] = useState<number>(0);

  const menuItems = useStore((state) => state.menuItems);
  const addToCart = useStore((state) => state.addToCart);
  const allMenuItems = menuItems;

  const startSingleMode = () => {
    setMode('single');
    shuffleMenu();
  };

  const startCoupleMode = () => {
    setMode('couple');
  };

  const shuffleMenu = () => {
    const randomIndex = Math.floor(Math.random() * allMenuItems.length);
    setShuffleIndex(randomIndex);
  };

  const togglePerson1Selection = (itemId: number) => {
    setPerson1Selections(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const togglePerson2Selection = (itemId: number) => {
    setPerson2Selections(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const confirmSelection = () => {
    if (mode === 'single') {
      addToCart(allMenuItems[shuffleIndex].id);
    } else if (mode === 'couple') {
      person1Selections.forEach(id => addToCart(id));
      person2Selections.forEach(id => addToCart(id));
    }
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Heart className="fill-white mx-auto mb-4" size={40} />
          <h1 className="text-3xl font-bold mb-2">互动选餐</h1>
          <p className="text-lg opacity-90">选择你们喜欢的方式来挑选美食吧！</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!mode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <button
              onClick={startSingleMode}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="bg-pink-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <User className="text-pink-500" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">一人挑选</h3>
              <p className="text-gray-600">不知道吃什么？让我们帮你随机推荐！</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-pink-500">
                <Sparkles size={18} />
                <span>趣味玩法</span>
              </div>
            </button>

            <button
              onClick={startCoupleMode}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="bg-purple-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="text-purple-500" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">两人选餐</h3>
              <p className="text-gray-600">各自挑选心仪的菜品，一起决定今天的菜单！</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-purple-500">
                <Heart size={18} />
                <span>甜蜜互动</span>
              </div>
            </button>
          </div>
        )}

        {mode === 'single' && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">✨ 随机选择 ✨</h2>
              <p className="text-gray-600">点击按钮，让命运决定今天吃什么！</p>
            </div>

            <div className="mb-8">
              <MenuCard item={allMenuItems[shuffleIndex]} />
            </div>

            <div className="flex gap-4">
              <button
                onClick={shuffleMenu}
                className="flex-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white py-4 rounded-xl font-medium hover:from-pink-500 hover:to-purple-500 transition-all"
              >
                🎲 再换一个
              </button>
              <button
                onClick={confirmSelection}
                className="flex-1 bg-white border-2 border-pink-400 text-pink-500 py-4 rounded-xl font-medium hover:bg-pink-50 transition-all"
              >
                确定这个！
              </button>
            </div>
          </div>
        )}

        {mode === 'couple' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">💕 两人选餐 💕</h2>
              <p className="text-gray-600">左边是TA的选择，右边是你的选择（可多选）</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-pink-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">TA的选择</h3>
                  </div>
                  <span className="text-pink-500 font-medium">{person1Selections.length} 个菜品</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allMenuItems.map((item) => (
                    <div
                      key={`p1-${item.id}`}
                      onClick={() => togglePerson1Selection(item.id)}
                      className={`cursor-pointer rounded-xl overflow-hidden border-3 transition-all ${
                        person1Selections.includes(item.id)
                          ? 'border-pink-500 shadow-lg'
                          : 'border-transparent hover:border-pink-200'
                      }`}
                    >
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                        {person1Selections.includes(item.id) && (
                          <div className="absolute inset-0 bg-pink-500/30 flex items-center justify-center">
                            <Heart className="fill-white text-white" size={32} />
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-white">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-pink-500 font-bold">¥{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">你的选择</h3>
                  </div>
                  <span className="text-purple-500 font-medium">{person2Selections.length} 个菜品</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allMenuItems.map((item) => (
                    <div
                      key={`p2-${item.id}`}
                      onClick={() => togglePerson2Selection(item.id)}
                      className={`cursor-pointer rounded-xl overflow-hidden border-3 transition-all ${
                        person2Selections.includes(item.id)
                          ? 'border-purple-500 shadow-lg'
                          : 'border-transparent hover:border-purple-200'
                      }`}
                    >
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                        {person2Selections.includes(item.id) && (
                          <div className="absolute inset-0 bg-purple-500/30 flex items-center justify-center">
                            <Heart className="fill-white text-white" size={32} />
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-white">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-purple-500 font-bold">¥{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={confirmSelection}
                disabled={person1Selections.length === 0 && person2Selections.length === 0}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white py-4 px-12 rounded-xl font-medium hover:from-pink-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                确认选择 ({person1Selections.length + person2Selections.length} 个菜品) 💕
              </button>
            </div>
          </div>
        )}

        {mode && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setMode(null);
                setPerson1Selections([]);
                setPerson2Selections([]);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ← 返回选择模式
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectMode;
