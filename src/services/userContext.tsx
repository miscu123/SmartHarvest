import React, { createContext, useState, useEffect, ReactNode } from "react";
import { login, register } from "./userService";

interface User {
  email: string;
  fullName: string;
  id: number;
  jwtToken: string;
  role: string;
}

// Define more explicit response types
interface TokenOnlyBody {
  token: string;
}

interface UserDataBody {
  email: string;
  fullName: string;
  id: number;
  token: string;
  role: string;
}

// Union type for the response body
type ResponseBody = TokenOnlyBody | UserDataBody;

// Define the login response type with more explicit typing
interface LoginResponse {
  success: boolean;
  body?: ResponseBody;
  status?: number;
}

interface UserContextType {
  user: User;
  loading: boolean;
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  handleLogin: (loginRequest: { email: string; password: string }) => Promise<{ success: boolean; role?: string } | false>;
  handleLogout: () => void;
  handleRegister: (registerRequest: { fullName: string; email: string; password: string }) => Promise<boolean>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [user, setUser] = useState<User>({
    email: "",
    fullName: "",
    id: 0,
    jwtToken: "",
    role: "",
  });


  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (input, init = {}) => {
      init.headers = init.headers || {};

      const headers = init.headers as Headers;
      if (user.jwtToken) {
        headers.set("Authorization", `Bearer ${user.jwtToken}`);
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

  const handleLogout = () => {
    setUser({
      email: "",
      fullName: "",
      id: 0,
      jwtToken: "",
      role: "",
    });
  };

  const handleLogin = async (loginRequest: { email: string; password: string }) => {
    setLoading(true);
    setErrors([]);
    try {
      const data = await login(loginRequest) as LoginResponse;
      
      if (!data.success) {
        setErrors(["Invalid credentials, please try again"]);
        return false;
      }
      
      setErrors([]);
      
      // Type assertion for data.body to help TypeScript understand we've checked it exists
      const body = data.body as ResponseBody;
      
      if (!body) {
        setErrors(["Unexpected error: Missing user data."]);
        return false;
      }
      
      if ("token" in body && !("email" in body)) {  
        // It's a token-only response
        setUser({
          email: "",
          fullName: "",
          id: 0,
          jwtToken: body.token,
          role: "",
        });
        return { success: true, role: "" };
      } 
      else if ("email" in body) {
        // It's a full user data response
        const userBody = body as UserDataBody;
        setUser({
          email: userBody.email || "",
          fullName: userBody.fullName || "",
          id: userBody.id || 0,
          jwtToken: userBody.token || "",
          role: userBody.role || "",
        });
        return { success: true, role: userBody.role };
      } 
      else {
        setErrors(["Unexpected error: Invalid response format."]);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors(["An error occurred during login"]);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (registerRequest: { fullName: string; email: string; password: string }) => {
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
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        errors,
        setErrors,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}