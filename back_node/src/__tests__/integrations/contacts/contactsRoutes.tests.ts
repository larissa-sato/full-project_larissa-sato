import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import {
  mockedAdmin,
  mockedUser,
  mockedAdminLogin,
  mockedUserLogin,
  mockedContact1
} from "../../mocks";
import app from "../../../app";

describe("/contact", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.error("Error during data-source initialization", error);
      });

      await request(app).post("/users").send(mockedAdmin);
      await request(app).post("/users").send(mockedUser);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /contact -> Must be able to create a contact", async () => {    
    const admLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app).post("/contact")
    .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
    .send(mockedContact1);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("contact");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body.name).toEqual("Mariana");
    expect(response.body.email).toEqual("mariana@mail.com");
    expect(response.body.contact).toEqual("98799897898");
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /contact -> should not be able to create a contact that already exists", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app).post("/contact")
    .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
    .send(mockedContact1);
 
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /contact ->  Must be able to list clients", async () => {
    await request(app).post("/contact").send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
  });

  test("GET /contact ->  should not be able to list contacts without authentication", async () => {
    const response = await request(app).get("/contact");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /contact -> should not be able to list contacts not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /contact/:id ->  should not be able to delete contacts without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const contactTobeDeleted = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/contact/${contactTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /contact/:id ->  should not be able to delete contact not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const contactTobeDeleted = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/contact/${contactTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /contact/:id ->  shouldn't be able to delete contact with isActive = false", async () => {
    await request(app).post("/contact").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const contactTobeDeleted = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/contact/${contactTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const delResponse = await request(app)
      .delete(`/contact/${contactTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(delResponse.status).toBe(400);
    expect(delResponse.body).toHaveProperty("message");
  });

  test("DELETE -  should not be able to delete contact with invalid id", async () => {
    await request(app).post("/contact").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .delete(`/contact/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /contact/:id ->  should not be able to update clients without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const contactTobeUpdate = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).patch(
      `/contact/${contactTobeUpdate.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /contact/:id -> should not be able to update contacts with invalid id", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const contactTobeUpdateRequest = await request(app)
      .get("/contact")
      .set("Authorization", token);
    const contactTobeUpdateId = contactTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/contact/e64c6322-2a32-41be-8be9-37da17161ee9`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /contact/:id -> should not be able to update id field value", async () => {
    const newValues = { id: false };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const contactTobeUpdateRequest = await request(app)
      .get("/contact")
      .set("Authorization", token);
    const contactTobeUpdateId = contactTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/contact/${contactTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /contact/:id ->  should be able to update user", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const contactTobeUpdateRequest = await request(app)
      .get("/contact")
      .set("Authorization", token);
    const contactTobeUpdateId = contactTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/contact/${contactTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    const contactUpdated = await request(app)
      .get("/contact")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(contactUpdated.body[0].name).toEqual("Joana Brito");
    expect(contactUpdated.body[0]).toHaveProperty("email");
  });
});