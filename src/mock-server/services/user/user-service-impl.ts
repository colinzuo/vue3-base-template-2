import type { MockServerUserService } from "./user-service";
import type { UmsUserBO } from "@/mock-server/model/bo";
import { UserMapper } from "@/mock-server/mapper";
import { defaultPageQueryParam, CommonError } from '@/mock-server/common';

import type { CommonResult, CommonPage } from "@/model/dto/common";
import type { UmsUserQueryParam, UmsUserDTO, FormLoginParam, LoginResponseData, UserInfoData,
  RequestIdentificationCodeParam, UmsUserParam, UpdateUserPasswordParam, UmsUserUpdateParam } from "@/model/dto/ums";

import { useUserStore } from "@/stores/user";
import { RandomUtils } from "@/utils";


const defaultUserBOList: UmsUserBO[] = [
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
    username: 'user1',
    password: '123456',
    email: 'user1@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
  {
    id: 4,
    username: 'user2',
    password: '123456',
    email: 'user2@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
  {
    id: 5,
    username: 'user3',
    password: '123456',
    email: 'user3@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
  {
    id: 6,
    username: 'user4',
    password: '123456',
    email: 'user4@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
  {
    id: 7,
    username: 'user5',
    password: '123456',
    email: 'user5@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
  {
    id: 8,
    username: 'user6',
    password: '123456',
    email: 'user6@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
  {
    id: 9,
    username: 'user7',
    password: '123456',
    email: 'user7@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
  {
    id: 10,
    username: 'user8',
    password: '123456',
    email: 'user8@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
  {
    id: 11,
    username: 'user9',
    password: '123456',
    email: 'user9@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
  {
    id: 12,
    username: 'user10',
    password: '123456',
    email: 'user10@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
  {
    id: 13,
    username: 'user11',
    password: '123456',
    email: 'user11@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
  {
    id: 14,
    username: 'user12',
    password: '123456',
    email: 'user12@example.com',
    note: '',
    createTime: '2023-02-02 02:00:00T',
    enabled: true,
    sysAdmin: false,
    admin: false,
    roles: [],
  },
];

export class MockServerUserServiceImpl implements MockServerUserService {
  logPrefix = 'MockServerUserServiceImpl:';

  activeUserBO: UmsUserBO | null = null;

  userBOList: UmsUserBO[] = [...defaultUserBOList];
  idCodeMap = new Map<string, string>;
  nextId = this.userBOList.length + 1;

  reset(): void {
    this.activeUserBO = null;
    this.userBOList = [...defaultUserBOList];
    this.idCodeMap = new Map<string, string>;
  }

  loadUserByName(username: string): void {
    this.activeUserBO = this.getUserBy(username, '');
  }

  getUserList(params: UmsUserQueryParam = {}): Promise<CommonResult<CommonPage<UmsUserDTO>>> {
    params.pageSize = params.pageSize || defaultPageQueryParam.pageSize;
    params.pageNum = params.pageNum || defaultPageQueryParam.pageNum;

    const userDTOList: UmsUserDTO[] = [];
    let matched = 0;
    const startNum = (params.pageNum - 1) * params.pageSize + 1;

    const userStore = useUserStore();

    for (const userBO of this.userBOList) {
      if (userBO.sysAdmin && !userStore.isSysAdmin) {
        continue;
      }

      if (params.admin != null && params.admin !== userBO.admin) {
        continue;
      }

      if (params.sysAdmin != null && params.sysAdmin !== userBO.sysAdmin) {
        continue;
      }

      if (params.keyword && !(userBO.username.includes(params.keyword) || userBO.email.includes(params.keyword))) {
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

  updateUserPassword(data: UpdateUserPasswordParam): Promise<CommonResult<number>> {
    if (this.activeUserBO?.username !== data.username) {
      console.log(`username ${data.username} not match ${this.activeUserBO?.username}`);

      return Promise.resolve({
        error: CommonError.RES_ILLEGAL_ARGUMENT,
      });
    }

    if (this.activeUserBO.password !== data.oldPassword) {
      console.log(`oldPassword ${data.oldPassword} not match ${this.activeUserBO.password}`);

      return Promise.resolve({
        error: CommonError.RES_ILLEGAL_ARGUMENT,
      });
    }

    this.activeUserBO.password = data.newPassword;

    return Promise.resolve({
      data: 1,
    });
  }

  logout(): Promise<CommonResult<never>> {
    this.activeUserBO = null;

    return Promise.resolve({});
  }

  requestIdCode(data: RequestIdentificationCodeParam): Promise<CommonResult<never>> {
    const idCode = RandomUtils.numberSeq(8);
    this.idCodeMap.set(data.email, idCode);

    console.log(`email ${data.email}, idCode ${idCode}`);

    return Promise.resolve({});
  }

  register(data: UmsUserParam): Promise<CommonResult<UmsUserDTO>> {
    let existUser = this.getUserBy(data.username, '');

    if (existUser) {
      return Promise.resolve({
        error: CommonError.RES_NAME_ALREADY_EXIST,
      });
    }

    existUser = this.getUserBy('', data.email);

    if (existUser) {
      return Promise.resolve({
        error: CommonError.RES_EMAIL_IN_USE,
      });
    }

    const localCode = this.idCodeMap.get(data.email);

    if (data.idCode !== localCode) {
      return Promise.resolve({
        error: CommonError.RES_ILLEGAL_ARGUMENT,
      });
    }

    const newUserBO: UmsUserBO = {
      id: this.nextId++,
      email: data.email,
      username: data.username,
      note: '',
      createTime: new Date().toISOString(),
      enabled: true,
      sysAdmin: false,
      admin: false,
      password: data.password,
      roles: ['user'],
    };

    this.userBOList.push(newUserBO);

    const userDTO = UserMapper.umsUserBOToUmsUserDTO(newUserBO);

    return Promise.resolve({
      data: userDTO,
    });
  }

  addUser(data: UmsUserParam): Promise<CommonResult<UmsUserDTO>> {
    let existUser = this.getUserBy(data.username, '');

    if (existUser) {
      return Promise.resolve({
        error: CommonError.RES_NAME_ALREADY_EXIST,
      });
    }

    existUser = this.getUserBy('', data.email);

    if (existUser) {
      return Promise.resolve({
        error: CommonError.RES_EMAIL_IN_USE,
      });
    }

    const newUserBO: UmsUserBO = {
      id: this.nextId++,
      email: data.email,
      username: data.username,
      note: '',
      createTime: new Date().toISOString(),
      enabled: true,
      sysAdmin: false,
      admin: false,
      password: data.password,
      roles: ['user'],
    };

    if (this.activeUserBO?.sysAdmin) {
      newUserBO.sysAdmin = data.sysAdmin || false;
      newUserBO.admin = data.admin || false;
    }

    this.userBOList.push(newUserBO);

    const userDTO = UserMapper.umsUserBOToUmsUserDTO(newUserBO);

    return Promise.resolve({
      data: userDTO,
    });
  }

  updateUser({ userId, data }: {userId: number, data: UmsUserUpdateParam}): Promise<CommonResult<number>> {
    const existUserBO = this.getUserById(userId);

    if (!existUserBO) {
      return Promise.resolve({
        error: CommonError.RES_ILLEGAL_ARGUMENT,
      });
    }

    data.email && (existUserBO.email = data.email);
    data.username && (existUserBO.username = data.username);
    data.password && (existUserBO.password = data.password);
    data.note && (existUserBO.note = data.note);
    data.enabled != null && (existUserBO.enabled = data.enabled);

    if (this.activeUserBO?.sysAdmin) {
      data.sysadmin != null && (existUserBO.sysAdmin = data.sysadmin);
      data.admin != null && (existUserBO.admin = data.admin);
    }

    return Promise.resolve({
      data: 1,
    });
  }

  delUser(userId: number): Promise<CommonResult<number>> {
    const index = this.userBOList.findIndex((value) => value.id === userId);

    if (index >= 0) {
      this.userBOList.splice(index, 1);
      return Promise.resolve({
        data: 1,
      });
    }

    return Promise.resolve({
      data: 0,
    });
  }

  getUserBy(username: string, email: string): UmsUserBO | null {
    let found: UmsUserBO | null = null;

    for (const userBO of this.userBOList) {
      if (username && userBO.username === username) {
        found = userBO;
        break;
      }

      if (email && userBO.email === email) {
        found = userBO;
        break;
      }
    }

    return found;
  }

  getUserById(userId: number): UmsUserBO | null {
    let found: UmsUserBO | null = null;

    for (const userBO of this.userBOList) {
      if (userBO.id === userId) {
        found = userBO;
        break;
      }
    }

    return found;
  }
}
