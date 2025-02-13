/** REQUEST TYPES **/
export interface LoginRequest {
  email?: string;
  phone_number?: string;
  password: string;
}

/** STATE TYPES **/
export interface UserState {
  profile: UserProfileResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
}

/** RESPONSE TYPES **/
export interface AuthResponse {
  token: string;
  firstName: string;
  lastName: string;
}

export interface UserProfileResponse {
  user_id: number;
  email?: string;
  first_name?: string;  // Имя
  second_name?: string; // Фамилия
  phone_number?: string;
}


export interface RegistrationData {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}
