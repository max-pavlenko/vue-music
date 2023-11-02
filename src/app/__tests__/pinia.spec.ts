import {beforeEach, describe, expect, test, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useAuthStore} from '@/store/auth';

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
    expect(store).toBeDefined();
    await store.login({password: 'password', username: 'username'});
    expect(store.isAuthenticated).toBe(true);
  });
})
