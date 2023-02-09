import {
    createContext,
    ReactNode,
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
  } from "react";
  import { AuthContext } from "./LoginContext";
  import { fakeApi} from "../services";
  import { toast } from "react-toastify";
  import { IClient, IClientRequest } from "../interfaces/client";
  

  export interface ClientContextData{
    loading: boolean;
    tokenUser: string | null;
    modal: string | null;
    client: IClientList[];
    setClient: Dispatch<SetStateAction<IClientList[]>>;
    clientApi: IClient;
    setClientApi: React.Dispatch<React.SetStateAction<IClient>>;
    setModal: Dispatch<SetStateAction<string | null>>;
    onSubmitClient: (data: IClientRequest) => void;
    onSubmitFunction: (data: IConfig) => void
    deletedClient: (id: string) => void;
  }

  export interface IClientList {
    id: string;
    name: string;
    email: string;
    contact: string;
    createdAt: string;
    userId: number | null | string;
  }

  export interface IClientContext {
    children: ReactNode;
  }

  export const ClientContext = createContext<ClientContextData>(
    {} as ClientContextData
  );

  export interface IConfig {
    name?: string;
    email?: string;
    contact?: string;
  }

  const ClientProvider = ({children}: IClientContext) => {
    const [clientApi, setClientApi] = useState<IClient>({} as IClient)
    const [modal, setModal] = useState<string | null>(null);
    const [client, setClient] = useState<IClientList[]>([])
    const { loading } = useContext(AuthContext);

    const tokenUser = localStorage.getItem("@login:token");
    
  const onSubmitClient = (data: IClientRequest) => {
    fakeApi
      .post("/client", data)
      .then((response) => {
        toast.success("Cliente adicionado com sucesso", {
          autoClose: 2000,
        });
        setClient((oldClients) => [...oldClients, response.data]);
        setModal(null);
      })
      .catch((error) => console.error("Esse é o problema!", error));
  };

  const onSubmitFunction = (id: IConfig) => {
    fakeApi
      .patch(`/clients/${id}`,{
        headers: { Authorization: `Bearer ${tokenUser}` },
      })
      .then((res) => {
        setClient(res.data);
        setModal(null);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao editar o cliente.", {
          autoClose: 2000,
        });
        console.error("Esse é o problema!", error);
      });
  };

  useEffect(() => {
    if (tokenUser) {
      fakeApi
        .get("/client", {
          headers: { Authorization: `Bearer ${tokenUser}` },
        })
        .then((res) => {
          setClient(res.data);
          setModal(null);
        })
        .catch((err) => console.error(err));
    }
  }, []);


  const deletedClient = (id: string) => {
    fakeApi
      .delete(`/client/${id}`, {
        headers: { Authorization: `Bearer ${tokenUser}` },
      })
      .then(() => {
        const deletedFiltered = client.filter((elem) => elem.id !== id);
        setClient(deletedFiltered);
        toast.success("Cliente removido com sucesso!");
      })
      .catch((err) => console.error("Este é o erro!", err));
  };

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        clientApi,
        loading,
        tokenUser,
        modal,
        setClientApi,
        setModal,
        onSubmitClient,
        deletedClient,
        onSubmitFunction
      }}
    >
      {children}
    </ClientContext.Provider>
  );
  }

  export default ClientProvider;