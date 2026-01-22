export class InviteUserDto {
  email?: string;
  role: 'TENANT' | 'TECHNICIAN' | 'MANAGER';
}
