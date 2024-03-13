# Middleware de Autenticación

Este documento proporciona una descripción del middleware de autenticación utilizado en la aplicación. Este middleware se encarga de verificar la autenticidad y validez del token de acceso.

## Middleware

### `authenticateToken`

- **Descripción:** Middleware que autentica el token de acceso proporcionado en las cookies de la solicitud.
- **Función:**
  - Verifica la presencia y validez del token de acceso.
  - Utiliza el paquete `jsonwebtoken` para verificar la firma del token.
- **Parámetros:**
  - `req`: Objeto de solicitud de Express.
  - `res`: Objeto de respuesta de Express.
  - `next`: Función que pasa la solicitud al siguiente middleware en la cadena.
- **Comportamiento:**
  - Si el token de acceso no está presente o es indefinido en las cookies, devuelve un estado 401 (No Autorizado).
  - Si el token de acceso es válido, decodifica el token y establece `req.user` con la información del usuario.
  - Si hay un error en la verificación del token, devuelve un estado 403 (Prohibido).
  - Registra la información del usuario en la consola para propósitos de depuración.
  - Pasa la solicitud al siguiente middleware en la cadena utilizando `next()`.

## Dependencias

- `dotenv`: Carga las variables de entorno desde un archivo `.env`.
- `jsonwebtoken`: Implementación de JSON Web Token.

## Variables de Entorno

- `ACCESS_TOKEN_SECRET`: Clave secreta para verificar la firma del token de acceso.

## Uso

Este middleware se utiliza en las rutas que requieren autenticación. Por ejemplo:

```javascript
const express = require('express');
const router = express.Router();
const authenticateToken = require('./authenticateToken');

// Ruta protegida que requiere autenticación
router.get('/ruta-protegida', authenticateToken, (req, res) => {
  // Código de la ruta protegida
  res.send('Esta es una ruta protegida.');
});

module.exports = router;
