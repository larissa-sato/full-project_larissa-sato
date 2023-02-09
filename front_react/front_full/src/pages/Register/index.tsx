import { useForm } from "react-hook-form";
import { Form } from "../../components/Forms/styles";
import { Container } from "./styles";
import { Button } from "../../components/Buttons/styles";
import { Input } from "../../components/Input";
import { useContext } from "react";
import {
  IRegisterProviderProps,
  ISubmitData,
  RegisterContext,
} from "../../Context/RegisterContext";

export const Register = () => {
  const {
    register,
    handleSubmit
  } = useForm<ISubmitData>();

  const { onSubmitFunction, back } =
    useContext<IRegisterProviderProps>(RegisterContext);

  return (
    <Container>
      <div className="modalRegistro">

        <Form onSubmit={handleSubmit(onSubmitFunction)}>
          <h3>Cadastro</h3>

          <Input
            type="text"
            id="name"
            placeholder="Nome completo"
            {...register("name")}
          />

          <Input
            type="text"
            id="email"
            {...register("email")}
            placeholder="E-mail"
          />

          <Input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Senha"
          />

          <label htmlFor="isAdm">
            
              <select
                id="infoAdm"
                {...register("infoAdm")}
                className="select-text"
              >
                <option value="">Administrador</option>
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
              
          </label>

          <Button type="submit">Cadastrar</Button>
        </Form>

        <div className="headerRegister">
          <Button className="btnBackLogin" onClick={() => back()}>
            Voltar
          </Button>
        </div>
      </div>
    </Container>
  );
};