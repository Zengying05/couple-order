export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const menuData: MenuItem[] = [
  {
    id: 1,
    name: "浪漫双人牛排",
    description: "精选澳洲和牛，搭配浪漫红酒汁，适合情侣共享",
    price: 188,
    category: "主菜",
    image: "https://picsum.photos/seed/steak/400/300"
  },
  {
    id: 2,
    name: "爱心披萨",
    description: "心形披萨，铺满你最爱的配料，甜蜜满分",
    price: 98,
    category: "主菜",
    image: "https://picsum.photos/seed/pizza/400/300"
  },
  {
    id: 3,
    name: "甜蜜沙拉",
    description: "新鲜水果与蔬菜，为你们的约会带来清新体验",
    price: 48,
    category: "前菜",
    image: "https://picsum.photos/seed/salad/400/300"
  },
  {
    id: 4,
    name: "情侣鸡尾酒",
    description: "两杯特制鸡尾酒，粉蓝搭配，象征甜蜜的爱情",
    price: 68,
    category: "饮品",
    image: "https://picsum.photos/seed/cocktail/400/300"
  },
  {
    id: 5,
    name: "玫瑰冰淇淋",
    description: "玫瑰花瓣口味，口感细腻，浪漫又美味",
    price: 58,
    category: "甜点",
    image: "https://picsum.photos/seed/icecream/400/300"
  },
  {
    id: 6,
    name: "巧克力熔岩蛋糕",
    description: "切开后巧克力流心流出，就像你们浓浓的爱意",
    price: 78,
    category: "甜点",
    image: "https://picsum.photos/seed/cake/400/300"
  },
  {
    id: 7,
    name: "海鲜意面",
    description: "新鲜海鲜与意面完美结合，口感丰富",
    price: 88,
    category: "主菜",
    image: "https://picsum.photos/seed/pasta/400/300"
  },
  {
    id: 8,
    name: "法式蜗牛",
    description: "经典法式料理，美味与浪漫的完美结合",
    price: 128,
    category: "前菜",
    image: "https://picsum.photos/seed/snail/400/300"
  }
];
