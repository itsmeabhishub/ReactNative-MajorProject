import {
  InventoryItem,
  Ticket,
  User,
  CurrentUser,
  ActivityItem,
} from '../types';

// ─── Inventory ────────────────────────────────────────────────────────────────
export const inventoryData: InventoryItem[] = [
  { id: '1',  name: 'MacBook Pro 14 inch',    category: 'Electronics', qty: 8,  minQty: 5,  price: 1999, location: 'Shelf A1',  sku: 'EL-001', lastUpdated: '2025-03-10' },
  { id: '2',  name: 'Mechanical Keyboard',    category: 'Peripherals', qty: 22, minQty: 10, price: 129,  location: 'Shelf B3',  sku: 'PR-002', lastUpdated: '2025-03-12' },
  { id: '3',  name: 'USB-C Hub 7-in-1',       category: 'Accessories', qty: 4,  minQty: 8,  price: 49,   location: 'Shelf C2',  sku: 'AC-003', lastUpdated: '2025-03-14' },
  { id: '4',  name: 'Logitech MX Master 3',   category: 'Peripherals', qty: 17, minQty: 10, price: 99,   location: 'Shelf B2',  sku: 'PR-004', lastUpdated: '2025-03-08' },
  { id: '5',  name: 'Dell 27 inch Monitor',   category: 'Electronics', qty: 5,  minQty: 3,  price: 349,  location: 'Shelf A3',  sku: 'EL-005', lastUpdated: '2025-03-11' },
  { id: '6',  name: 'Webcam HD 1080p',        category: 'Peripherals', qty: 11, minQty: 6,  price: 79,   location: 'Shelf B4',  sku: 'PR-006', lastUpdated: '2025-03-09' },
  { id: '7',  name: 'Office Chair Ergo',      category: 'Furniture',   qty: 3,  minQty: 2,  price: 450,  location: 'Warehouse', sku: 'FU-007', lastUpdated: '2025-03-05' },
  { id: '8',  name: 'HDMI Cable 2m',          category: 'Accessories', qty: 35, minQty: 15, price: 15,   location: 'Shelf C1',  sku: 'AC-008', lastUpdated: '2025-03-13' },
  { id: '9',  name: 'Wireless Headphones',    category: 'Electronics', qty: 6,  minQty: 4,  price: 249,  location: 'Shelf A2',  sku: 'EL-009', lastUpdated: '2025-03-07' },
  { id: '10', name: 'Standing Desk',          category: 'Furniture',   qty: 2,  minQty: 1,  price: 699,  location: 'Warehouse', sku: 'FU-010', lastUpdated: '2025-03-01' },
];

// ─── Tickets ──────────────────────────────────────────────────────────────────
export const ticketsData: Ticket[] = [
  { id: 'TK-001', title: 'Server overheating in Rack B',  category: 'Hardware',  priority: 'High',   status: 'Open',        assignee: 'Ravi Kumar',  created: '2025-03-14', description: 'Temperature sensors showing 82 degrees on Rack B server. Needs immediate inspection.' },
  { id: 'TK-002', title: 'Login page not loading on iOS', category: 'Software',  priority: 'High',   status: 'In Progress', assignee: 'Sneha Patil', created: '2025-03-13', description: 'Multiple users reporting blank screen after splash on iPhone 14 devices.' },
  { id: 'TK-003', title: 'Restock USB-C hubs',            category: 'Inventory', priority: 'Medium', status: 'Open',        assignee: 'Amit Singh',  created: '2025-03-12', description: 'Stock has dropped below minimum threshold. Need to order at least 20 units.' },
  { id: 'TK-004', title: 'Update VPN certificates',       category: 'Security',  priority: 'Medium', status: 'Open',        assignee: 'Priya Nair',  created: '2025-03-11', description: 'VPN certs expire in 15 days. Renewal process to be initiated.' },
  { id: 'TK-005', title: 'Broken office chair Floor 3',   category: 'Facility',  priority: 'Low',    status: 'Closed',      assignee: 'Rahul Das',   created: '2025-03-09', description: 'Chair wheel assembly replaced. Issue resolved.' },
  { id: 'TK-006', title: 'Quarterly inventory audit',     category: 'Inventory', priority: 'Low',    status: 'Closed',      assignee: 'Amit Singh',  created: '2025-03-05', description: 'Q1 audit completed. Report filed.' },
];

// ─── Users ────────────────────────────────────────────────────────────────────
export const usersData: User[] = [
  { id: 'U1', name: 'Ravi Kumar',  email: 'ravi.kumar@company.com',  role: 'Admin',   avatar: 'RK', status: 'Active' },
  { id: 'U2', name: 'Sneha Patil', email: 'sneha.patil@company.com', role: 'Manager', avatar: 'SP', status: 'Active' },
  { id: 'U3', name: 'Amit Singh',  email: 'amit.singh@company.com',  role: 'Staff',   avatar: 'AS', status: 'Active' },
  { id: 'U4', name: 'Priya Nair',  email: 'priya.nair@company.com',  role: 'Staff',   avatar: 'PN', status: 'Inactive' },
];

// ─── Activity ─────────────────────────────────────────────────────────────────
export const activityFeed: ActivityItem[] = [
  { id: 1, action: 'Item Added',    detail: 'HDMI Cable 2m x 10 units',          user: 'Amit Singh',  time: '2 hrs ago' },
  { id: 2, action: 'Ticket Opened', detail: 'TK-001 — Server overheating',       user: 'Ravi Kumar',  time: '5 hrs ago' },
  { id: 3, action: 'Item Updated',  detail: 'Logitech MX Master 3 qty to 17',    user: 'Sneha Patil', time: '1 day ago' },
  { id: 4, action: 'Ticket Closed', detail: 'TK-005 — Broken office chair',      user: 'Rahul Das',   time: '2 days ago' },
  { id: 5, action: 'Item Removed',  detail: 'Old Projector removed from stock',  user: 'Amit Singh',  time: '3 days ago' },
];

// ─── Current User ─────────────────────────────────────────────────────────────
export const currentUser: CurrentUser = {
  id: 'U1',
  name: 'Ravi Kumar',
  email: 'ravi.kumar@company.com',
  role: 'Admin',
  avatar: 'RK',
  status: 'Active',
  organization: 'TechCorp India Pvt. Ltd.',
};
