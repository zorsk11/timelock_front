import { SerializedError } from "@reduxjs/toolkit";

interface ApiErrorResponse {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

export function handleApiError(error: unknown): string {
  if (!error) {
    return "Неизвестная ошибка";
  }

  if ((error as SerializedError).message) {
    return (error as SerializedError).message!;
  }

  if ((error as any).status) {
    const apiError = error as ApiErrorResponse;

    if (apiError.data) {
      if (apiError.data.errors) {
        const validationErrors = Object.values(apiError.data.errors).flat();
        return validationErrors.join(", ");
      }

      return apiError.data.message || "Ошибка сервера";
    }

    switch (apiError.status) {
      case 400:
        return "Неверный запрос";
      case 401:
        return "Неавторизованный доступ";
      case 403:
        return "Доступ запрещен";
      case 404:
        return "Не найдено";
      case 500:
        return "Внутренняя ошибка сервера";
      default:
        return "Произошла ошибка";
    }
  }

  // Unknown Error
  return "Произошла неизвестная ошибка";
}
