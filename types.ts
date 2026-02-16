
export enum UnitType {
  GROSS = 'Gross', 
  PCS = 'Pcs',
  THOUSAND = 'Thousand',
  KG = 'Kg'
}

export enum OrderStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  SHIPPED = 'Shipped'
}

export interface PlatingFinish {
  code: string;
  name: string;
  hex?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  basePrice: number;
  unitType: UnitType;
  moq: number;
  images: string[];
  platingFinishes: PlatingFinish[];
  isSampleOnly?: boolean;
}

export interface CartItem {
  productId: string;
  variantCode: string;
  quantity: number;
  unitType: UnitType;
  price: number;
  productName: string;
  variantName: string;
  image: string;
}

export interface OrderDetails {
  factoryName: string;
  licenseNo?: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  details: OrderDetails;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  contactPhone: string;
  contactEmail: string;
  footerAbout: string;
  address: string;
}
