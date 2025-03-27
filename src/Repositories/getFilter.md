Aquí tienes una función `getVideogames` en Prisma que soporta:  

✅ **Paginación** (con `page` y `limit`)  
✅ **Búsqueda por nombre** (`ilike`, insensible a mayúsculas/minúsculas)  
✅ **Filtros** (`price`, `physicalGame`, `enable`)  
✅ **Ordenación** (por `price`, `released`, etc.)  

---

### **Código de la función**
```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getVideogames({ search, filters = {}, sortBy = 'released', order = 'desc', page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;

  const where = {
    name: search ? { contains: search, mode: 'insensitive' } : undefined, // Búsqueda ilike
    price: filters.price ? { gte: filters.price.min, lte: filters.price.max } : undefined,
    physicalGame: filters.physicalGame !== undefined ? filters.physicalGame : undefined,
    enable: filters.enable !== undefined ? filters.enable : true, // Solo activos por defecto
  };

  const videogames = await prisma.videogame.findMany({
    where,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });

  const total = await prisma.videogame.count({ where });

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data: videogames,
  };
}
```

---

### **Ejemplo de uso**
```javascript
const filters = {
  price: { min: 10, max: 50 },
  physicalGame: true,
};

const result = await getVideogames({
  search: 'Mario', // Busca juegos con "Mario" en el nombre
  filters,
  sortBy: 'price', // Ordenar por precio
  order: 'asc', // Ascendente
  page: 2, // Página 2
  limit: 5, // 5 resultados por página
});

console.log(result);
```

---

### **Explicación de la Función**
1. **Paginación**  
   - `page` y `limit` definen la cantidad de elementos y en qué página estás.  
   - `skip` determina cuántos elementos saltar (offset).  

2. **Búsqueda (`ilike`)**  
   - Usa `contains` con `mode: 'insensitive'` para hacer una búsqueda similar a `ILIKE`.  

3. **Filtros**  
   - **Precio**: Filtra por un rango (`gte`, `lte`).  
   - **`physicalGame`**: Si se especifica, filtra por juegos físicos o digitales.  
   - **`enable`**: Por defecto, solo devuelve los habilitados.  

4. **Ordenación**  
   - Se puede ordenar dinámicamente por `price`, `released`, etc.  
   - `order: 'asc'` o `'desc'` define el orden.  

---

💡 **¿Necesitas agregar más filtros o personalizarlo?** ¡Dímelo y lo ajustamos! 🚀
<hr>

### Hacerla reutilizable

Sí, podemos hacer la función **totalmente reutilizable** para cualquier modelo en Prisma.  

Esta versión:  
✅ **Funciona con cualquier modelo** (ej. `videogame`, `user`, `product`)  
✅ **Permite búsqueda, filtros, orden y paginación**  
✅ **Es fácil de extender** 🚀  

---

### **🔥 Función Reutilizable**
```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Función para obtener registros con búsqueda, filtros, orden y paginación.
 * @param {string} model - El modelo de Prisma a consultar.
 * @param {object} options - Opciones de consulta.
 * @param {string} [options.search] - Texto de búsqueda (aplica a 'name' si existe).
 * @param {object} [options.filters] - Filtros personalizados.
 * @param {string} [options.sortBy] - Campo por el que se ordena (ej. 'price', 'released').
 * @param {string} [options.order] - Orden de clasificación ('asc' o 'desc').
 * @param {number} [options.page] - Número de página.
 * @param {number} [options.limit] - Cantidad de registros por página.
 * @returns {Promise<object>} - Objeto con los datos paginados.
 */
export async function getRecords(model, { search, filters = {}, sortBy = 'id', order = 'desc', page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;

  // Construimos el filtro de búsqueda
  const searchFilter = search ? { name: { contains: search, mode: 'insensitive' } } : {};

  // Combinamos filtros personalizados con búsqueda
  const where = { ...searchFilter, ...filters };

  // Ejecutamos la consulta dinámica
  const data = await prisma[model].findMany({
    where,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });

  // Contamos el total de registros
  const total = await prisma[model].count({ where });

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data,
  };
}
```

---

### **🔥 Ejemplo de Uso**
```javascript
const filters = {
  price: { gte: 10, lte: 50 },
  enable: true,
};

const result = await getRecords('videogame', {
  search: 'Mario',  // Busca "Mario" en el nombre
  filters,
  sortBy: 'price',   // Ordena por precio
  order: 'asc',      // Ascendente
  page: 1,           // Primera página
  limit: 5,          // 5 registros por página
});

console.log(result);
```

---

### **✅ Ventajas de esta versión**
1. **Funciona con cualquier modelo** (`videogame`, `user`, `product`, etc.).  
2. **Filtros dinámicos**, fáciles de modificar.  
3. **Soporta búsqueda (`ILIKE`)** en `name`.  
4. **Paginación y ordenación flexible**.  
5. **Código limpio y reutilizable**.  

💡 **¿Quieres mejorarla más?** Podemos hacerla aún más flexible si lo necesitas. 🚀