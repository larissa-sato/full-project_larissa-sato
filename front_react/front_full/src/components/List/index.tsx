import { ListUserClients } from "./styles";
import { CardClient } from "../CardClient";
import { useContext } from "react";
import { ClientContext } from "../../Context/ClientContext";

export const List = () => {
  const { client } = useContext(ClientContext);
  return (
    <ListUserClients>
      {client?.map((client) => (
        <CardClient client={client} key={client.id} />
      ))}
    </ListUserClients>
  );
};