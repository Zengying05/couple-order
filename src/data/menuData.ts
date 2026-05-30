export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const menuData: MenuItem[] = [
  // 京菜
  {
    id: 1,
    name: "涮羊肉",
    description: "铜锅炭火，羊肉细嫩",
    price: 88,
    category: "京菜",
    image: "https://picsum.photos/seed/shuanyangrou/400/300"
  },
  {
    id: 2,
    name: "炸酱面",
    description: "老北京传统面食，酱香浓郁",
    price: 25,
    category: "京菜",
    image: "https://picsum.photos/seed/zhajiang/400/300"
  },
  {
    id: 3,
    name: "烤鸭",
    description: "皮脆肉嫩，色泽红润",
    price: 128,
    category: "京菜",
    image: "https://picsum.photos/seed/kaoya/400/300"
  },
  {
    id: 4,
    name: "驴打滚",
    description: "软糯香甜，豆香浓郁",
    price: 15,
    category: "京菜",
    image: "https://picsum.photos/seed/lvdagun/400/300"
  },
  // 川菜
  {
    id: 5,
    name: "回锅肉",
    description: "川菜经典，肥而不腻",
    price: 48,
    category: "川菜",
    image: "https://picsum.photos/seed/huiguorou/400/300"
  },
  {
    id: 6,
    name: "宫保鸡丁",
    description: "花生香脆，鸡肉嫩滑",
    price: 42,
    category: "川菜",
    image: "https://picsum.photos/seed/gongbaojiding/400/300"
  },
  {
    id: 7,
    name: "糖醋里脊",
    description: "酸甜可口，外酥里嫩",
    price: 52,
    category: "川菜",
    image: "https://picsum.photos/seed/tangculiji/400/300"
  },
  {
    id: 8,
    name: "鱼香肉丝",
    description: "咸甜酸辣，味道鲜美",
    price: 38,
    category: "川菜",
    image: "https://picsum.photos/seed/yuxiangrousi/400/300"
  },
  {
    id: 9,
    name: "麻婆豆腐",
    description: "麻辣鲜香，下饭神器",
    price: 28,
    category: "川菜",
    image: "https://picsum.photos/seed/mapodoufu/400/300"
  },
  // 浙菜
  {
    id: 10,
    name: "东坡肉",
    description: "肥而不腻，入口即化",
    price: 68,
    category: "浙菜",
    image: "https://picsum.photos/seed/dongporou/400/300"
  },
  {
    id: 11,
    name: "叫花鸡",
    description: "荷叶包裹，香气四溢",
    price: 78,
    category: "浙菜",
    image: "https://picsum.photos/seed/jiaohuaji/400/300"
  },
  {
    id: 12,
    name: "西湖醋鱼",
    description: "酸甜适口，鱼肉鲜嫩",
    price: 88,
    category: "浙菜",
    image: "https://picsum.photos/seed/xihucuyu/400/300"
  },
  // 粤菜
  {
    id: 13,
    name: "叉烧肉",
    description: "蜜汁香甜，肉质鲜嫩",
    price: 58,
    category: "粤菜",
    image: "https://picsum.photos/seed/chashao/400/300"
  },
  {
    id: 14,
    name: "白切鸡",
    description: "皮爽肉滑，原汁原味",
    price: 48,
    category: "粤菜",
    image: "https://picsum.photos/seed/baiqieji/400/300"
  },
  {
    id: 15,
    name: "虾饺",
    description: "晶莹剔透，鲜美多汁",
    price: 38,
    category: "粤菜",
    image: "https://picsum.photos/seed/xiajiao/400/300"
  },
  {
    id: 16,
    name: "蛋挞",
    description: "酥脆香甜，奶香浓郁",
    price: 28,
    category: "粤菜",
    image: "https://picsum.photos/seed/danta/400/300"
  },
  // 苏菜
  {
    id: 17,
    name: "松鼠桂鱼",
    description: "外酥里嫩，酸甜可口",
    price: 98,
    category: "苏菜",
    image: "https://picsum.photos/seed/songshuguiyu/400/300"
  },
  {
    id: 18,
    name: "清炖狮子头",
    description: "汤清味鲜，肉质细嫩",
    price: 68,
    category: "苏菜",
    image: "https://picsum.photos/seed/shizitou/400/300"
  },
  {
    id: 19,
    name: "糖醋小排",
    description: "酸甜适中，排骨酥烂",
    price: 58,
    category: "苏菜",
    image: "https://picsum.photos/seed/tangcupaigu/400/300"
  },
  {
    id: 20,
    name: "红烧狮子头",
    description: "酱香浓郁，入口即化",
    price: 68,
    category: "苏菜",
    image: "https://picsum.photos/seed/hongshaoshizitou/400/300"
  },
  // 闽菜
  {
    id: 21,
    name: "佛跳墙",
    description: "山珍海味，营养丰富",
    price: 188,
    category: "闽菜",
    image: "https://picsum.photos/seed/fitiaoqiang/400/300"
  },
  {
    id: 22,
    name: "荔枝肉",
    description: "酸甜开胃，形似荔枝",
    price: 48,
    category: "闽菜",
    image: "https://picsum.photos/seed/lizhirou/400/300"
  }
];
