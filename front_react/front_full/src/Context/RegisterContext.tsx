import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeApi } from "../services";
import { IUserResponse } from "./LoginContext";

export interface IRegisterProviderProps {
  onSubmitFunction: (data: ISubmitData) => Promise<void>;
  user: IUserResponse;
  setUser: React.Dispatch<React.SetStateAction<IUserResponse>>;
  back: () => void;
}
interface IRegisterProps {
  children: ReactNode;
}

export interface ISubmitData {
  name: string;
  email: string;
  password: string;
  infoAdm: string;
}

export const RegisterContext = createContext({} as IRegisterProviderProps);

const RegisterProvider = ({ children }: IRegisterProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserResponse>(
    {} as IUserResponse
  );
  const onSubmitFunction = async (data: ISubmitData) => {

    const isAdm =
      data.infoAdm === "sim"
        ? true
        : false

    const finalData = { ...data, isAdm };
    const {infoAdm: info, ...rest} = finalData

    try {
      await fakeApi.post("/users", rest)
      .then((response) => {
        const newUser = response.data;
        setUser(newUser);
        console.log(newUser)
        navigate("/", { replace: true });
      })
    } catch (error) {
      console.error("Deu esse problema", error);
    }
  };

  const back = () => {
    navigate("/");
  };
  return (
    <RegisterContext.Provider value={{ onSubmitFunction, back, user, setUser}}>
      {children}
    </RegisterContext.Provider>
  );
};
export default RegisterProvider;