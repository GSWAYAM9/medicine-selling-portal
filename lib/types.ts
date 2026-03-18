export type UserRole = 'customer' | 'doctor' | 'pharmacist' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  requiresPrescription: boolean;
  manufacturer: string;
  image: string;
  rating: number;
}

export interface CartItem {
  medicineId: string;
  quantity: number;
  medicine: Medicine;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'approved' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  prescriptionRequired: boolean;
  prescriptionId?: string;
  estimatedDelivery: Date;
}

export interface OrderItem {
  medicineId: string;
  medicine: Medicine;
  quantity: number;
  price: number;
}

export interface Prescription {
  id: string;
  doctorId: string;
  customerId: string;
  medicineIds: string[];
  dosage: string;
  instructions: string;
  issuedAt: Date;
  expiresAt: Date;
  status: 'pending' | 'approved' | 'used' | 'expired';
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (medicine: Medicine, quantity: number) => void;
  removeFromCart: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}
