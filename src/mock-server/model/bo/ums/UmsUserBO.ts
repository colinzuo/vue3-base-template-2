import type { UmsUserDTO } from '@/model/dto/ums';


export interface UmsUserBO extends UmsUserDTO {
  password: string;
  roles: string[];
}
