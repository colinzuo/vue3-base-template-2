import type { MockServerUserService } from "./user-service";
import type { UmsUserBO } from "@/mock-server/model/bo";
import { UserMapper } from "@/mock-server/mapper";
import { defaultPageQueryParam, CommonError } from '@/mock-server/common';

import type { CommonResult, CommonPage } from "@/model/dto/common";
import type { UmsUserQueryParam, UmsUserDTO, FormLoginParam, LoginResponseData, UserInfoData } from "@/model/dto/ums";


export class MockServerUserServiceImpl implements MockServerUserService {
  logPrefix = 'MockServerUserServiceImpl:';

  activeUserBO: UmsUserBO | null = null;

  userBOList: UmsUserBO[] = [
    {
      id: 1,
      username: 'sysadmin',
      password: '123456',
      email: 'sysadmin@example.com',
      note: '',
      createTime: '2023-02-02 02:00:00T',
      enabled: true,
      sysAdmin: true,
      admin: false,
      roles: ['sysAdmin', 'admin'],
    },
    {
      id: 2,
      username: 'admin',
      password: '123456',
      email: 'admin@example.com',
      note: '',
      createTime: '2023-02-02 02:00:00T',
      enabled: true,
      sysAdmin: false,
      admin: true,
      roles: ['admin'],
    },
    {
      id: 3,
      username: 'user',
      password: '123456',
      email: 'user@example.com',
      note: '',
      createTime: '2023-02-02 02:00:00T',
      enabled: true,
      sysAdmin: false,
      admin: false,
      roles: [],
    },
  ];

  getUserList(params: UmsUserQueryParam = {}): Promise<CommonResult<CommonPage<UmsUserDTO>>> {
    params.pageSize = params.pageSize || defaultPageQueryParam.pageSize;
    params.pageNum = params.pageNum || defaultPageQueryParam.pageNum;

    const userDTOList: UmsUserDTO[] = [];
    let matched = 0;
    const startNum = (params.pageNum - 1) * params.pageSize + 1;

    for (const userBO of this.userBOList) {
      if (params.admin && !userBO.admin) {
        continue;
      }

      if (params.sysAdmin && !userBO.sysAdmin) {
        continue;
      }

      matched += 1;

      if (matched < startNum || userDTOList.length >= params.pageSize) {
        continue;
      }

      const userDTO = UserMapper.umsUserBOToUmsUserDTO(userBO);
      userDTOList.push(userDTO);
    }

    const result: CommonResult<CommonPage<UmsUserDTO>> = {
      data: {
        total: matched,
        list: userDTOList,
      },
    };

    console.log(`${this.logPrefix} params ${JSON.stringify(params, null, 2)}, result ${JSON.stringify(result, null, 2)}`)

    return Promise.resolve(result);
  }

  formLogin(data: FormLoginParam): Promise<CommonResult<LoginResponseData>> {
    let targetUserBO;

    for (const userBO of this.userBOList) {
      if (userBO.username === data.username) {
        if (userBO.password === data.password) {
          targetUserBO = userBO;
        }

        break;
      }
    }

    this.activeUserBO = null;

    if (!targetUserBO) {
      return Promise.resolve({
        error: CommonError.RES_UNAUTHORIZED,
      })
    } else {
      this.activeUserBO = targetUserBO;
      const expireAt = new Date(Date.now() + 24*60*60*1000).toISOString();

      return Promise.resolve({
        data: {
          token: 'not-really-used',
          expireAt,
        }
      })
    }
  }

  getUserInfo(): Promise<CommonResult<UserInfoData>> {
    if (!this.activeUserBO) {
      return Promise.resolve({
        error: CommonError.RES_UNAUTHORIZED,
      })
    }

    const result = {
      data: {
        username: this.activeUserBO.username,
        roles: this.activeUserBO.roles,
      }
    };

    console.log(`${this.logPrefix} result ${JSON.stringify(result, null, 2)}`)

    return Promise.resolve(result);
  }

  logout(): Promise<CommonResult<never>> {
    this.activeUserBO = null;
    return Promise.resolve({});
  }
}
