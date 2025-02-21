export interface UserProfile {
    id: number;
    fullName: string;
    email: string;
    phoneNumber?: string;
    avatarUrl?: string;
    address?: {
      country: string;
      city: string;
      street: string;
    };
  }
  