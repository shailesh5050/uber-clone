# User Registration API Documentation

## Endpoint: `/register`

Register a new user in the system.

### Request

- **Method:** POST
- **URL:** `/register`
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