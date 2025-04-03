export async function api(path, method = 'GET', body = null) {
  const url = `http://www.localhost:8080/user/${path}`;
  const options = {
      method,
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest',
      },
  };
  
  if (body) {
      options.body = JSON.stringify(body);
  }
  
  return fetch(url, options);
}

export async function request(path, method = 'GET', body = null) {
  try {
      const response = await api(path, method, body);
      const data = await response.json().catch(() => null);
      
      if (response.status === 200 || response.status === 202) {
          return {
              success: true,
              status: response.status,
              body: data,
          };
      }
      
      const errorMessage = (data && data.message) || response.statusText || 'Request failed';
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
  } catch (error) {
      return {
          success: false,
          status: error.status || 500,
          message: error.message || 'Something went wrong',
      };
  }
}

export function login(loginRequest) {
  return request('login', 'POST', loginRequest);
}

export function register(registerRequest) {
  return request('register', 'POST', registerRequest);
}

export function getById(userId) {
  return request(`getUserById/${userId}`, 'GET');
}

export function updateUser(userId, updateRequest) {
  return request(`update/${userId}`, 'PUT', updateRequest);
}