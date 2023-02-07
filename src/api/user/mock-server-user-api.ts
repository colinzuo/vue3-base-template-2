import type { UserApi } from "./user-api";
import type { CommonResult, CommonPage } from "@/model/dto/common";
import type { UmsUserQueryParam, UmsUserDTO, FormLoginParam, LoginResponseData, UserInfoData,
  RequestIdentificationCodeParam, UmsUserParam, UpdateUserPasswordParam } from "@/model/dto/ums";

import { gMockServerUserService } from '@/mock-server/services/user';


export class MockServerUserApi implements UserApi {
  mockServerUserService = gMockServerUserService;

  addUser(data: any) {

  }

  delUser(userId: any) {

  }

  getUserBaseList(params: any) {

  }

  getUserList(params?: UmsUserQueryParam): Promise<CommonResult<CommonPage<UmsUserDTO>>> {
    return gMockServerUserService.getUserList(params);
  }

  getUserRoleList(userId: any) {

  }

  updateUser({ userId, data }: any) {

  }

  updateUserPassword(data: UpdateUserPasswordParam): Promise<CommonResult<number>> {
    return gMockServerUserService.updateUserPassword(data);
  }

  updateUserRoleList({ userId, data }: any) {

  }

  formLogin(data: FormLoginParam): Promise<CommonResult<LoginResponseData>> {
    return gMockServerUserService.formLogin(data);
  }

  getUserInfo(): Promise<CommonResult<UserInfoData>> {
    return gMockServerUserService.getUserInfo();
  }

  logout(): Promise<CommonResult<never>> {
    return gMockServerUserService.logout();
  }

  register(data: UmsUserParam): Promise<CommonResult<UmsUserDTO>> {
    return gMockServerUserService.register(data);
  }

  requestIdCode(data: RequestIdentificationCodeParam): Promise<CommonResult<never>> {
    return gMockServerUserService.requestIdCode(data);
  }

  getRoleList(data: any)
  {

  }
}
