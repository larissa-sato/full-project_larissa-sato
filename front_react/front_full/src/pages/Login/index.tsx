import { useForm } from "react-hook-form";
import { AuthContext, ILoginProps } from "../../Context/LoginContext";
import { Form } from "../../components/Forms/styles";
import { Container } from "./styles";
import { Button } from "../../components/Buttons/styles";
import { useContext } from "react";

export const Login = () => {
  const {
    register,
    handleSubmit,
  } = useForm<ILoginProps>();
  const { signIn } = useContext(AuthContext);

  const onSubmit = handleSubmit(signIn);

  return (
    <Container>
      <section>
        <div className="global-login-div">
          
          <div className="modalLogin">
            <h3>Login</h3>

            <Form onSubmit={onSubmit}>
              <label htmlFor="email">
                <input
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  {...register("email")}
                />
              </label>

              <label htmlFor="password">
                <input
                  type="password"
                  id="password"
                  placeholder="Senha"
                  {...register("password")}
                />
              </label>

              <Button type="submit" className="btnLogin">
                Entrar
              </Button>
              <p>
                Ainda não tem cadastro?
                <a href="/Register">Cadastre-se aqui</a>
              </p>
            </Form>
          </div>
        </div>
      </section>
    </Container>
  );
};

