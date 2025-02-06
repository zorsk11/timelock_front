/** REQUEST TYPES **/

import { OrganizationData } from "../Organization/types";

export interface LoginRequest {
  email?: string;
  phone_number?: string;
  password: string;
}

export interface RegisterRequest {
  email?: string;
  phone_number?: string;
  password: string;
  organization_type: string;
}

export interface CompleteProfileRequest {
  user_id?: number;
  email?: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

/** RESPONSE TYPES **/

export interface AuthResponse {
  token: string;
}

export interface MessageResponse {
  message: string;
}

export interface UserProfileResponse {
  user_id: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  organization_id?: number;
  organization_name?: string;
}

/** STATE TYPES **/

export interface UserState {
  profile: UserProfileResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
}

/** VIEWMODEL **/

export interface RegistrationData {
  email?: string;
  phone_number?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  organization?: OrganizationData;
}
