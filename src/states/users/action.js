import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      const response = await api.register({ name, email, password });

      if (response.status !== 'success') {
        throw new Error(response.message || 'Failed to register user');
      }

      alert('Registration successful!');
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncFetchUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.getAllUsers();

      if (response.status !== 'success') {
        throw new Error(response.message || 'Failed to fetch users');
      }

      const users = response.data;
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
  asyncFetchUsers,
};
