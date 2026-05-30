const API_BASE_URL = 'http://localhost:3001/api';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Order {
  id: number;
  order_number: string;
  items: CartItem[];
  total_price: number;
  status: string;
  created_at: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// 菜单 API
export const menuApi = {
  getAll: async (): Promise<MenuItem[]> => {
    const response = await fetch(`${API_BASE_URL}/menu`);
    return response.json();
  },

  create: async (item: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    return response.json();
  },

  update: async (id: number, item: Partial<MenuItem>): Promise<MenuItem> => {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'DELETE',
    });
  },
};

// 订单 API
export const orderApi = {
  getAll: async (): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return response.json();
  },

  create: async (items: CartItem[], total_price: number): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, total_price }),
    });
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
    });
  },
};
