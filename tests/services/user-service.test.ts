
import { setActivePinia, createPinia } from 'pinia'

import { gUserService } from '@/services/user';
import { useUserStore } from '@/stores/user';


describe('gUserService', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('formLogin', () => {
    it('admin', async () => {
      await gUserService.formLogin({
        username: 'admin',
        password: '123456',
      });

      const userStore = useUserStore();

      expect(userStore.token).toBeTruthy();
    })
  })

  describe('getUserInfo', () => {
    it('before login', async () => {
      const userStore = useUserStore();

      expect(userStore.token).toBeFalsy();
      expect(userStore.roles.length).toBeFalsy();

      await gUserService.getUserInfo();

      expect(userStore.roles.length).toBeFalsy();
    })

    it('after login', async () => {
      await gUserService.formLogin({
        username: 'admin',
        password: '123456',
      });

      const userStore = useUserStore();

      expect(userStore.token).toBeTruthy();
      expect(userStore.roles.length).toBeFalsy();

      await gUserService.getUserInfo();

      expect(userStore.roles.length).toBeTruthy();
    })
  })

  describe.only('logout', () => {
    it('admin', async () => {
      const userStore = useUserStore();

      await gUserService.formLogin({
        username: 'admin',
        password: '123456',
      });

      expect(userStore.token).toBeTruthy();

      await gUserService.logout();

      expect(userStore.token).toBeFalsy();
    })
  })
})
