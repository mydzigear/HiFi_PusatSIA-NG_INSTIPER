import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatShortNumber(amount: number): string {
  if (amount >= 1000000000) {
    return (amount / 1000000000).toFixed(amount % 1000000000 === 0 ? 0 : 1) + ' Miliar';
  } else if (amount >= 1000000) {
    return (amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1) + ' Juta';
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1) + ' Ribu';
  }
  return amount.toLocaleString('id-ID');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyShort(amount: number): string {
  if (amount >= 1000000000) {
    return 'Rp ' + (amount / 1000000000).toFixed(amount % 1000000000 === 0 ? 0 : 1) + ' Miliar';
  } else if (amount >= 1000000) {
    return 'Rp ' + (amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1) + ' Juta';
  } else if (amount >= 1000) {
    return 'Rp ' + (amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1) + ' Ribu';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}