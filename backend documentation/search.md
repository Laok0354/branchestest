# Documentación de Rutas de la API - Búsqueda de Proyectos y Usuarios

Este documento proporciona una descripción de las rutas de la API que gestionan la búsqueda de proyectos y usuarios. Las rutas utilizan Prisma para interactuar con la base de datos y están protegidas mediante el middleware `authenticateToken`.

## Rutas

### 1. GET /searchProject/:searchString

- **Descripción:** Busca proyectos basados en una cadena de búsqueda.
- **Middleware:** `authenticateToken` - verifica la autenticidad y validez del token de acceso.
- **Parámetros de Ruta:** `searchString` - La cadena de búsqueda para proyectos.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de proyectos que coinciden con la búsqueda.
  - Falla:
    - Estado: 400, 404 o 500
    - JSON con un mensaje de error específico.

### 2. GET /searchProjectUnlogged/:searchString

- **Descripción:** Busca proyectos sin requerir autenticación.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de proyectos que coinciden con la búsqueda.
  - Falla:
    - Estado: 404 o 500
    - JSON con un mensaje de error específico.

### 3. GET /searchUser/:searchString

- **Descripción:** Busca usuarios basados en una cadena de búsqueda.
- **Middleware:** `authenticateToken` - verifica la autenticidad y validez del token de acceso.
- **Parámetros de Ruta:** `searchString` - La cadena de búsqueda para usuarios.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de usuarios que coinciden con la búsqueda.
  - Falla:
    - Estado: 404 o 500
    - JSON con un mensaje de error específico.

### 4. GET /searchUserUnlogged/:searchString

- **Descripción:** Busca usuarios sin requerir autenticación.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de usuarios que coinciden con la búsqueda.
  - Falla:
    - Estado: 404 o 500
    - JSON con un mensaje de error específico.

## Funcionalidad

- Las rutas `/searchProject` y `/searchUser` buscan proyectos y usuarios, respectivamente, en función de una cadena de búsqueda proporcionada.
- Las rutas `/searchProjectUnlogged` y `/searchUserUnlogged` realizan búsquedas similares pero no requieren autenticación.
- Las búsquedas generan historiales de búsqueda para usuarios autenticados.
- Se utiliza Prisma para interactuar con la base de datos y realizar operaciones de búsqueda.
- Las rutas manejan situaciones de éxito y fallo, devolviendo códigos de estado HTTP y mensajes JSON descriptivos.

## Dependencias

- `dotenv`: Carga las variables de entorno desde un archivo `.env`.
- `express`: Marco web para Node.js.
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

// Definición de las rutas de búsqueda de proyectos y usuarios
// ...

module.exports = router;
