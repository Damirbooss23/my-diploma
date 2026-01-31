export const BASE_URL = "http://localhost:3002";


const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};


export const apiGet = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};


export const apiPost = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

export const apiPut = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};


export const apiDelete = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};


export const registerUser = async (userData) => {
  return await apiPost('/register', userData);
};


export const loginUser = async (credentials) => {
  return await apiPost('/login', credentials);
};


export const getCurrentUser = async () => {
  return await apiGet('/profile');
};


export const getUsers = async () => {
  return await apiGet('/users');
};


export const getFavorites = async () => {
  return await apiGet('/favorites');
};


export const addToFavorites = async (favoriteData) => {
  return await apiPost('/favorites', favoriteData);
};

export const removeFromFavorites = async (favoriteId) => {
  return await fetch(`${BASE_URL}/favorites/${favoriteId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
};


export const updateUserProfile = async (userData) => {
  return await fetch(`${BASE_URL}/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData)
  });
};

// Universities API
export const getUniversities = async () => apiGet('/universities');
export const getUniversity = async (id) => apiGet(`/universities/${id}`);
export const createUniversity = async (data) => apiPost('/universities', data);
export const updateUniversity = async (id, data) => apiPut(`/universities/${id}`, data);
export const deleteUniversity = async (id) => apiDelete(`/universities/${id}`);