import {
  MdInventory,
  MdStorefront,
  MdReorder,
  MdDiscount,
  MdAnalytics,
  MdPeople,
  MdSettings,
} from "react-icons/md";

export interface MenuItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

export const menuItems: MenuItem[] = [
  { to: "/Schedules", icon: MdReorder, label: "Расписание" },
  { to: "/Users", icon: MdPeople, label: "Преподаватели" },
  { to: "/Rooms", icon: MdInventory, label: "Кабинеты" },
  { to: "/logs", icon: MdAnalytics, label: "Логи" },
  { to: "/settings", icon: MdSettings, label: "Настройки" },
];
