# Documentación de Rutas de la API - Gestión de Proyectos

Este documento proporciona una descripción de las rutas de la API que gestionan la creación, modificación, eliminación y obtención de información sobre proyectos. Las rutas utilizan Prisma para interactuar con la base de datos y están protegidas mediante el middleware `authenticateToken`.

## Rutas

### 1. POST /create

- **Descripción:** Crea un nuevo proyecto.
- **Middleware:** `authenticateToken` - verifica la autenticidad y validez del token de acceso.
- **Solicitud:**
  - Requiere campos `name`, `description`, `statusId`, y `maxMembers` en el cuerpo de la solicitud.
- **Respuesta:**
  - Éxito:
    - Estado: 201
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 400 o 409
    - JSON con un mensaje de error específico.

### 2. PUT /modify/:pid

- **Descripción:** Modifica un proyecto existente.
- **Middleware:** `authenticateToken` - verifica la autenticidad y validez del token de acceso.
- **Solicitud:**
  - Requiere campos `name`, `description`, `statusId`, y `maxMembers` en el cuerpo de la solicitud.
- **Respuesta:**
  - Éxito:
    - Estado: 201
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 400, 401, 404 o 409
    - JSON con un mensaje de error específico.

### 3. DELETE /delete/:pid

- **Descripción:** Elimina un proyecto.
- **Middleware:** `authenticateToken` - verifica la autenticidad y validez del token de acceso.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 401 o 404
    - JSON con un mensaje de error específico.

### 4. GET /getp/:pid

- **Descripción:** Obtiene información detallada sobre un proyecto específico.
- **Middleware:** `authenticateToken` - verifica la autenticidad y validez del token de acceso.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con información detallada sobre el proyecto.
  - Falla:
    - Estado: 404
    - JSON con un mensaje de error específico.

### 5. GET /getAllProjects

- **Descripción:** Obtiene todos los proyectos existentes.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de todos los proyectos.
  - Falla:
    - Estado: 500
    - JSON con un mensaje de error específico.

### 6. GET /getMyProjects

- **Descripción:** Obtiene todos los proyectos creados por el usuario autenticado.
- **Middleware:** `authenticateToken` - verifica la autenticidad y validez del token de acceso.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de proyectos del usuario.
  - Falla:
    - Estado: 500
    - JSON con un mensaje de error específico.

## Funcionalidad

- Las rutas utilizan Prisma para interactuar con la base de datos y realizar operaciones de creación, modificación, eliminación y consulta de proyectos.
- Se implementa el middleware `authenticateToken` para proteger las rutas, asegurando que solo los usuarios autenticados puedan acceder a ellas.
- Las rutas manejan situaciones de éxito y fallo, devolviendo códigos de estado HTTP y mensajes JSON descriptivos.

## Dependencias

- `express`: Marco web para Node.js.
- `@prisma/client`: Cliente Prisma para interacciones con la base de datos.
- `authMiddleware`: Middleware de autenticación.

## Uso

Este script se puede usar como un conjunto de rutas en una aplicación Express.js. Asegúrate de tener las dependencias instaladas y configurar correctamente la base de datos antes de ejecutar la aplicación.

```javascript
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
co
