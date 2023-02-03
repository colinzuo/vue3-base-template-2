import type { UmsUserBO } from "../model/bo";
import type { UmsUserDTO } from "@/model/dto/ums";

export class UserMapper {
  static umsUserBOToUmsUserDTO(userBO: UmsUserBO): UmsUserDTO {
    const userDTO: UmsUserDTO = {
      id: userBO.id,
      username: userBO.username,
      email: userBO.email,
      note: userBO.note,
      createTime: userBO.createTime,
      loginTime: userBO.loginTime,
      enabled: userBO.enabled,
      sysAdmin: userBO.sysAdmin,
      admin: userBO.admin,
    };

    return userDTO;
  }
}
