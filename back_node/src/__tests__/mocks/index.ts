import { IClientRequest } from "../../interfaces/clients";
import { IContactRequest } from "../../interfaces/contacts";
import { IUserLogin, IUserRequest } from "../../interfaces/users";

export const mockedAdmin: IUserRequest = {
  name: "Joana",
  email: "joana@mail.com",
  password: "123456",
  isAdm: true,
};

export const mockedUser: IUserRequest = {
  name: "Ana",
  email: "ana@mail.com",
  isAdm: false,
  password: "123456",
};

export const mockedUserExistente: IUserRequest = {
  name: "Ana23",
  email: "ana23@mail.com",
  password: "123456",
  isAdm: false,
};

export const mockedAdminLogin: IUserLogin = {
  email: "joana@mail.com",
  password: "123456",
};

export const mockedUserLogin: IUserLogin = {
  email: "ana@mail.com",
  password: "123456",
};

export const mockedUserLoginExistente: IUserLogin = {
  email: "ana23@mail.com",
  password: "123456",
};

export const mockedUserLoginNoExistent: IUserLogin = {
  email: "ana@maill.com",
  password: "123456",
};

export const mockedClient1: IClientRequest = {
    name: "Jordana",
    email: "jordana@mail.com",
    contact: "11999897563"
  };

  export const mockedClient2: IClientRequest = {
    name: "Cecilia",
    email: "cecilia@mail.com",
    contact: "11999897147"
  };

  export const mockedClient3: IClientRequest = {
    name: "Mateus",
    email: "mateus@mail.com",
    contact: "11999897852"
  };

  export const mockedContact1: IContactRequest = {
    name: "Mariana",
    email: "mariana@mail.com",
    contact: "98799897898"
  };

  export const mockedContact2: IContactRequest = {
    name: "Roberto",
    email: "roberto@mail.com",
    contact: "25799897898"
  };

  export const mockedContact3: IContactRequest = {
    name: "Carlos",
    email: "carlos@mail.com",
    contact: "45699897898"
  };