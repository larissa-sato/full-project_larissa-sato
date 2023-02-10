import { createContext, ReactNode, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeApi } from "../services";
import { RegisterContext } from "./RegisterContext";

export interface AuthContextData {
  userLogin: IUserResponse;
  setUserLogin: React.Dispatch<React.SetStateAction<IUserResponse>>;
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
  id: string
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
  const [userLogin, setUserLogin] = useState<IUserResponse>({} as IUserResponse);
  const {user, setUser} = useContext(RegisterContext);
  const navigate = useNavigate();
  const tokenUser = localStorage.getItem("@login:token");
  const userId = localStorage.getItem("@login:id");

  const signIn = (data: ILoginProps) => {
    fakeApi
      .post("/login", data)
      .then((response) => {
        const { token } = response.data;
        fakeApi.defaults.headers.common.Authorization = `Bearer ${tokenUser}`;
        localStorage.setItem("@login:token", token);
        localStorage.setItem("@login:id", user.id);
        setUserLogin(userLogin);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
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
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;