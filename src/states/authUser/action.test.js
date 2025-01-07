/**
 * - asyncSetAuthUser and asyncUnsetAuthUser thunk functions test
 *   - asyncSetAuthUser
 *     - should dispatch actions correctly when login is successful
 *     - should alert an error message when login fails
 *   - asyncUnsetAuthUser
 *     - should dispatch actions correctly
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';
import api from '../../utils/api';

// Mock API and action creators
vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: vi.fn(() => ({ type: 'HIDE_LOADING' })),
}));

vi.mock('../../utils/api');

describe('asyncSetAuthUser thunk function', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch actions correctly when login is successful', async () => {
    const dispatch = vi.fn();
    const fakeLoginResponse = { status: 'success', data: { token: 'fake-token' } };
    const fakeUserProfile = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };

    api.login.mockResolvedValue(fakeLoginResponse);
    api.getOwnProfile.mockResolvedValue(fakeUserProfile);
    api.putAccessToken = vi.fn();

    await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({ email: 'john@example.com', password: 'password' });
    expect(api.putAccessToken).toHaveBeenCalledWith('fake-token');
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserProfile));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should alert an error message when login fails', async () => {
    const dispatch = vi.fn();
    const fakeErrorMessage = 'Failed to authenticate user';
    api.login.mockRejectedValue(new Error(fakeErrorMessage));
    global.alert = vi.fn();

    await asyncSetAuthUser({ email: 'john@example.com', password: 'wrong-password' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({ email: 'john@example.com', password: 'wrong-password' });
    expect(global.alert).toHaveBeenCalledWith(fakeErrorMessage);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncUnsetAuthUser thunk function', () => {
  it('should dispatch actions correctly', () => {
    const dispatch = vi.fn();
    api.putAccessToken = vi.fn();

    asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
  });
});
