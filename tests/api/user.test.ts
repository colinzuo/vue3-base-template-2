import { gUserApi } from '@/api/user';


describe('gUserApi', () => {
  describe('getUserList', () => {
    it('empty params', () => {
      const userList = gUserApi.getUserList();
      expect(userList).toBeDefined();
      expect(userList.data?.list.length).toBeGreaterThan(1);
    })
  })
})
