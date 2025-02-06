import {
  WarehouseIcon,
  ProductsIcon,
  OrdersIcon,
  DiscountsIcon,
  AnalyticsIcon,
  DistributorsIcon,
  SettingsIcon,
} from "@/shared/assets";

export const useNavigation = () => {
  const navItems = [
    {
      label: "Склады",
      to: "/warehouse",
      icon: WarehouseIcon,
    },
    {
      label: "Товары",
      to: "/products",
      icon: ProductsIcon,
    },
    {
      label: "Заказы",
      to: "/orders",
      icon: OrdersIcon,
    },
    {
      label: "Скидки",
      to: "/discounts",
      icon: DiscountsIcon,
    },
    {
      label: "Аналитика",
      to: "/analytics",
      icon: AnalyticsIcon,
    },
    {
      label: "Дистрибьютеры",
      to: "/distributors",
      icon: DistributorsIcon,
    },
    {
      label: "Настройки",
      to: "/settings",
      icon: SettingsIcon,
    },
  ];
  return navItems;
};
