# Documentación de Rutas de la API

Este documento proporciona una descripción general de las rutas en el script de la API proporcionado. La API está construida utilizando Express.js y utiliza Prisma para las interacciones con la base de datos.

## Rutas

### 1. POST /login

- **Descripción:** Maneja la autenticación del usuario.
- **Solicitud:**
  - Requiere campos `email` y `password` en el cuerpo de la solicitud.
- **Respuesta:**
  - Inicio de sesión exitoso:
    - Estado: 200
    - Cookies establecidas para `refreshToken` y `accessToken`.
    - Respuesta JSON con `accessToken` y `refreshToken`.
  - Inicio de sesión no exitoso:
    - Estado: 400
    - Respuesta JSON con un mensaje de error.

### 2. DELETE /logout

- **Descripción:** Maneja el cierre de sesión del usuario eliminando tokens de actualización.
- **Middleware:** `authenticateToken` - verifica la presencia y validez del token de acceso.
- **Respuesta:**
  - Cierre de sesión exitoso:
    - Estado: 200
    - Cookies eliminadas para `refreshToken` y `accessToken`.
    - Respuesta JSON con un mensaje de cierre de sesión.
  - Cierre de sesión no exitoso:
    - Estado: 400
    - Respuesta JSON con un mensaje de error.

### 3. GET /token

- **Descripción:** Refresca el token de acceso.
- **Middleware:** `authenticateToken` - verifica la presencia y validez del token de acceso.
- **Respuesta:**
  - Actualización exitosa del token:
    - Estado: 200
    - Nuevo `accessToken` establecido como cookie.
    - Respuesta JSON con el nuevo `accessToken`.
  - Actualización no exitosa del token:
    - Estado: 400
    - Respuesta JSON con un mensaje de error.

### 4. GET /check

- **Descripción:** Verifica si el usuario está autorizado.
- **Middleware:** `authenticateToken` - verifica la presencia y validez del token de acceso.
- **Respuesta:**
  - Autorizado:
    - Estado: 200
    - Cuerpo de respuesta: "authorized"
  - No autorizado:
    - Estado: 401
    - Cuerpo de respuesta: "unauthorized"

## Función Auxiliar

### `generateAccessToken(user)`

- **Descripción:** Genera un token de acceso utilizando JWT.
- **Parámetros:** 
  - `user`: Objeto de usuario que contiene al menos la propiedad `email`.
- **Devuelve:**
  - Token de acceso codificado en JWT.
  - Devuelve `null` si la propiedad `email` está ausente en el objeto de usuario.

## Dependencias

- `express`: Marco web para Node.js.
- `bcrypt`: Biblioteca de cifrado de contraseñas.
- `jsonwebtoken`: Implementación de JSON Web Token.
- `@prisma/client`: Cliente Prisma para interacciones con la base de datos.

## Variables de Entorno

- `ACCESS_TOKEN_SECRET`: Clave secreta para firmar tokens de acceso.
- `REFRESH_TOKEN_SECRET`: Clave secreta para firmar tokens de actualización.

