import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeApi } from "../services";
import { toast } from "react-toastify";

export interface AuthContextData {
  user: IUser;
  loading: boolean;
  setLoading: (value: React.SetStateAction<boolean>) => void;
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
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const tokenUser = localStorage.getItem("@login:token");
  const userId = localStorage.getItem("@login:user");

  const signIn = (data: ILoginProps) => {
    fakeApi
      .post("/signin", data)
      .then((response) => {
        const { user, accessToken } = response.data;
        fakeApi.defaults.headers.common.Authorization = `Bearer ${tokenUser}`;
        localStorage.setItem("@login:token", accessToken);
        localStorage.setItem("@login:user", user.id);
        setUserLogin(user);
        setLoading(true);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        toast.error("Login e/ou senha inválidos", { autoClose: 2000 });
        console.error("Esse é o erro", error);
      });
  };

  useEffect(() => {
    async function loadUser() {
      if (tokenUser) {
        try {
          fakeApi.defaults.headers.common.Authorization = `Bearer ${tokenUser}`;
          const { data } = await fakeApi.get(`/users/${userId}`);
          setUser(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadUser();
  }, [tokenUser, userId]);

  const logout = () => {
    localStorage.clear();
    toast.warning("Você está sendo deslogado", { autoClose: 2000 });
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
        userId,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;