/** ADDRESS TYPES **/

export interface AddressRequest {
  type: string;
  country: string;
  state?: string;
  city: string;
  address_line: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressUpdateRequest {
  country?: string;
  state?: string;
  city?: string;
  address_line?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressResponse {
  id: number;
  type: string;
  country: string;
  state?: string;
  city: string;
  address_line: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
}

export interface AddressSuggestion {
  id: string;
  text: string;
  latitude: number;
  longitude: number;
}
