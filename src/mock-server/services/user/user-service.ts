import type { CommonResult, CommonPage } from "@/model/dto/common";
import type { UmsUserQueryParam, UmsUserDTO } from "@/model/dto/ums";


export interface MockServerUserService {
  getUserList(params?: UmsUserQueryParam): CommonResult<CommonPage<UmsUserDTO>>;
}
