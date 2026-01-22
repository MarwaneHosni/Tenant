export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: 'TENANT' | 'TECHNICIAN' | 'MANAGER' | 'OWNER';
  roles: string[];
}
