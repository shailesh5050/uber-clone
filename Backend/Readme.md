# User Registration API Documentation

## Endpoint: `/register`

Register a new user in the system.

### Request

- **Method:** POST
- **URL:** `user/register`
- **Content-Type:** application/json

### Request Body

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- **firstname:**
  - Required
  - Length: 3-30 characters
  - Trimmed
  - Max length: 50 characters

- **lastname:**
  - Required
  - Length: 3-30 characters
  - Trimmed
  - Max length: 50 characters

- **email:**
  - Required
  - Must be valid email format
  - Unique in database
  - Converted to lowercase
  - Trimmed

- **password:**
  - Required
  - Minimum length: 5 characters
  - Will be hashed before storage

### Success Response

- **Status Code:** 201 (Created)
- **Content-Type:** application/json

```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "avatar": "string",
    "coverImage": "string",
    "socketId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "token": "JWT_TOKEN"
}
```

### Error Responses

#### Validation Error
- **Status Code:** 400
- **Content:**
```json
{
  "message": [
    {
      "msg": "error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

### Notes

- Password is hashed using bcrypt before storage
- JWT token is generated upon successful registration
- Token expires in 1 day
- Avatar and coverImage are optional Cloudinary URLs
- Timestamps (createdAt, updatedAt) are automatically generated

### Example Usage

```bash
curl -X POST http://your-api-url/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```
## Endpoint: `/login`

Authenticate an existing user and receive a JWT token.

### Request

- **Method:** POST
- **URL:** `/login`
- **Content-Type:** application/json

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- **email:**
  - Required
  - Must be valid email format

- **password:**
  - Required
  - Minimum length: 5 characters

### Success Response

- **Status Code:** 200 (OK)
- **Content-Type:** application/json

```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "avatar": "string",
    "coverImage": "string",
    "socketId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "token": "JWT_TOKEN"
}
```

### Error Responses

#### Validation Error
- **Status Code:** 400
- **Content:**
```json
{
  "message": [
    {
      "msg": "error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

#### Authentication Error
- **Status Code:** 400 or 401
- **Content:**
```json
{
  "message": "Invalid email or password"
}
```

### Notes

- Password is compared with hashed password in database
- JWT token is generated upon successful authentication
- Token expires in 1 day
- Password field is not included in the response

### Example Usage

```bash
curl -X POST http://your-api-url/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

I'll help you add documentation for the user logout route in the README.md file.

```markdown README.md
## User Logout

### Endpoint `/user/logout`
```
POST user/logout
```

### Description
Logs out the currently authenticated user by clearing their authentication token.

### Authentication
Requires a valid authentication token in the request header.

### Request Headers
```
Authorization: Bearer <token>
```

### Response

#### Success (200 OK)
```json
{
  "message": "User logged out successfully"
}
```

#### Error Responses

##### Unauthorized (401)
```json
{
  "error": "Unauthorized - Please login first"
}
```

### Example Usage
```bash
curl -X POST \
  http://localhost:3000/api/users/logout \
  -H 'Authorization: Bearer your-auth-token'
```
```