import type { MockServerUserService } from "./user-service";
import type { UmsUserBO } from "@/mock-server/model/bo";
import { UserMapper } from "@/mock-server/mapper";
import { defaultPageQueryParam } from '@/mock-server/common';

import type { CommonResult, CommonPage } from "@/model/dto/common";
import type { UmsUserQueryParam, UmsUserDTO } from "@/model/dto/ums";


export class MockServerUserServiceImpl implements MockServerUserService {
  logPrefix = 'MockServerUserServiceImpl:';

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
    },
  ];

  getUserList(params: UmsUserQueryParam = {}): CommonResult<CommonPage<UmsUserDTO>> {
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

    return result;
  }
}
