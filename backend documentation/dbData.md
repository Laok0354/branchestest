# Documentación de Ruta de la API - Obtener Habilidades

Este documento proporciona una descripción de la ruta de la API que obtiene información sobre habilidades. La ruta utiliza Prisma para interactuar con la base de datos y devuelve un conjunto de habilidades en formato JSON. Fue implementada para que el front end muestre las posibles skills sin tener que ser actualizado manualmente.

## Ruta

### `GET /skills`

- **Descripción:** Obtiene la lista de habilidades desde la base de datos.
- **Middleware:** Ninguno.
- **Respuesta:**
  - Éxito:
    - Estado: 200
    - JSON con la lista de habilidades, cada habilidad contiene `id` y `name`.
  - Falla:
    - Estado: 400
    - JSON con un mensaje de error si no se encuentran habilidades.

## Funcionalidad

- La ruta utiliza la instancia de `PrismaClient` para realizar una consulta y obtener todas las habilidades de la base de datos.
- Utiliza la función `findMany` de Prisma para seleccionar solo las propiedades `id` y `name` de cada habilidad.
- Verifica si se encontraron habilidades. Si no hay habilidades, devuelve un estado de error 400 con un mensaje adecuado.
- Si se encuentran habilidades, devuelve un estado 200 con la lista de habilidades en formato JSON.

## Dependencias

- `express`: Marco web para Node.js.
- `@prisma/client`: Cliente Prisma para interacciones con la base de datos.

## Uso

Este script se puede usar como una ruta en una aplicación Express.js. Por ejemplo:

```javascript
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Ruta para obtener habilidades
router.get('/skills', async (req, res) => {
  // Código de la ruta para obtener habilidades
});

module.exports = router;
