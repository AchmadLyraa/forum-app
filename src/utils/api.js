const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    return response.json();
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    if (responseJson.status === 'success') {
      putAccessToken(responseJson.data.token);
    }
    return responseJson;
  }

  async function getAllUsers() {
    const response = await _fetchWithAuth(`${BASE_URL}/users`, {
      method: 'GET',
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { users } } = responseJson;

    return users;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`, {
      method: 'GET',
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    const { data: { user } } = responseJson;

    return user;
  }

  async function createThread({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    const { data: { thread } } = responseJson;

    return thread;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'GET',
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { threads } } = responseJson;

    return threads;
  }

  async function getThreadDetail(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`, {
      method: 'GET',
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { detailThread } } = responseJson;
    return detailThread;
  }

  async function createComment(threadId, { content }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { comment } } = responseJson;
    return comment;
  }

  async function voteThread(threadId, voteType) {
    const url = `${BASE_URL}/threads/${threadId}/${voteType}-vote`;
    const response = await _fetchWithAuth(url, {
      method: 'POST',
    });
    return response.json();
  }

  async function voteComment(threadId, commentId, voteType) {
    const url = `${BASE_URL}/threads/${threadId}/comments/${commentId}/${voteType}-vote`;
    const response = await _fetchWithAuth(url, {
      method: 'POST',
    });
    return response.json();
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`, {
      method: 'GET',
    });
    return response.json();
  }

  return {
    register,
    login,
    putAccessToken,
    getAllUsers,
    getOwnProfile,
    createThread,
    getAllThreads,
    getThreadDetail,
    createComment,
    voteThread,
    voteComment,
    getLeaderboards,
  };
})();

export default api;
