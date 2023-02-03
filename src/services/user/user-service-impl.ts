import type { UserService } from './user-service';

import type { UserApi } from "@/api";
import { gUserApi } from "@/api";
import { useUserStore } from '@/stores/user';

import type { FormLoginParam } from "@/model/dto/ums";


export class UserServiceImpl implements UserService {
  userApi: UserApi = gUserApi;

  get userStore() {
    return useUserStore();
  }

  async formLogin(data: FormLoginParam): Promise<void> {
    const loginRsp = await this.userApi.formLogin(data);

    if (loginRsp.data) {
      this.userStore.$patch({
        token: loginRsp.data.token,
        expireAt: loginRsp.data.expireAt,
      });
    }

    return;
  }
}
