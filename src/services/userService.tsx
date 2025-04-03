export async function api(path: string, method: string = 'GET', body: any = null): Promise<Response> {
  const url = `http://www.localhost:8080/user/${path}`;
  const options: RequestInit = {
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

export async function request<T>(path: string, method: string = 'GET', body: any = null): Promise<{ success: boolean; status: number; body?: T; message?: string; }> {
  try {
      const response = await api(path, method, body);
      const data = await response.json().catch(() => null);

      if (response.status === 200 || response.status === 202) {
          return {
              success: true,
              status: response.status,
              body: data as T,
          };
      }

      const errorMessage = (data && data.message) || response.statusText || 'Request failed';
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
  } catch (error: any) {
      return {
          success: false,
          status: error.status || 500,
          message: error.message || 'Something went wrong',
      };
  }
}

export function login(loginRequest: { email: string; password: string }) {
  return request<{ token: string }>('login', 'POST', loginRequest);
}

export function register(registerRequest: { fullName: string; email: string; password: string }) {
  return request<{ id: number; fullName: string; email: string }>('register', 'POST', registerRequest);
}

export function getById(userId: number) {
  return request<{ id: number; username: string; email: string }>(`getUserById/${userId}`, 'GET');
}

export function updateUser(userId: number, updateRequest: { username?: string; email?: string; password?: string }) {
  return request<{ id: number; username: string; email: string }>(`update/${userId}`, 'PUT', updateRequest);
}
