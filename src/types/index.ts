// ─── Inventory ────────────────────────────────────────────────────────────────
export type Category =
  | 'Electronics'
  | 'Peripherals'
  | 'Accessories'
  | 'Furniture';

export type InventoryCategory = 'All' | Category;

export interface InventoryItem {
  id: string;
  name: string;
  category: Category;
  qty: number;
  minQty: number;
  price: number;
  location: string;
  sku: string;
  lastUpdated: string;
}

// ─── Tickets ──────────────────────────────────────────────────────────────────
export type TicketStatus   = 'Open' | 'In Progress' | 'Closed';
export type TicketPriority = 'High' | 'Medium' | 'Low';
export type TicketCategory = 'Hardware' | 'Software' | 'Inventory' | 'Security' | 'Facility';

export interface Ticket {
  id: string;
  title: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignee: string;
  created: string;
  description: string;
}

// ─── Users ────────────────────────────────────────────────────────────────────
export type UserRole   = 'Admin' | 'Manager' | 'Staff';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: UserStatus;
}

export interface CurrentUser extends User {
  organization: string;
}

// ─── Activity ─────────────────────────────────────────────────────────────────
export interface ActivityItem {
  id: number;
  action: string;
  detail: string;
  user: string;
  time: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export type RootStackParamList = {
  Login: undefined;
  App: undefined;
};

export type AppStackParamList = {
  MainTabs: undefined;
  AddItem: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  Inventory: undefined;
  Tickets: undefined;
  Settings: undefined;
};

// ─── Component Props ──────────────────────────────────────────────────────────
export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  accent?: string;
}

export type BadgeLabel =
  | TicketStatus
  | TicketPriority
  | UserRole
  | UserStatus
  | 'Low';

export interface BadgeProps {
  label: BadgeLabel;
}

// ─── Form ─────────────────────────────────────────────────────────────────────
export interface AddItemForm {
  name: string;
  sku: string;
  category: Category | '';
  qty: string;
  minQty: string;
  price: string;
  location: string;
}
