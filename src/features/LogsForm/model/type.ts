export interface Log {
    id: string;
    event_type: string;
    message: string;
    user_id?: string; // опциональное поле, если отсутствует
    timestamp: string; // ISO-строка даты
  }
  