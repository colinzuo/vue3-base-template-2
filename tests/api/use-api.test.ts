import { gUserApi } from '@/api/user';


describe('gUserApi', () => {
  describe('getUserList', () => {
    it('empty params', async () => {
      const userList = await gUserApi.getUserList();
      expect(userList).toBeDefined();
      expect(userList.data?.list.length).toBeGreaterThan(1);
    })
  })

  describe('formLogin', () => {
    it('sysadmin', async () => {
      const rsp = await gUserApi.formLogin({
        username: 'sysadmin',
        password: '123456',
      });
      expect(rsp).toBeDefined();
      expect(rsp.data?.token).toBeDefined();
    })

    it('admin', async () => {
      const rsp = await gUserApi.formLogin({
        username: 'admin',
        password: '123456',
      });
      expect(rsp).toBeDefined();
      expect(rsp.data?.token).toBeDefined();
    })

    it('user', async () => {
      const rsp = await gUserApi.formLogin({
        username: 'user',
        password: '123456',
      });
      expect(rsp).toBeDefined();
      expect(rsp.data?.token).toBeDefined();
    })

    it('userNotExist', async () => {
      const rsp = await gUserApi.formLogin({
        username: 'userNotExist',
        password: '123456',
      });
      expect(rsp).toBeDefined();
      expect(rsp.error?.code).toBeDefined();
    })
  })

  describe('getUserInfo', () => {
    it('before login', async () => {
      const userInfo = await gUserApi.getUserInfo();
      expect(userInfo.error).toBeDefined();
      expect(userInfo.error?.code).toBeDefined();
    })

    it('after login: admin', async () => {
      const loginRsp = await gUserApi.formLogin({
        username: 'admin',
        password: '123456',
      });
      expect(loginRsp).toBeDefined();
      expect(loginRsp.data?.token).toBeDefined();

      const userInfoRsp = await gUserApi.getUserInfo();
      expect(userInfoRsp.data).toBeDefined();
      expect(userInfoRsp.data?.roles?.length).toBeGreaterThanOrEqual(1);
    })
  })

  describe('logout', () => {
    it('after login: admin', async () => {
      const loginRsp = await gUserApi.formLogin({
        username: 'admin',
        password: '123456',
      });
      expect(loginRsp).toBeDefined();
      expect(loginRsp.data?.token).toBeDefined();

      const logoutRsp = await gUserApi.logout();
      expect(logoutRsp).toBeDefined();
    })
  })
})
