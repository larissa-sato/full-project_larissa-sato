import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import {
  mockedAdmin,
  mockedUser,
  mockedAdminLogin,
  mockedUserLogin,
  mockedClient1
} from "../../mocks";
import app from "../../../app";

describe("/client", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.error("Error during data-source initialization", error);
      });
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /client -> Must be able to create a clients", async () => {
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app).post("/client")
    .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
    .send(mockedClient1);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("contact");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.name).toEqual("Jordana");
    expect(response.body.email).toEqual("mariana@mail.com");
    expect(response.body.contact).toEqual("11999897563");
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /client -> should not be able to create a client that already exists", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app).post("/client")
    .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
    .send(mockedClient1);
 
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /client ->  Must be able to list clients", async () => {
    await request(app).post("/client").send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .get("/client")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
  });

  test("GET /client ->  should not be able to list clients without authentication", async () => {
    const response = await request(app).get("/client");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /client -> should not be able to list clients not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get("/client")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /client/:id ->  should not be able to delete clients without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const clientTobeDeleted = await request(app)
      .get("/client")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/client/${clientTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /client/:id ->  should not be able to delete client not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const clientTobeDeleted = await request(app)
      .get("/client")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/client/${clientTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /client/:id ->  shouldn't be able to delete client with isActive = false", async () => {
    await request(app).post("/client").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const clientTobeDeleted = await request(app)
      .get("/client")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/client/${clientTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const delResponse = await request(app)
      .delete(`/client/${clientTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(delResponse.status).toBe(400);
    expect(delResponse.body).toHaveProperty("message");
  });

  test("DELETE -  should not be able to delete client with invalid id", async () => {
    await request(app).post("/client").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .delete(`/client/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /client/:id ->  should not be able to update clients without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const clientTobeUpdate = await request(app)
      .get("/client")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).patch(
      `/client/${clientTobeUpdate.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /client/:id -> should not be able to update clients with invalid id", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const clientTobeUpdateRequest = await request(app)
      .get("/client")
      .set("Authorization", token);
    const clientTobeUpdateId = clientTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/client/e64c6322-2a32-41be-8be9-37da17161ee9`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /client/:id -> should not be able to update isActive field value", async () => {
    const newValues = { isActive: false };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const clientTobeUpdateRequest = await request(app)
      .get("/client")
      .set("Authorization", token);
    const clientTobeUpdateId = clientTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/client/${clientTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /client/:id -> should not be able to update id field value", async () => {
    const newValues = { id: false };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const clientTobeUpdateRequest = await request(app)
      .get("/client")
      .set("Authorization", token);
    const clientTobeUpdateId = clientTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/client/${clientTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /client/:id -> should not be able to update another client without adm permission", async () => {
    const newValues = { isActive: false };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);
    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;
    const adminToken = `Bearer ${admingLoginResponse.body.token}`;

    const clientTobeUpdateRequest = await request(app)
      .get("/client")
      .set("Authorization", adminToken);
    const clientTobeUpdateId = clientTobeUpdateRequest.body[1].id;

    const response = await request(app)
      .patch(`/client/${clientTobeUpdateId}`)
      .set("Authorization", userToken)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /client/:id ->  should be able to update user", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const clientTobeUpdateRequest = await request(app)
      .get("/client")
      .set("Authorization", token);
    const clientTobeUpdateId = clientTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/client/${clientTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    const clientUpdated = await request(app)
      .get("/client")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(clientUpdated.body[0].name).toEqual("Joana Brito");
    expect(clientUpdated.body[0]).toHaveProperty("email");
  });
});