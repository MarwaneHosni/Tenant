export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  isActive?: boolean;
  password?: string;
  roles?: string[]; 
}
