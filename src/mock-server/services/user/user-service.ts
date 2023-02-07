import type { CommonResult, CommonPage } from "@/model/dto/common";
import type { UmsUserQueryParam, UmsUserDTO, FormLoginParam, LoginResponseData, UserInfoData,
  RequestIdentificationCodeParam, UmsUserParam } from "@/model/dto/ums";
import type { UmsUserBO } from "@/mock-server/model/bo";


export interface MockServerUserService {
  activeUserBO: UmsUserBO | null;

  reset(): void;

  getUserList(params?: UmsUserQueryParam): Promise<CommonResult<CommonPage<UmsUserDTO>>>;
  formLogin(data: FormLoginParam): Promise<CommonResult<LoginResponseData>>;
  getUserInfo(): Promise<CommonResult<UserInfoData>>;
  logout(): Promise<CommonResult<never>>;

  requestIdCode(data: RequestIdentificationCodeParam): Promise<CommonResult<never>>;
  register(data: UmsUserParam): Promise<CommonResult<UmsUserDTO>>;
}
