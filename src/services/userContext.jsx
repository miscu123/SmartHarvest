import { createContext, useEffect, useState } from "react";
import { login, register } from "./userService";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    id: 0,
    jwtToken: "",
    phone: "",
    role: ""
  });


  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (input, init = {}) => {
      init.headers = init.headers || {};
      if (user.jwtToken) {
        init.headers.Authorization = `Bearer ${user.jwtToken}`;
      }
      try {
        const response = await originalFetch(input, init);
        if (response.status === 401) {
          handleLogout();
        }
        return response;
      } catch (err) {
        throw err;
      }
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, [user.jwtToken]);

  function handleLogout() {
    setUser({
      email: "",
      fullName: "",
      id: 0,
      jwtToken: "",
      phone: "",
      role: ""
    });
    navigate("/");
  }

  async function handleLogin(loginRequest) {
    setLoading(true);
    setErrors([]);
    try {
      const data = await login(loginRequest);
      if (!data.success) {
        setErrors(["Invalid credentials, please try again"]);
        return false;
      } else {
        setErrors([]);
        setUser(data.body);
        return { success: true, role: data.body.userRole };
      }
    } catch {
      setErrors(["An error occurred during login"]);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(registerRequest) {
    setLoading(true);
    setErrors([]);
    try {
      const data = await register(registerRequest);
      if (data.status === 409) {
        setErrors(["User with this email already exists, please try a different one"]);
      } else {
        setErrors([]);
        return true;
      }
    } catch {
      setErrors(["An error occurred during registration"]);
    } finally {
      setLoading(false);
    }
    return false;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        errors,
        setErrors,
        handleLogin,
        handleLogout,
        handleRegister
      }}
    >
      {children}
    </UserContext.Provider>
  );
}