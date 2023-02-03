import type { CommonResult, CommonPage } from "@/model/dto/common";
import type { UmsUserQueryParam, UmsUserDTO } from "@/model/dto/ums";


export interface UserApi {
  addUser(data: any): any;
  delUser(userId: any): any;
  getUserBaseList(params: any): any;
  getUserList(params?: UmsUserQueryParam): CommonResult<CommonPage<UmsUserDTO>>;
  getUserRoleList(userId: any): any;
  updateUser({userId, data}: any): any;
  updateUserPassword(data: any): any;
  updateUserRoleList({userId, data}: any): any;
  formLogin(data: any): any;
  getUserInfo(): any;
  logout(): any;
  register(data: any): any;
  requestIdCode(data: any): any;
  getRoleList(data: any): any;
}
