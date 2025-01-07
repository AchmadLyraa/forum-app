import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { receiveThreadDetailActionCreator } from '../threadDetail/action';

export const Action = {
  ADD_COMMENT: 'ADD_COMMENT'
};

export const asyncAddComment = (threadId, commentData) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const newComment = await api.createComment(threadId, commentData);
    dispatch(addComment(newComment));
    const newDetailThread = await api.getThreadDetail(threadId);
    dispatch(receiveThreadDetailActionCreator(newDetailThread));
  } catch (error) {
    console.error('Error adding comment:', error);
  }
  dispatch(hideLoading());
};

export const addComment = (comment) => ({
  type: Action.ADD_COMMENT,
  payload: comment,
});