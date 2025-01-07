/**
 * - asyncPopulateUsersAndThreads thunk function test
 *   - should dispatch actions correctly when data fetching succeeds
 *   - should dispatch actions and call alert when data fetching fails
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const fakeUsersResponse = [
  { id: 'user-1', name: 'John Doe', email: 'john@example.com' },
  { id: 'user-2', name: 'Jane Doe', email: 'jane@example.com' },
];

const fakeThreadsResponse = [
  { id: 'thread-1', title: 'First Thread', body: 'This is the first thread' },
  { id: 'thread-2', title: 'Second Thread', body: 'This is the second thread' },
];

const fakeErrorResponse = new Error('Failed to fetch data');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    // Backup original implementation
    api.getAllUsers = vi.fn();
    api.getAllThreads = vi.fn();
    global.alert = vi.fn();
  });

  afterEach(() => {
    // Restore mocks
    vi.restoreAllMocks();
  });

  it('should dispatch actions correctly when data fetching succeeds', async () => {
    // Arrange
    api.getAllUsers.mockResolvedValue(fakeUsersResponse);
    api.getAllThreads.mockResolvedValue(fakeThreadsResponse);
    const dispatch = vi.fn();

    // Action
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and call alert when data fetching fails', async () => {
    // Arrange
    api.getAllUsers.mockRejectedValue(fakeErrorResponse);
    api.getAllThreads.mockRejectedValue(fakeErrorResponse);
    const dispatch = vi.fn();

    // Action
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
