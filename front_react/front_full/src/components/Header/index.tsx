import { HeaderPage } from "./styles";
import logo from "../../assets/img/logo.png";

export const HeaderLogo = () => {
  return (
    <HeaderPage>
      <img src={logo} alt="BestWeather" />
      <h2>MyNotes</h2>
    </HeaderPage>
  );
};
