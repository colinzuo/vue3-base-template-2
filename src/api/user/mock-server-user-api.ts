import type { UserApi } from "./user-api";
import type { CommonResult, CommonPage } from "@/model/dto/common";
import type { UmsUserQueryParam, UmsUserDTO } from "@/model/dto/ums";

import { gMockServerUserService } from '@/mock-server/services/user';


export class MockServerUserApi implements UserApi {
  mockServerUserService = gMockServerUserService;

  addUser(data: any) {

  }

  delUser(userId: any) {

  }

  getUserBaseList(params: any) {

  }

  getUserList(params?: UmsUserQueryParam): CommonResult<CommonPage<UmsUserDTO>> {
    return gMockServerUserService.getUserList(params);
  }

  getUserRoleList(userId: any) {

  }

  updateUser({ userId, data }: any) {

  }

  updateUserPassword(data: any) {

  }

  updateUserRoleList({ userId, data }: any) {

  }

  formLogin(data: any) {

  }

  getUserInfo() {

  }

  logout() {

  }

  register(data: any) {

  }

  requestIdCode(data: any) {

  }

  getRoleList(data: any)
  {

  }
}
