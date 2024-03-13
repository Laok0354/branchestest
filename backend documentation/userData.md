# Documentación de Rutas de la API - Historial de Búsqueda y Visita

Este documento proporciona una descripción de las rutas de la API que gestionan el historial de búsqueda y visita de usuarios. Las rutas están protegidas mediante el uso de una clave de API (`API_KEY`) y utilizan Prisma para interactuar con la base de datos.

## Rutas

### 1. GET /searchHistory/:uId

- **Descripción:** Obtiene el historial de búsqueda de un usuario.
- **Middleware:** Verifica la clave de API (`API_KEY`).
- **Parámetros de Ruta:** `uId` - ID del usuario.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con el historial de búsqueda del usuario.
  - Falla:
    - Estado: 401, 404 o 500
    - JSON con un mensaje de error específico.

### 2. GET /userSearchHistory

- **Descripción:** Obtiene el historial de búsqueda de un usuario (específico por el ID proporcionado en el cuerpo).
- **Middleware:** Verifica la clave de API (`API_KEY`).
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con el historial de búsqueda del usuario.
  - Falla:
    - Estado: 401, 404 o 500
    - JSON con un mensaje de error específico.

### 3. GET /visitHistory/:uId

- **Descripción:** Obtiene el historial de visita de proyectos por un usuario.
- **Middleware:** Verifica la clave de API (`API_KEY`).
- **Parámetros de Ruta:** `uId` - ID del usuario.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de proyectos visitados por el usuario.
  - Falla:
    - Estado: 401, 404 o 500
    - JSON con un mensaje de error específico.

### 4. GET /getAllProjects

- **Descripción:** Obtiene la lista de todos los proyectos.
- **Middleware:** Verifica la clave de API (`API_KEY`).
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de todos los proyectos, incluyendo colaboradores.
  - Falla:
    - Estado: 401, 404 o 500
    - JSON con un mensaje de error específico.

## Funcionalidad

- Las rutas `/searchHistory` y `/userSearchHistory` obtienen y devuelven historiales de búsqueda de usuarios autenticados.
- La ruta `/visitHistory` obtiene y devuelve el historial de proyectos visitados por un usuario autenticado.
- La ruta `/getAllProjects` devuelve la lista de todos los proyectos, incluyendo colaboradores.
- Se utiliza Prisma para interactuar con la base de datos y realizar operaciones de consulta en el historial de búsqueda y visita, así como en la obtención de todos los proyectos.

## Dependencias

- `dotenv`: Carga las variables de entorno desde un archivo `.env`.
- `express`: Marco web para Node.js.
- `@prisma/client`: Cliente Prisma para interacciones con la base de datos.

## Uso

Este script se puede usar como un conjunto de rutas en una aplicación Express.js. Asegúrate de tener las dependencias instaladas y configurar correctamente la base de datos antes de ejecutar la aplicación.

```javascript
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const API_KEY = process.env.API_KEY;

// Definición de las rutas de historial de búsqueda y visita
// ...

module.exports = router;
