# Documentación de Rutas de la API - Gestión de Usuarios

Este documento proporciona una descripción de las rutas de la API que gestionan la creación y obtención de información de usuarios. Las rutas utilizan Prisma para interactuar con la base de datos y están protegidas mediante el middleware `authenticateToken`.

## Rutas

### 1. POST /

- **Descripción:** Crea un nuevo usuario.
- **Middleware:** Ninguno.
- **Solicitud:**
  - Requiere un objeto en el cuerpo de la solicitud con la siguiente estructura:
    ```json
    {
      "email": "user@example.com",
      "password": "userPassword",
      "userName": "user123",
      "about": "User description",
      "skillIds": [1, 2, 3]
    }
    ```
- **Respuesta:**
  - Éxito:
    - Estado: 201
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 400 o 500
    - JSON con un mensaje de error específico.

### 2. GET /

- **Descripción:** Obtiene información del usuario autenticado.
- **Middleware:** `authenticateToken` - verifica la autenticidad y validez del token de acceso.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la información del usuario (id, email, userName, y habilidades).
  - Falla:
    - Estado: 500
    - JSON con un mensaje de error específico.

### 3. GET /getAllUsers

- **Descripción:** Obtiene información de todos los usuarios.
- **Middleware:** Ninguno.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de todos los usuarios, incluyendo proyectos y likes asociados.
  - Falla:
    - Estado: 500
    - JSON con un mensaje de error específico.

## Funcionalidad

- La ruta `/` permite la creación de un nuevo usuario, verificando la existencia del nombre de usuario y correo electrónico proporcionados.
- La ruta `/` utiliza bcrypt para almacenar la contraseña de forma segura.
- La ruta `/` también verifica la existencia de habilidades proporcionadas antes de crear un nuevo usuario.
- La ruta `/` realiza la conexión del usuario con las habilidades seleccionadas.
- La ruta `/` maneja situaciones de éxito y fallo, devolviendo códigos de estado HTTP y mensajes JSON descriptivos.
- La ruta `/getAllUsers` proporciona información detallada de todos los usuarios, incluyendo proyectos y likes asociados.
- Se utiliza Prisma para interactuar con la base de datos y realizar operaciones de creación y consulta de usuarios.

## Dependencias

- `dotenv`: Carga las variables de entorno desde un archivo `.env`.
- `express`: Marco web para Node.js.
- `bcrypt`: Biblioteca para el hash de contraseñas.
- `jsonwebtoken`: Biblioteca para la creación y verificación de tokens JWT.
- `@prisma/client`: Cliente Prisma para interacciones con la base de datos.
- `authMiddleware`: Middleware de autenticación.

## Uso

Este script se puede usar como un conjunto de rutas en una aplicación Express.js. Asegúrate de tener las dependencias instaladas y configurar correctamente la base de datos antes de ejecutar la aplicación.

```javascript
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('./authMiddleware');

// Definición de las rutas de gestión de usuarios
// ...

module.exports = router;
