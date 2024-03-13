# Documentación de Rutas de la API - Recomendaciones de Proyectos

Este documento proporciona una descripción de las rutas de la API que gestionan la recomendación de proyectos. Las rutas utilizan Prisma para interactuar con la base de datos y están protegidas mediante el middleware `authenticateToken`.

## Rutas

### 1. POST /recommend

- **Descripción:** Crea recomendaciones de proyectos para un usuario.
- **Middleware:** Ninguno.
- **Solicitud:**
  - Requiere un objeto en el cuerpo de la solicitud con la siguiente estructura:
    ```json
    {
      "id": "userId",
      "projectsWithAffinities": [
        {
          "projectId": "projectId1"
        },
        {
          "projectId": "projectId2"
        },
        // ... (puede haber más proyectos)
      ]
    }
    ```
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 400 o 500
    - JSON con un mensaje de error específico.

### 2. GET /getRecommended

- **Descripción:** Obtiene las recomendaciones de proyectos para el usuario autenticado.
- **Middleware:** `authenticateToken` - verifica la autenticidad y validez del token de acceso.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de proyectos recomendados.
  - Falla:
    - Estado: 500
    - JSON con un mensaje de error específico.

### 3. DELETE /deleteAllRecommendations

- **Descripción:** Elimina todas las recomendaciones de proyectos.
- **Middleware:** `authenticateToken` - verifica la autenticidad y validez del token de acceso.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 500
    - JSON con un mensaje de error específico.

## Funcionalidad

- La ruta `/recommend` crea recomendaciones de proyectos para un usuario verificando la existencia del usuario y los proyectos proporcionados.
- La ruta `/getRecommended` obtiene las recomendaciones de proyectos para el usuario autenticado.
- La ruta `/deleteAllRecommendations` elimina todas las recomendaciones de proyectos.
- Se utiliza Prisma para interactuar con la base de datos y realizar operaciones de creación, consulta y eliminación de recomendaciones.
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

// Definición de las rutas de gestión de recomendaciones de proyectos
// ...

module.exports = router;
