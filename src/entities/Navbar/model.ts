export interface NavBarProps {
    title: string; // Название страницы
    buttonLabel: string; // Текст кнопки
    onButtonClick?: () => void; // Действие при клике на кнопку
  }