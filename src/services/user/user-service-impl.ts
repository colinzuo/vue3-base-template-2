import type { UserService } from './user-service';

import type { UserApi } from "@/api";
import { gUserApi } from "@/api";
import { useUserStore } from '@/stores/user';

import type { CommonResult } from "@/model/dto/common";
import type { FormLoginParam, LoginResponseData, UserInfoData } from "@/model/dto/ums";


export class UserServiceImpl implements UserService {
  userApi: UserApi = gUserApi;

  get userStore() {
    return useUserStore();
  }

  async formLogin(data: FormLoginParam): Promise<CommonResult<LoginResponseData>> {
    const rsp = await this.userApi.formLogin(data);

    if (rsp.data) {
      this.userStore.$patch({
        token: rsp.data.token,
        expireAt: rsp.data.expireAt,
        name: data.username,
      });
    }

    return rsp;
  }

  async getUserInfo(): Promise<CommonResult<UserInfoData>> {
    const rsp = await this.userApi.getUserInfo();

    if (rsp.data) {
      this.userStore.$patch({
        name: rsp.data.username,
        roles: rsp.data.roles,
        infoReadAt: new Date().toUTCString(),
      })
    }

    return rsp;
  }

  async logout(): Promise<void> {
    await this.userApi.logout();

    this.userStore.reset();
  }
}
