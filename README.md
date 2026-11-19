# E-commerce REST API · NestJS + PostgreSQL + JWT

Backend for an e-commerce built with **NestJS**, **TypeORM** and **PostgreSQL**, with **JWT authentication**, **role-based access control** and interactive docs with **Swagger**.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=flat-square&logo=typeorm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)

## Features

- **Auth**: register and login with hashed passwords (bcrypt) and JWT access tokens (1 day expiry)
- **Roles**: `user` and `admin`, enforced with a custom `@Auth(Role)` decorator that combines an auth guard and a roles guard
- **Products** and **categories** CRUD (admin only), with product ↔ category relation and soft deletes
- **Users** management (admin only)
- Request validation with `class-validator` (`whitelist` + `forbidNonWhitelisted`)
- Configuration through environment variables (`@nestjs/config`), CORS and optional SSL for hosted databases
- API versioning under `/api/v1` and Swagger UI at `/docs`

## Tech stack

NestJS 11 · TypeScript · TypeORM · PostgreSQL 14 · JWT (`@nestjs/jwt`) · bcryptjs · class-validator · Swagger · Docker Compose

## Getting started

**Requirements:** Node.js 20+, Docker.

```bash
git clone https://github.com/Liku-beep-boop/nest-postgres-api-rest-jwt.git
cd nest-postgres-api-rest-jwt
npm install

# 1. Start PostgreSQL (exposed on localhost:5436)
docker compose up -d

# 2. Create your env file and set a real JWT_SECRET
cp .env.example .env

# 3. Run the API in watch mode
npm run start:dev
```

- API: `http://localhost:3000/api/v1`
- Swagger docs: `http://localhost:3000/docs`

> `synchronize: true` is enabled in TypeORM for development convenience: the schema is created from the entities automatically. Use migrations in production.

## Endpoints

| Method | Route | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Public | Create an account |
| `POST` | `/api/v1/auth/login` | Public | Get a JWT access token |
| `GET` | `/api/v1/auth/profile` | User | Current user from the token |
| `GET` `POST` | `/api/v1/products` | Admin | List / create products |
| `GET` `PATCH` `DELETE` | `/api/v1/products/:id` | Admin | Read / update / delete a product |
| `GET` `POST` | `/api/v1/category` | Admin | List / create categories |
| `GET` `PATCH` `DELETE` | `/api/v1/category/:id` | Admin | Read / update / delete a category |
| `GET` `POST` | `/api/v1/users` | Admin | List / create users |
| `GET` `PATCH` `DELETE` | `/api/v1/users/:id` | Admin | Read / update / delete a user |

Send the token in the `Authorization: Bearer <token>` header. In Swagger, use the **Authorize** button.

## Project structure

```
src/
├── auth/        # register/login, JWT, guards and @Auth() decorator
├── users/       # user entity and admin endpoints
├── products/    # products CRUD
├── category/    # categories CRUD
├── common/      # shared enums, decorators and interfaces
└── main.ts      # CORS, global validation, /api/v1 prefix, Swagger
```

## Environment variables

See [`.env.example`](.env.example): database connection (`POSTGRES_*`), `JWT_SECRET`, `CORS_ORIGIN` and `PORT`.
