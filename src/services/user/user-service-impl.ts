import type { UserService } from './user-service';

import type { UserApi } from "@/api";
import { gUserApi } from "@/api";


export class UserServiceImpl implements UserService {
  userApi: UserApi = gUserApi;

  postInit() {

  }
}
