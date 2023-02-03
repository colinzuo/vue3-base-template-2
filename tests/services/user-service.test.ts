
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

      expect(userStore.token).toBeDefined();
      expect(userStore.token.length).toBeGreaterThan(1);
    })
  })
})
