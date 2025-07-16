import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import {
  ChartPie as ChartPieIcon,
  ChatCircleDots as ChatIcon, // 💬 Communication ke liye
  GearSix as GearSixIcon,
  Package as PackageIcon, // 📦 Products ke liye
  ShoppingCart as ShoppingCartIcon, // 🛒 Orders ke liye
  Tag as TagIcon, // 🏷️ Pricing ke liye
  User as UserIcon,
  UsersThree as UsersIcon, // 👥 Customers ke liye
  XSquare,
} from '@phosphor-icons/react/dist/ssr';

export const navIcons: Record<string, Icon> = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'shopping-cart': ShoppingCartIcon,
  tag: TagIcon,
  'chat-circle-dots': ChatIcon,
  package: PackageIcon,
  'users-three': UsersIcon,
  'x-square': XSquare,
  user: UserIcon,
};
