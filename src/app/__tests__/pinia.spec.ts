import {beforeEach, describe, expect, test, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useAuthStore} from '@/store/auth';
import {useAuthStoreActions} from '@/store/auth/actions';

vi.mock('@/includes/firebase', () => ({
  auth:{
    signInWithEmailAndPassword: () => Promise.resolve({}),
  },
}));
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: () => {},
  }),
  useRoute: () => ({}), // Add this line to include the missing export
}));

describe('Pinia', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('should be able to create a pinia instance', async () => {
    const store = useAuthStore();
    const {login} = useAuthStoreActions();
    expect(store).toBeDefined();
    await login({password: 'password', email: 'username'});
    expect(store.isAuthenticated).toBe(true);
  });
})
