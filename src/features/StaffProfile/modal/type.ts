export interface User {
    id: string;
    keyId: string;
    firstName: string;
    secondName: string;
    email: string;
    accessRooms: string[];
    photos?: string[];
    address?: string;
    phone?: string;
    country?: string;
    city?: string;
    role: string;
    password?: string;
  }
  
  interface Room {
    id: string;
    roomNumber: string;

  }
  