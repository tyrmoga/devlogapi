# DevLog API

A developer activity logging and team collaboration backend. Think: a stripped-down Linear/Notion backend — built to practice and demonstrate real-world Express.js API design.

---

## Tech Stack

- **Runtime:** Node.js (ESM)
- **Framework:** Express.js v5
- **Database:** PostgreSQL (via `pg`)
- **Auth:** JWT + bcrypt
- **Validation:** Joi
- **Other:** dotenv, cors, compression, express-rate-limit, sanitize-html

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally (or a remote connection string)

### Installation

```bash
git clone https://github.com/your-username/devlogapi.git
cd devlogapi
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=devlogapi
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
npm start
```

The server will:
1. Start on the configured `PORT`
2. Check if the target database exists — create it if not
3. Run schema initialization (tables + indexes)

---

## API Reference

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive a JWT | No |

#### POST `/api/auth/register`

```json
// Request
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}

// Response 201
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

#### POST `/api/auth/login`

```json
// Request
{
  "email": "jane@example.com",
  "password": "secret123"
}

// Response 200
{
  "token": "<jwt>"
}
```

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | List all users | Yes |
| GET | `/api/users/:id` | Get a specific user | Yes |
| PATCH | `/api/users/:id` | Update a user | Yes |
| DELETE | `/api/users/:id` | Delete a user | Yes |

---

## Project Structure

```
/src
  /config       — database connection and schema initialization
  /controllers  — HTTP request/response handling
  /data         — SQL schema definitions
  /middleware   — input validation, JWT auth
  /models       — database query logic
  /routes       — route definitions
  /services     — business logic (in progress)
index.js        — app entry point
```

> Controllers handle HTTP. Models handle queries. Services will own business logic. This separation makes the codebase easier to test and reason about.

---

## Error Responses

All errors follow a consistent shape:

```json
{ "error": "Descriptive message here" }
```

---

## Roadmap

- [x] Database auto-create and schema initialization
- [x] User registration and login with JWT
- [x] Input validation (Joi)
- [x] Layered architecture: routes → controllers → models
- [ ] Project creation and membership management
- [ ] Log entries (CRUD with filtering and pagination)
- [ ] `isProjectMember` / `isProjectOwner` authorization middleware
- [ ] Rate limiting on auth routes
- [ ] Helmet for secure HTTP headers
- [ ] Global error handler middleware
- [ ] Morgan request logging
