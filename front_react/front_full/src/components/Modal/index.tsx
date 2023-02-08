import { useContext } from "react";
import { ModalAdd, ModalConfig } from "../ModalClient";
import { Container } from "./styles";
import { ClientContext } from "../../Context/ClientContext";

export const Modal = () => {
  const { modal } = useContext(ClientContext);
  return (
    <Container>
      <div className="modal">
        {modal === "add" ? <ModalAdd /> : <ModalConfig />}
      </div>
    </Container>
  );
};