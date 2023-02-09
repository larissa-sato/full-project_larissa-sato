import { useContext } from "react";
import {FooterDashboard} from "../../components/Footer";
import {HeaderLogo} from "../../components/Header";
import { Modal } from "../../components/Modal";
import { MainDash } from "./styles";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../Context/ClientContext";
import { Banner } from "../../components/Banner/styles";

export const Dashboard = () => {
  const { modal, tokenUser } = useContext(ClientContext);
  const navigate = useNavigate();

  return (
    <>
      {tokenUser ? (
        <>
          {modal && <Modal />}
          <HeaderLogo />
            <MainDash>
              <Banner />
            </MainDash>
          <FooterDashboard/>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};