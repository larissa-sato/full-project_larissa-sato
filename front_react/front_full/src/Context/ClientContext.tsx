import {
    createContext,
    ReactNode,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
  } from "react";
  import { fakeApi} from "../services";
  import { IClient, IClientRequest } from "../interfaces/client";
  

  export interface ClientContextData{
    tokenUser: string | null;
    modal: string | null;
    setModal: Dispatch<SetStateAction<string | null>>;
    isOpenModal: boolean,
    setIsOpenModal: Dispatch<SetStateAction<boolean>>,
    openModal: () => void,
    closeModal: () => void,
    client: IClientList[];
    setClient: Dispatch<SetStateAction<IClientList[]>>;
    clientApi: IClient;
    setClientApi: React.Dispatch<React.SetStateAction<IClient>>;
    onSubmitClient: (data: IClientRequest) => void;
    onSubmitPatch: (data: IConfig) => void
    onSubmitSearch: (data: IConfig) => void;
    deletedClient: (id: string) => void;
  }

  export interface IClientList {
    id: string;
    name: string;
    email: string;
    contact: string;
    createdAt: string;
    isActive: boolean;
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
    const [modal, setModal] = useState<string| null>(null);
    const [client, setClient] = useState<IClientList[]>([])
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    console.log(isOpenModal)

    const tokenUser = localStorage.getItem("@login:token");


  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }
    
  const onSubmitClient = (data: IClientRequest) => {
    fakeApi
      .post("/client", data)
      .then((response) => {
        setClient((oldClients) => [...oldClients, response.data]);
        setClientApi(response.data)
        setModal(null);
      })
      .catch((error) => console.error("Esse é o problema!", error));
  };

  const onSubmitPatch = (id: IConfig) => {
    fakeApi
      .patch(`/client/${id}`,{
        headers: { Authorization: `Bearer ${tokenUser}` },
      })
      .then((res) => {
        setClient(res.data);
        setModal(null);
      })
      .catch((error) => {
        console.error("Esse é o problema!", error);
      });
  };

  const onSubmitSearch = () => {
    fakeApi
      .get(`/client`,{
        headers: { Authorization: `Bearer ${tokenUser}` },
      })
      .then((res) => {
        setClient(res.data);
      })
      .catch((error) => {
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
        const deletedFiltered = client.filter((elem) => elem.isActive !== true);
        setClient(deletedFiltered);
      })
      .catch((err) => console.error("Este é o erro!", err));
  };

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        clientApi,
        tokenUser,
        modal,
        setModal,
        isOpenModal,
        setIsOpenModal,
        openModal,
        closeModal,
        setClientApi,
        onSubmitClient,
        deletedClient,
        onSubmitPatch,
        onSubmitSearch
      }}
    >
      {children}
    </ClientContext.Provider>
  );
  }

  export default ClientProvider;