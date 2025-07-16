import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users-three' },
  { key: 'products', title: 'Products', href: paths.dashboard.products, icon: 'package' },
  { key: 'orders', title: 'Orders', href: paths.dashboard.orders, icon: 'shopping-cart' },
  { key: 'pricing', title: 'Pricing & Discounts', href: paths.dashboard.pricing, icon: 'tag' },
  {
    key: 'communication',
    title: 'Communication & Support',
    href: paths.dashboard.communication,
    icon: 'chat-circle-dots',
  },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
