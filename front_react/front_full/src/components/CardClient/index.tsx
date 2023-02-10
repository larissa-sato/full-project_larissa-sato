import { Card } from "./styles";
import { RiDeleteBin2Line } from "react-icons/ri";
import {CiEdit} from "react-icons/ci"
import { Button } from "../Buttons/styles";
import { List } from "../List";
import { useContext } from "react";
import { ClientContext } from "../../Context/ClientContext";

export const CardClient = (tech: any) => {
  const { deletedClient, onSubmitPatch, clientApi } = useContext(ClientContext);
  console.log(clientApi)

  return (
    <Card>

      <div className="divStatus">
        <p>{clientApi.name}</p>
        <span>{clientApi.email}</span>
        <span>{clientApi.contact}</span>
        <Button
          type="button"
          className="btnDelTech"
          onClick={() => deletedClient(clientApi.id)}
        >
          <RiDeleteBin2Line />
        </Button>

        <Button
          type="button"
          className="btnDelTech"
          onClick={() => onSubmitPatch(tech.id)}
        >
          <CiEdit />
        </Button>
      </div>
    </Card>
  );
};