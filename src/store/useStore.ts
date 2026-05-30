import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MenuItem, menuData } from '../data/menuData';
import { menuApi, orderApi } from '../api';

export interface CartItem {
  id: number;
  menuItemId: number;
  quantity: number;
}

export interface Order {
  id: number;
  cartItems: CartItem[];
  date: string;
  notes?: string;
}

interface StoreState {
  menuItems: MenuItem[];
  cart: CartItem[];
  orders: Order[];
  isLoading: boolean;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (id: number, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: number) => Promise<void>;
  addToCart: (menuItemId: number) => void;
  removeFromCart: (menuItemId: number) => void;
  updateQuantity: (menuItemId: number, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (notes?: string) => Promise<void>;
  loadMenu: () => Promise<void>;
  loadOrders: () => Promise<void>;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      menuItems: menuData,
      cart: [],
      orders: [],
      isLoading: false,
      
      loadMenu: async () => {
        try {
          set({ isLoading: true });
          const items = await menuApi.getAll();
          if (items.length > 0) {
            set({ menuItems: items });
          }
        } catch (error) {
          console.error('加载菜单失败:', error);
        } finally {
          set({ isLoading: false });
        }
      },
      
      loadOrders: async () => {
        try {
          set({ isLoading: true });
          const orders = await orderApi.getAll();
          set({ orders: orders.map(order => ({
            id: order.id,
            cartItems: order.items.map((item: any) => ({
              id: item.id,
              menuItemId: item.id,
              quantity: item.quantity
            })),
            date: order.created_at,
            notes: ''
          })) });
        } catch (error) {
          console.error('加载订单失败:', error);
        } finally {
          set({ isLoading: false });
        }
      },
      
      addMenuItem: async (item) => {
        try {
          const newItem = await menuApi.create(item);
          set((state) => ({
            menuItems: [...state.menuItems, newItem]
          }));
        } catch (error) {
          console.error('添加菜品失败:', error);
          throw error;
        }
      },
      
      updateMenuItem: async (id, item) => {
        try {
          await menuApi.update(id, item);
          set((state) => ({
            menuItems: state.menuItems.map(i => 
              i.id === id ? { ...i, ...item } : i
            )
          }));
        } catch (error) {
          console.error('更新菜品失败:', error);
          throw error;
        }
      },
      
      deleteMenuItem: async (id) => {
        try {
          await menuApi.delete(id);
          set((state) => ({
            menuItems: state.menuItems.filter(i => i.id !== id)
          }));
        } catch (error) {
          console.error('删除菜品失败:', error);
          throw error;
        }
      },
      
      addToCart: (menuItemId: number) => {
        set((state) => {
          const existingItem = state.cart.find(item => item.menuItemId === menuItemId);
          if (existingItem) {
            return {
              cart: state.cart.map(item => 
                item.menuItemId === menuItemId 
                  ? { ...item, quantity: item.quantity + 1 } 
                  : item
              )
            };
          }
          return {
            cart: [...state.cart, { id: Date.now(), menuItemId, quantity: 1 }]
          };
        });
      },
      
      removeFromCart: (menuItemId: number) => {
        set((state) => ({
          cart: state.cart.filter(item => item.menuItemId !== menuItemId)
        }));
      },
      
      updateQuantity: (menuItemId: number, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter(item => item.menuItemId !== menuItemId)
            };
          }
          return {
            cart: state.cart.map(item => 
              item.menuItemId === menuItemId 
                ? { ...item, quantity } 
                : item
            )
          };
        });
      },
      
      clearCart: () => {
        set({ cart: [] });
      },
      
      placeOrder: async (notes?: string) => {
        const { cart, menuItems, orders } = get();
        if (cart.length === 0) return;
        
        const orderItems = cart.map(cartItem => {
          const menuItem = menuItems.find(item => item.id === cartItem.menuItemId);
          return {
            id: cartItem.menuItemId,
            name: menuItem?.name || '',
            price: menuItem?.price || 0,
            quantity: cartItem.quantity,
            image: menuItem?.image || ''
          };
        });
        
        const totalPrice = cart.reduce((total, cartItem) => {
          const menuItem = menuItems.find(item => item.id === cartItem.menuItemId);
          return total + (menuItem?.price || 0) * cartItem.quantity;
        }, 0);
        
        try {
          await orderApi.create(orderItems, totalPrice);
          
          const newOrder: Order = {
            id: Date.now(),
            cartItems: cart,
            date: new Date().toISOString(),
            notes
          };
          
          set({
            orders: [newOrder, ...orders],
            cart: []
          });
        } catch (error) {
          console.error('下单失败:', error);
          throw error;
        }
      }
    }),
    {
      name: 'couple-order-storage',
      storage: createJSONStorage(() => localStorage),
      version: 3,
      migrate: (persistedState: unknown, version: number) => {
        if (version < 3) {
          return {
            menuItems: menuData,
            cart: [],
            orders: [],
            isLoading: false,
            version: 3
          };
        }
        return persistedState as StoreState;
      }
    }
  )
);

export const getCartTotal = (cart: CartItem[], menuItems: MenuItem[]) => {
  return cart.reduce((total, cartItem) => {
    const menuItem = menuItems.find(item => item.id === cartItem.menuItemId);
    return total + (menuItem?.price || 0) * cartItem.quantity;
  }, 0);
};
