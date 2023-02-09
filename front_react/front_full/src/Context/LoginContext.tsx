import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeApi } from "../services";

export interface AuthContextData {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setUserLogin: React.Dispatch<React.SetStateAction<IUserResponse>>;
  userLogin: IUserResponse;
  userId: string | null;
  signIn: (props: ILoginProps) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export interface IAuthContext {
  children: ReactNode;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date
}

export interface ILoginProps {
  email: string;
  password: string;
}

const AuthProvider = ({ children }: IAuthContext) => {
  const [userLogin, setUserLogin] = useState<IUserResponse>(
    {} as IUserResponse
  );
  const [user, setUser] = useState<IUser>({} as IUser);
  const navigate = useNavigate();
  const tokenUser = localStorage.getItem("@login:token");
  const userId = localStorage.getItem("@login:user");

  const signIn = (data: ILoginProps) => {
    fakeApi
      .post("/login", data)
      .then((response) => {
        const { user, accessToken } = response.data;
        fakeApi.defaults.headers.common.Authorization = `Bearer ${tokenUser}`;
        localStorage.setItem("@login:token", accessToken);
        localStorage.setItem("@login:user", user.id);
        setUserLogin(user);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.error("Login e/ou senha inválidos", error);
      });
  };

  useEffect(() => {
    async function loadUser() {
      if (tokenUser) {
        try {
          fakeApi.defaults.headers.common.Authorization = `Bearer ${tokenUser}`;
          const { data } = await fakeApi.get(`/users/${userId}`);
          setUser(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadUser();
  }, [tokenUser, userId]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        setUserLogin,
        signIn,
        user,
        setUser,
        logout,
        userId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;