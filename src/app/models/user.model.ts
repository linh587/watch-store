export interface UserAccount {
  id: string;
  phone?: string;
  name: string;
  gender: string;
  dateOfBirth: Date | string;
  avatar?: string;
  email: string;
  address?: string;
  longitude?: string;
  latitude?: string;
}
