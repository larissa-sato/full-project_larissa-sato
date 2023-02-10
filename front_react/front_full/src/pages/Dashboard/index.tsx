import { useContext } from "react";
import { MainDash } from "./styles";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/LoginContext";
import { List } from "../../components/List";
import { ClientContext } from "../../Context/ClientContext";
import { FooterDash } from "../../components/Footer/styles";
import ModalAdd from "../../components/ModalAdd";
import { RegisterContext } from "../../Context/RegisterContext";

export const Dashboard = () => {
  const {logout} = useContext(AuthContext)
  const {setIsOpenModal, isOpenModal, closeModal} = useContext(ClientContext)
  const {user} = useContext(RegisterContext)
  const tokenUser = localStorage.getItem("@login:token");

  return (
    <>
      {tokenUser ? (
        <MainDash>
          <div className="dashHeader">
            <p>Olá, {user.name} </p>
            
            <button type="button" className="btnBack" onClick={() => logout()}>
              Sair
            </button>
          </div>

          <div className="addClient">
          <div className="headerList">
              <p>Meus Clientes</p>
              <button
                type="button"
                className="btnAddClient"
                onClick={() => setIsOpenModal(!isOpenModal)}
              > +Cliente </button>
              {isOpenModal && <ModalAdd />}
            </div>
              <List />
            
          </div>
        </MainDash>
      ) : (
        <Navigate to="/" />
      )}
    <FooterDash />
    </>
  );
};
