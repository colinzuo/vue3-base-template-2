import type { CommonResult, CommonPage } from "@/model/dto/common";
import type { UmsUserQueryParam, UmsUserDTO, FormLoginParam, LoginResponseData, UserInfoData,
  RequestIdentificationCodeParam, UmsUserParam, UpdateUserPasswordParam, UmsUserUpdateParam } from "@/model/dto/ums";


export interface UserApi {
  addUser(data: UmsUserParam): Promise<CommonResult<UmsUserDTO>>;
  delUser(userId: number): Promise<CommonResult<number>>;
  getUserBaseList(params: any): any;

  getUserList(params?: UmsUserQueryParam): Promise<CommonResult<CommonPage<UmsUserDTO>>>;

  getUserRoleList(userId: any): any;
  updateUser({ userId, data }: {userId: number, data: UmsUserUpdateParam}): Promise<CommonResult<number>>;
  updateUserPassword(data: UpdateUserPasswordParam): Promise<CommonResult<number>>;
  updateUserRoleList({userId, data}: any): any;

  formLogin(data: FormLoginParam): Promise<CommonResult<LoginResponseData>>;
  getUserInfo(): Promise<CommonResult<UserInfoData>>;
  logout(): Promise<CommonResult<never>>;

  register(data: UmsUserParam): Promise<CommonResult<UmsUserDTO>>;
  requestIdCode(data: RequestIdentificationCodeParam): Promise<CommonResult<never>>;
  getRoleList(data: any): any;
}
