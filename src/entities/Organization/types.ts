import {
  ImageURLRequest,
  OrganizationImagesUpdate,
} from "@/shared/types/commonTypes";
import {
  AddressRequest,
  AddressResponse,
  AddressUpdateRequest,
} from "../Address/types";

/** REQUEST TYPES **/

export interface CreateOrganizationRequest {
  name: string;
  image_url?: string;
  legal_name: string;
  type: string;
  bin: string;
  legal_entity_type: string;
  phone_number: string;
  email?: string;
  address?: AddressRequest;
  legal_address?: AddressRequest;
  images?: ImageURLRequest[];
}

export interface UpdateOrganizationRequest {
  name?: string;
  image_url?: string;
  type?: string;
  legal_name?: string;
  legal_entity_type?: string;
  phone_number?: string;
  email?: string;
  address?: AddressUpdateRequest;
  legal_address?: AddressUpdateRequest;
  images?: OrganizationImagesUpdate;
}

/** RESPONSE TYPES **/

export interface OrganizationResponse {
  id: number;
  name: string;
  image_url?: string;
  type: string;
  legal_name: string;
  legal_entity_type: string;
  phone_number: string;
  email?: string;
  address?: AddressResponse;
  legal_address?: AddressResponse;
  created_at: string;
  updated_at: string;
}

/** STATE TYPES **/

export interface OrganizationState {
  organization: OrganizationResponse | null;
  loading: boolean;
  error: string | null;
}

/** VIEWMODELS **/

export interface OrganizationData {
  name: string;
  legal_name: string;
  phone_number: string;
  email: string;
  companyType: string;
  country: string;
  state: string;
  city: string;
  address_line: string;
  postal_code: string;
}
