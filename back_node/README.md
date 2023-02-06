<h1 align ='center'> <strong>API Documentation<strong> </h1>

## **Content Table**

- [1. Overview](#1-overview)
- [2. Entity Relationship Diagram](#2-entity-relationship-diagram)
- [3. Endpoints](#3-endpoints)
- [4. Authetication](#4-authentication)

<br>

---

## **1. Overview**

This is an API for create users, clients and contaacts.

These were the main technologies used in this project:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/)

**Base URL: https://cine-express-projeto-m4.herokuapp.com**

### **Developer**

> - [Larissa Sato](https://www.linkedin.com/in/l-sato)

<br>

## **2. Entity Relationship Diagram**

[ Back to the top ](#content-table)

![Diagram](back_diagram-fullstack.png)

<br>

## **3. Endpoints**

[Back to the top](#content-table)

### Index

- [Users](#1-users)
- [Clients](#2-payments)
- [Contacts](#3-cinema)

<br>

## **4. Authentication**

[ Back to the top ](#content-table)

Some routes need authentication. The authentication used is the **Bearer Token** type.

The token is generated automatically at **user login**.

Thus, to access routes with authentication, it is necessary to have a user and be logged in with the user.

In addition, some routes require the user to be an administrator, or owner of the account, or employee

Please read each route's documentation to understand which authentications are required.

---

#

<br>

## **1.** **USERS**

[Back to Endpoints](#3-endpoints)

<br>

The User object is defined as:

| Field      | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| id         | string   | User's unique identifier                          |
| nome       | string   | User name \*                                      |
| email      | string   | User email \*                                     |
| is_adm     | boolean  | Defines whether a user is an administrator or not |
| is_active  | boolean  | Defines whether a user is active or not           |
| senha      | string   | User password \*                                  |
| created_at  | string   | Date when the user was created                    |

<br>

<br>

### **Endpoints**

<br>

| Method | Routes      | Description                              |
| ------ | ----------- | ---------------------------------------- |
| POST   | /users      | Create user                              |
| POST   | /login      | Login user                               |
| GET    | /users      | List all users                           |
| GET    | /users/:id  | Lists a user using its ID as a parameter |
| PATCH  | /user/:id   | Update user                              |
| DELETE | /delete/:id | Soft delete user                         |

---

<br>

## **1.1 User Creation**

[Back to Endpoints](#3-endpoints)

<br>

## POST `/users`

<br>

### **Request**:

- POST /users
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: None
- Content-type: application/json

<br>

### **Request body**:

```json
{
  "nome": "Larissa",
  "email": "larissa@mail.com",
  "senha": "1234",
  "is_adm": true,
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{

  {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "nome": "Larissa",
    "email": "larissa@mail.com",
    "is_adm": true,
    "is_active": true,
    "created_at": "2022-10-29T00:41:28.717Z",
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `400 - BAD REQUEST`** - Missing required field

```json
{
  "message": "(any object key) is a required field"
}
```

<br>

#### **Status `409 - CONFLICTS`** - Email already exists

```json
{
  "message": "This email already exists"
}
```

#

## **1.2 Login**

[Back to Endpoints](#3-endpoints)

<br>

## SIGN `/login`

<br>

### **Request**

- SIGN /login
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: None
- Content-type: application/json
- User must be created

<br>

### **Request body**:

```json
{
  "email": "larissa@mail.com",
  "senha": "1234"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaXNFbXBsb3llZSI6dHJ1ZSwiaWF0IjoxNjY3OTY0MDY2LCJleHAiOjE2NjgwNTA0NjYsInN1YiI6ImE4M2MxMjVjLWNjZjctNDA4NC04NTg1LWFhZDYyMWZiMjY5MSJ9.LHflvucPDWutAUSUa-O9NY516Y1s5bNVnVtdKPsu89k"
}
```

### **Error Response**:

<br>

#### **Status `403 - FORBIDDEN`** - "Invalid user or password"

```json
{
  "message": "Invalid user or password"
}
```

#

## **1.3 List Users**

[Back to Endpoints](#3-endpoints)

<br>

## GET `/users`

<br>

### **Request**:

- GET /users
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty body
- User must be an Adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{

   [
    {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "nome": "Larissa",
      "email": "larissa@mail.com",
      "is_adm": true,
      "is_active": true,
      "create_at": "2022-10-29T00:41:28.717Z",
    }
    ...
  ]
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - UNAUTHORIZED`** - "User is not an admin"

```json
{
  "message": "User is not an admin"
}
```

#

## **1.4 List User by Id**

[Back to Endpoints](#3-endpoints)

<br>

## GET `/users/:id`

<br>

### **Request**:

- GET /users/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty body
- User must be an Adm or employee

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{

   [
    {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "nome": "Larissa",
      "email": "larissa@mail.com",
      "is_adm": true,
      "is_active": true,
      "created_at": ""
    }
    ...
  ]
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin and employee"

```json
{
  "message": "User is not an admin"
}
or
{
  "message": "User is not employee
}
```

#

## **1.5 Update User by Id**

[Back to Endpoints](#3-endpoints)

<br>

## PATCH `/users/:id`

<br>

### **Request**:

- PATCH /users/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an Adm and employee

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{

  {
    "nome": "Thiago",
    "email": "thiago@mail.com"
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin and employee"

```json
{
  "message": "User is not an admin"
}
or
{
  "message": "User is not employee"
}
```

#

## **1.6 Delete User by Id**

[Back to Endpoints](#3-endpoints)

<br>

## DELETE `/users/:id`

<br>

### **Request**:

- DELETE /users/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an Adm and employee

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `204 - No Content`**

```json
No body returned for response
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin and employee"

```json
{
  "message": "User is not an admin"
}
or
{
  "message": "User is not employee"
}
```

### **Status `400 - Bad Request`** - "User already deleted"

```json
{
  "message": "User already deleted"
}
```

### **Status `404 - Not Found`** - "User not found id invalid"

```json
{
  "message": "User not found"
}
```

#

<br>

## **2.** **CLIENTS**

[Back to Endpoints](#3-endpoints)

<br>

The User object is defined as:

| Field      | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| id         | string   | Client's unique identifier                        |
| nome       | string   | Client name \*                                    |
| email      | string   | Client email \*                                   |
| telefone   | string   | Defines a contact                                 |
| created_at | string   | Date when the client was created                  |

<br>

<br>

### **Endpoints**

<br>

| Method | Routes        | Description                            |
| ------ | ------------- | -------------------------------------- |
| POST   | /clients      | Create client                          |
| GET    | /clients      | List all clients                       |
| GET    | /clients/:id  | List  a client using ID                |
| PATCH  | /clients/:id  | Update client                          |
| DELETE | /delete/:id   | Soft delete client                     |

---

<br>

## **2.1 Client Creation**

[Back to Endpoints](#3-endpoints)

<br>

## POST `/clients`

<br>

### **Request**:

- POST /users
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: None
- Content-type: application/json
- User must be an adm

<br>

### **Request body**:

```json
{
  "nome": "Darlene",
  "email": "darlene@mail.com",
  "telefone": "36985639715"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{

  {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "nome": "Darlene",
    "email": "darlene@mail.com",
    "is_adm": true,
    "is_active": true,
    "created_at": "2022-10-29T00:41:28.717Z",
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `400 - BAD REQUEST`** - Missing required field

```json
{
  "message": "(any object key) is a required field"
}
```

<br>

#### **Status `409 - CONFLICTS`** - Email already exists

```json
{
  "message": "This email already exists"
}
```

#

## **2.2 List Clients**


[Back to Endpoints](#3-endpoints)

<br>

## GET `/clients`

<br>

### **Request**:

- GET /clients
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty body
- User must be an adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{

   [
    {
        "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
        "nome": "Darlene",
        "email": "darlene@mail.com",
        "is_adm": true,
        "is_active": true,
        "created_at": "2022-10-29T00:41:28.717Z",
    }
    ...
  ]
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - UNAUTHORIZED`** - "User is not an admin"

```json
{
  "message": "User is not an admin"
}
```

#

## **2.3 List a specific client**

[Back to Endpoints](#3-endpoints)

<br>

## GET `/clients/:id`

<br>

### **Request**:

- GET /users/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty body
- User must be an adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{

   [
    {
        "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
        "nome": "Darlene",
        "email": "darlene@mail.com",
        "is_adm": true,
        "is_active": true,
        "created_at": "2022-10-29T00:41:28.717Z",
    }
    ...
  ]
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin and employee"

```json
{
  "message": "User is not an admin"
}
or
{
  "message": "User is not employee
}
```

#

## **2.4 Update client**

[Back to Endpoints](#3-endpoints)

<br>

## PATCH `/clients/:id`

<br>

### **Request**:

- PATCH /users/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{

  {
    "nome": "Thiago",
    "email": "thiago@mail.com"
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin and employee"

```json
{
  "message": "User is not an admin"
}
or
{
  "message": "User is not employee"
}
```

#

## **2.5 Delete a specific client**

[Back to Endpoints](#3-endpoints)

<br>

## DELETE `/clients/:id`

<br>

### **Request**:

- DELETE /clients/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `204 - No Content`**

```json
No body returned for response
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin and employee"

```json
{
  "message": "User is not an admin"
}
or
{
  "message": "User is not employee"
}
```

### **Status `400 - Bad Request`** - "User already deleted"

```json
{
  "message": "User already deleted"
}
```

### **Status `404 - Not Found`** - "User not found id invalid"

```json
{
  "message": "User not found"
}
```

#

<br>

## **3.** **CONTACTS**

[Back to Endpoints](#3-endpoints)

<br>

The User object is defined as:

| Field      | Type     | Description                               |
| ---------- | -------- | ----------------------------------------- |
| id         | string   | Cntact's unique identifier                |
| nome       | string   | Cntact name \*                            |
| email      | string   | Cntact email \*                           |
| telefone   | string   | Defines telephone number                  |
| created_at | string   | Date when the contact was created         |

<br>

<br>

### **Endpoints**

<br>

| Method | Routes        | Description                              |
| ------ | ----------  - | ---------------------------------------- |
| POST   | /contact      | Create contact                           |
| GET    | /contact      | List all contact                         |
| GET    | /contact/:id  | Lists a contact using ID                 |
| PATCH  | /contact/:id  | Update contact                           |
| DELETE | /delete/:id   | Soft delete contact                      |

---

<br>

## **3.1 Contact Creation**

[Back to Endpoints](#3-endpoints)

<br>

## POST `/contact`

<br>

### **Request**:

- POST /contact
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: None
- Content-type: application/json
- User must be an adm

<br>

### **Request body**:

```json
{
  "nome": "Darlene",
  "email": "darlene@mail.com",
  "telefone": "36985639715"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{

  {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "nome": "Darlene",
    "email": "darlene@mail.com",
    "is_adm": true,
    "is_active": true,
    "created_at": "2022-10-29T00:41:28.717Z",
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `400 - BAD REQUEST`** - Missing required field

```json
{
  "message": "(any object key) is a required field"
}
```

<br>

#### **Status `409 - CONFLICTS`** - Email already exists

```json
{
  "message": "This email already exists"
}
```

#

## **3.2 List Contact**


[Back to Endpoints](#3-endpoints)

<br>

## GET `/contact`

<br>

### **Request**:

- GET /contact
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty body
- User must be an adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{

   [
    {
        "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
        "nome": "Darlene",
        "email": "darlene@mail.com",
        "is_adm": true,
        "is_active": true,
        "created_at": "2022-10-29T00:41:28.717Z",
    }
    ...
  ]
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - UNAUTHORIZED`** - "User is not an admin"

```json
{
  "message": "User is not an admin"
}
```

#

## **3.3 Update contact**

[Back to Endpoints](#3-endpoints)

<br>

## PATCH `/contact/:id`

<br>

### **Request**:

- PATCH /contact/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{

  {
    "nome": "Thiago",
    "email": "thiago@mail.com"
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin and employee"

```json
{
  "message": "User is not an admin"
}
or
{
  "message": "User is not employee"
}
```

#

## **3.4 Delete a specific contact**

[Back to Endpoints](#3-endpoints)

<br>

## DELETE `/contact/:id`

<br>

### **Request**:

- DELETE /contact/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `204 - No Content`**

```json
No body returned for response
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin and employee"

```json
{
  "message": "User is not an admin"
}
or
{
  "message": "User is not employee"
}
```

### **Status `400 - Bad Request`** - "User already deleted"

```json
{
  "message": "User already deleted"
}
```

### **Status `404 - Not Found`** - "User not found id invalid"

```json
{
  "message": "User not found"
}
```

#