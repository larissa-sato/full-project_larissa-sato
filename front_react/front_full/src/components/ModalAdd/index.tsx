import { Container } from "./styles";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Form } from "../Forms/styles";
import { Button } from "../Buttons/styles";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { IClientRequest } from "../../interfaces/client";
import { ClientContext } from "../../Context/ClientContext";


const ModalAdd = () => {
  const { register, handleSubmit } = useForm<IClientRequest>({});

  const { onSubmitClient, setIsOpenModal } = useContext(ClientContext);

  return (
    <Container>
      <div className="modalBox">
        <div className="headerModal">
          <h2>Cadastrar Cliente</h2>
          <button
            type="button"
            className="btnClose"
            onClick={() => setIsOpenModal(!setIsOpenModal)}
          >
            <AiOutlineCloseCircle />
          </button>
        </div>

        <div className="formAddClient">
          <Form onSubmit={handleSubmit(onSubmitClient)}>
            <label htmlFor="tech">Nome</label>
            <input
              type="text"
              id="tecnologia"
              {...register("name")}
              placeholder="Nome"
            />

            <label htmlFor="tech">E-mail</label>
            <input
              type="text"
              id="email"
              {...register("email")}
              placeholder="E-mail"
            />

            <label htmlFor="tech">Telefone</label>
            <input
              type="text"
              id="contact"
              {...register("contact")}
              placeholder="Telefone para contato"
            />
            <Button className="btnSubmit">Cadastrar</Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default ModalAdd;