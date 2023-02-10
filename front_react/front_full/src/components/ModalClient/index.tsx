import { useContext } from "react";
import {ModalForm} from "./styles";

import { ClientContext } from "../../Context/ClientContext";
import { useForm } from "react-hook-form";
import { IClientRequest } from "../../interfaces/client";


export const ModalAdd = () => {
  const { register, handleSubmit } = useForm<IClientRequest>({});
  const { onSubmitClient } = useContext(ClientContext);
  const {closeModal} = useContext(ClientContext)

  return (
    <>
      <section>
        <h3>Cadastro de clientes</h3>
        <button onClick={() => closeModal()}> X </button>
      </section>
      <ModalForm onSubmit={handleSubmit(onSubmitClient)}>
        <div>
          <input id="title" placeholder="Nome" {...register("name")} />
          <input id="title" placeholder="Email" {...register("email")} />
          <input id="title" placeholder="Telefone" {...register("contact")} />
          <p>Esse cliente entrará na sua lista</p>
        </div>
        <button type="submit">Cadastrar</button>
      </ModalForm>
    </>
  );
};

export const ModalConfig = () => {
  const { onSubmitPatch } = useContext(ClientContext);
  const { register, handleSubmit } = useForm<IClientRequest>({});
  const {closeModal} = useContext(ClientContext)

  return (
    <>
      <section>
        <h3>Editar cliente</h3>
        <button onClick={() => closeModal()}> X </button>
      </section>
      <ModalForm onSubmit={handleSubmit(onSubmitPatch)}>
        <div>
          <input id="name" placeholder="Nome" {...register("name")} />
          <input id="email" placeholder="Email" {...register("email")} />
          <input id="contact" placeholder="Telefone" {...register("contact")} />
        </div>

        <button type="submit">Editar</button>
      </ModalForm>
    </>
  );
};
