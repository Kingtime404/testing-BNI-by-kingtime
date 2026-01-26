export interface Account {
  id: string;
  type: 'savings' | 'credit' | 'investment' | 'insurance';
  name: string;
  accountNumber: string;
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  category: string;
}

export interface Bill {
  id: string;
  name: string;
  provider: string;
  accountNumber: string;
  amount: number;
  dueDate: string;
  autoDebit: boolean;
  category: 'electricity' | 'water' | 'phone' | 'internet';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'transaction' | 'promo' | 'info';
}

export const userData = {
  name: 'Wahyu Hidayat',
  totalBalance: 9822211927,
};

export const accounts: Account[] = [
  {
    id: '1',
    type: 'savings',
    name: 'Taplus Muda',
    accountNumber: '0812345678',
    balance: 5422211927,
    currency: 'IDR',
  },
  {
    id: '2',
    type: 'savings',
    name: 'Tabungan Bisnis',
    accountNumber: '0887654321',
    balance: 4400000000,
    currency: 'IDR',
  },
  {
    id: '3',
    type: 'credit',
    name: 'Kartu Kredit Platinum',
    accountNumber: '4111 **** **** 1234',
    balance: -12500000,
    currency: 'IDR',
  },
  {
    id: '4',
    type: 'investment',
    name: 'Reksadana Campuran',
    accountNumber: 'RD-001234',
    balance: 250000000,
    currency: 'IDR',
  },
  {
    id: '5',
    type: 'insurance',
    name: 'Asuransi Jiwa',
    accountNumber: 'INS-005678',
    balance: 500000000,
    currency: 'IDR',
  },
];

export const transactions: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    amount: 520000000,
    description: 'Transfer ke PT Rajawali Indo Wisesa',
    date: '2026-01-26',
    category: 'transfer',
  },
  {
    id: '2',
    type: 'debit',
    amount: 15000000,
    description: 'Transfer ke PT Maju Jaya',
    date: '2026-01-25',
    category: 'transfer',
  },
  {
    id: '3',
    type: 'credit',
    amount: 85000000,
    description: 'Pembayaran Invoice #2024',
    date: '2026-01-24',
    category: 'income',
  },
  {
    id: '4',
    type: 'debit',
    amount: 2500000,
    description: 'Tokopedia',
    date: '2026-01-23',
    category: 'shopping',
  },
  {
    id: '5',
    type: 'debit',
    amount: 3500000,
    description: 'PLN Postpaid',
    date: '2026-01-22',
    category: 'bills',
  },
  {
    id: '6',
    type: 'credit',
    amount: 150000000,
    description: 'Transfer dari PT ABC',
    date: '2026-01-21',
    category: 'transfer',
  },
  {
    id: '7',
    type: 'debit',
    amount: 750000,
    description: 'GrabFood',
    date: '2026-01-20',
    category: 'food',
  },
  {
    id: '8',
    type: 'debit',
    amount: 500000,
    description: 'Telkomsel Postpaid',
    date: '2026-01-19',
    category: 'topup',
  },
];

export const bills: Bill[] = [
  {
    id: '1',
    name: 'PLN Pascabayar',
    provider: 'PLN',
    accountNumber: '12345678901',
    amount: 3500000,
    dueDate: '2026-01-28',
    autoDebit: true,
    category: 'electricity',
  },
  {
    id: '2',
    name: 'PDAM',
    provider: 'PDAM Jakarta',
    accountNumber: '9876543210',
    amount: 450000,
    dueDate: '2026-01-30',
    autoDebit: false,
    category: 'water',
  },
  {
    id: '3',
    name: 'Telkomsel Halo',
    provider: 'Telkomsel',
    accountNumber: '08123456789',
    amount: 850000,
    dueDate: '2026-01-27',
    autoDebit: true,
    category: 'phone',
  },
  {
    id: '4',
    name: 'IndiHome',
    provider: 'Telkom',
    accountNumber: '121234567890',
    amount: 750000,
    dueDate: '2026-01-29',
    autoDebit: false,
    category: 'internet',
  },
];

export const notifications: Notification[] = [
  {
    id: '0',
    title: 'Transfer Berhasil',
    message: 'Transfer Rp 520.000.000 ke PT Rajawali Indo Wisesa berhasil',
    date: '2026-01-26',
    read: false,
    type: 'transaction',
  },
  {
    id: '1',
    title: 'Transfer Berhasil',
    message: 'Transfer Rp 15.000.000 ke PT Maju Jaya berhasil',
    date: '2026-01-25',
    read: false,
    type: 'transaction',
  },
  {
    id: '2',
    title: 'Promo Cashback',
    message: 'Dapatkan cashback 10% untuk transaksi di Tokopedia',
    date: '2026-01-24',
    read: false,
    type: 'promo',
  },
  {
    id: '3',
    title: 'Tagihan Jatuh Tempo',
    message: 'Tagihan PLN Anda akan jatuh tempo dalam 3 hari',
    date: '2026-01-23',
    read: true,
    type: 'info',
  },
];

export const quickContacts = [
  { id: '1', name: 'PT Maju Jaya', bank: 'BNI', accountNumber: '1234567890' },
  { id: '2', name: 'PT Sukses Mandiri', bank: 'BCA', accountNumber: '0987654321' },
  { id: '3', name: 'CV Berkah', bank: 'Mandiri', accountNumber: '5678901234' },
  { id: '4', name: 'Koperasi Sejahtera', bank: 'BRI', accountNumber: '4321098765' },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const balanceHistory = [
  { month: 'Aug', amount: 8500000000 },
  { month: 'Sep', amount: 8800000000 },
  { month: 'Oct', amount: 9200000000 },
  { month: 'Nov', amount: 9500000000 },
  { month: 'Dec', amount: 9700000000 },
  { month: 'Jan', amount: 9822211927 },
];
