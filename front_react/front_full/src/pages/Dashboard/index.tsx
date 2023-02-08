import { useContext } from "react";
import {FooterDashboard} from "../../components/Footer";
import {HeaderLogo} from "../../components/Header";
import { Modal } from "../../components/Modal";
import { MainDash } from "./styles";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../Context/ClientContext";

export const Dashboard = () => {
  const { modal, tokenUser } = useContext(ClientContext);
  const navigate = useNavigate();

  return (
    <>
      {tokenUser ? (
        <>
          {modal && <Modal />}
          <HeaderLogo />
          <MainDash/>
          <FooterDashboard/>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};