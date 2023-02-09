import { useContext, useEffect, useState } from "react";
import { fakeApi } from "../../services";
import { Banner } from "./styles";
import { AuthContext, IUser } from "../../Context/LoginContext";
import { ClientContext } from "../../Context/ClientContext";

interface IInfos {
  title: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  url: string;
  id: number;
}

export const Banners = () => {
  const { user } = useContext(AuthContext);

  const [banner, setBanner] = useState<IInfos>({} as IInfos);
  const token = localStorage.getItem("@login:token") || "";

  const getClient = async (id: IUser) => {
    await fakeApi
      .get(`client`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setBanner(response.data))
      .catch((err) => console.error("Esse é o problema", err));
  };

  return (
    <Banner>
      
          <div className="divText">
            <h3>Lista de Clientes</h3>
          </div>

    </Banner>
  );
};