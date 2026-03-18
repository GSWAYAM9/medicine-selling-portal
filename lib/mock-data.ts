import { Medicine, User, Order } from './types';

// Mock medicines data
export const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Aspirin 500mg',
    category: 'Pain Relief',
    price: 5.99,
    stock: 150,
    description: 'Effective pain reliever and fever reducer',
    manufacturer: 'PharmaCare',
    dosage: '500mg',
    requiresPrescription: false,
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    price: 12.99,
    stock: 80,
    description: 'Broad-spectrum antibiotic',
    manufacturer: 'MediPharm',
    dosage: '250mg',
    requiresPrescription: true,
  },
  {
    id: '3',
    name: 'Vitamin D3 1000IU',
    category: 'Vitamins',
    price: 8.49,
    stock: 200,
    description: 'Essential vitamin for bone health',
    manufacturer: 'HealthPlus',
    dosage: '1000IU',
    requiresPrescription: false,
  },
  {
    id: '4',
    name: 'Metformin 500mg',
    category: 'Diabetes Care',
    price: 9.99,
    stock: 120,
    description: 'Diabetes management medication',
    manufacturer: 'CarePlus',
    dosage: '500mg',
    requiresPrescription: true,
  },
  {
    id: '5',
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    price: 6.49,
    stock: 180,
    description: 'Anti-inflammatory pain reliever',
    manufacturer: 'PharmaCare',
    dosage: '400mg',
    requiresPrescription: false,
  },
  {
    id: '6',
    name: 'Cetirizine 10mg',
    category: 'Allergy Relief',
    price: 7.99,
    stock: 90,
    description: 'Non-drowsy allergy relief',
    manufacturer: 'AllergyWorks',
    dosage: '10mg',
    requiresPrescription: false,
  },
  {
    id: '7',
    name: 'Omeprazole 20mg',
    category: 'Digestive Health',
    price: 11.99,
    stock: 60,
    description: 'Acid reflux and heartburn relief',
    manufacturer: 'DigestCare',
    dosage: '20mg',
    requiresPrescription: true,
  },
  {
    id: '8',
    name: 'Lisinopril 5mg',
    category: 'Blood Pressure',
    price: 13.99,
    stock: 100,
    description: 'Blood pressure management',
    manufacturer: 'HeartCare',
    dosage: '5mg',
    requiresPrescription: true,
  },
];

// Mock users data
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Customer',
    email: 'customer@example.com',
    password: 'password123', // In real app, this would be hashed
    role: 'customer',
    phone: '+1234567890',
    address: '123 Main St, City, State 12345',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'doctor1',
    name: 'Dr. Sarah Smith',
    email: 'doctor@example.com',
    password: 'password123',
    role: 'doctor',
    phone: '+1987654321',
    licenseNumber: 'DOC123456',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'pharmacist1',
    name: 'Mike Pharmacist',
    email: 'pharmacist@example.com',
    password: 'password123',
    role: 'pharmacist',
    phone: '+1555666777',
    licenseNumber: 'PHARM789012',
    createdAt: new Date('2024-01-12'),
  },
];

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    items: [
      { medicineId: '1', quantity: 2, price: 5.99 },
      { medicineId: '3', quantity: 1, price: 8.49 },
    ],
    totalAmount: 20.47,
    status: 'delivered',
    requiresPrescription: false,
    shippingAddress: '123 Main St, City, State 12345',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: 'order2',
    userId: 'user1',
    items: [{ medicineId: '2', quantity: 1, price: 12.99 }],
    totalAmount: 12.99,
    status: 'processing',
    requiresPrescription: true,
    shippingAddress: '123 Main St, City, State 12345',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-12'),
  },
];

// Helper function to get categories
export const getMedicineCategories = (): string[] => {
  return Array.from(new Set(mockMedicines.map(m => m.category)));
};

// Helper function to search medicines
export const searchMedicines = (query: string): Medicine[] => {
  const lowerQuery = query.toLowerCase();
  return mockMedicines.filter(
    m =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.category.toLowerCase().includes(lowerQuery) ||
      m.manufacturer.toLowerCase().includes(lowerQuery)
  );
};

// Helper function to filter medicines by category
export const getMedicinesByCategory = (category: string): Medicine[] => {
  return mockMedicines.filter(m => m.category === category);
};
