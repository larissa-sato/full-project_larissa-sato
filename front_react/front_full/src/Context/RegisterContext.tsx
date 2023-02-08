import { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fakeApi } from "../services";

export interface IRegisterProviderProps {
  onSubmitFunction: (data: ISubmitData) => Promise<void>;
  back: () => void;
}
interface IRegisterProps {
  children: ReactNode;
}

export interface ISubmitData {
  name: string;
  email: string;
  password: string;
  isAdm: string;
}
export const RegisterContext = createContext({} as IRegisterProviderProps);

const RegisterProvider = ({ children }: IRegisterProps) => {
  const navigate = useNavigate();

  const onSubmitFunction = async (data: ISubmitData) => {

    const infoAdm =
      data.isAdm === "sim"
        ? true
        : false

    const finalData = { ...data, infoAdm };

    try {
      await fakeApi.post("/users", finalData);
      toast.success("Cadastro feito com sucesso, faça o login.", {
        autoClose: 2000,
      });
      navigate("/");
    } catch (error) {
      toast.error("Verifique se todos os campos estão preenchidos.", {
        autoClose: 2000,
      });
      console.error("Deu esse problema", error);
    }
  };

  const back = () => {
    navigate("/");
  };
  return (
    <RegisterContext.Provider value={{ onSubmitFunction, back }}>
      {children}
    </RegisterContext.Provider>
  );
};
export default RegisterProvider;