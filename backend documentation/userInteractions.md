# Documentación de Rutas de la API - Gestión de Colaboraciones y Likes

Este documento proporciona una descripción de las rutas de la API que gestionan las colaboraciones y los likes en proyectos. Las rutas están protegidas mediante la autenticación de tokens y utilizan Prisma para interactuar con la base de datos.

## Rutas

### 1. POST /sendCollaborationRequest/:projectId

- **Descripción:** Envía una solicitud de colaboración para un proyecto específico.
- **Middleware:** Autenticación del token.
- **Parámetros de Ruta:** `projectId` - ID del proyecto.
- **Parámetros del Cuerpo:**
  - `message` - Mensaje opcional adjunto a la solicitud.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 400 o 500
    - JSON con un mensaje de error específico.

### 2. GET /getOwnCollaborationRequests

- **Descripción:** Obtiene las solicitudes de colaboración dirigidas al usuario autenticado.
- **Middleware:** Autenticación del token.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de solicitudes de colaboración del usuario.
  - Falla:
    - Estado: 404 o 500
    - JSON con un mensaje de error específico.

### 3. GET /getOwnCollaborationRequest/:id

- **Descripción:** Obtiene una solicitud de colaboración específica dirigida al usuario autenticado.
- **Middleware:** Autenticación del token.
- **Parámetros de Ruta:** `id` - ID de la solicitud de colaboración.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la solicitud de colaboración específica.
  - Falla:
    - Estado: 404 o 500
    - JSON con un mensaje de error específico.

### 4. GET /getCollaborationRequests

- **Descripción:** Obtiene todas las solicitudes de colaboración para los proyectos creados por el usuario autenticado.
- **Middleware:** Autenticación del token.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de solicitudes de colaboración para los proyectos del usuario.
  - Falla:
    - Estado: 404 o 500
    - JSON con un mensaje de error específico.

### 5. GET /getCollaborationRequest/:id

- **Descripción:** Obtiene una solicitud de colaboración específica para los proyectos creados por el usuario autenticado.
- **Middleware:** Autenticación del token.
- **Parámetros de Ruta:** `id` - ID de la solicitud de colaboración.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la solicitud de colaboración específica.
  - Falla:
    - Estado: 404 o 500
    - JSON con un mensaje de error específico.

### 6. POST /acceptCollaborationRequest/:id

- **Descripción:** Acepta una solicitud de colaboración específica.
- **Middleware:** Autenticación del token.
- **Parámetros de Ruta:** `id` - ID de la solicitud de colaboración.
- **Parámetros del Cuerpo:**
  - `response` - Mensaje opcional de respuesta.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 404 o 500
    - JSON con un mensaje de error específico.

### 7. POST /rejectCollaborationRequest/:id

- **Descripción:** Rechaza una solicitud de colaboración específica.
- **Middleware:** Autenticación del token.
- **Parámetros de Ruta:** `id` - ID de la solicitud de colaboración.
- **Parámetros del Cuerpo:**
  - `response` - Mensaje opcional de respuesta.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 404 o 500
    - JSON con un mensaje de error específico.

### 8. DELETE /deleteCollaborationRequest/:id

- **Descripción:** Elimina una solicitud de colaboración específica.
- **Middleware:** Autenticación del token.
- **Parámetros de Ruta:** `id` - ID de la solicitud de colaboración.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 404, 403 o 500
    - JSON con un mensaje de error específico.

### 9. POST /like/:pid

- **Descripción:** Da like o quita el like a un proyecto específico.
- **Middleware:** Autenticación del token.
- **Parámetros de Ruta:** `pid` - ID del proyecto.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 500
    - JSON con un mensaje de error específico.

### 10. GET /getLiked

- **Descripción:** Obtiene la lista de proyectos que han sido marcados como "liked" por el usuario autenticado.
- **Middleware:** Autenticación del token.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de proyectos marcados como "liked" por el usuario.
  - Falla:
    - Estado: 404 o 500
    - JSON con un mensaje de error específico.

### 11. DELETE /deleteAllLikes

- **Descripción:** Elimina todos los likes registrados en proyectos.
- **Middleware:** Autenticación del token.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 500
    - JSON con un mensaje de error específico.

### 12. DELETE /deleteAllCollaborationRequests

- **Descripción:** Elimina todas las solicitudes de colaboración registradas.
- **Middleware:** Ninguno.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con un mensaje de éxito.
  - Falla:
    - Estado: 500
    - JSON con un mensaje de error específico.

## Funcionalidad

- Las rutas `/sendCollaborationRequest` y `/getOwnCollaborationRequests` gestionan las solicitudes de colaboración.
- Las rutas `/acceptCollaborationRequest` y `/rejectCollaborationRequest` permiten aceptar o rechazar solicitudes de colaboración.
- Las rutas
