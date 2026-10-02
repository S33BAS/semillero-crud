# API de Personas — Semillero

API REST para gestionar personas y su clasificación por colectivo
(niño, adolescente, adulto). Construida como prueba de concepto para
evaluar Node.js y Prisma ORM en el proyecto del semillero.

## Stack

- **Node.js** + **Express 5**
- **PostgreSQL**
- **Prisma 7** como ORM, con el adaptador `@prisma/adapter-pg`
- **morgan** para el registro de peticiones

## Requisitos

- [Node.js](https://nodejs.org) 18 o superior
- [PostgreSQL](https://www.postgresql.org/download/) 14 o superior

Probado con Node 26 y PostgreSQL 18.

## Instalación

**1. Clonar el repositorio**

```bash
git clone https://github.com/S33BAS/semillero-crud.git
cd semillero-crud
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Crear la base de datos**

Desde pgAdmin o psql:

```sql
CREATE DATABASE db_prueba;
```

**4. Crear las tablas**

```bash
psql -U postgres -d db_prueba -f db/schema.sql
```

**5. Cargar los colectivos**

```bash
psql -U postgres -d db_prueba -f db/seed.sql
```

Sin este paso no se puede crear ninguna persona: la llave foránea
`fld_colectivoid` exige que el colectivo exista.

**6. Configurar las variables de entorno**

Copiar `.env.example` a `.env` y completar la cadena de conexión
(ver la sección siguiente).

**7. Generar el cliente de Prisma**

```bash
npx prisma generate
```

> **Importante:** este paso no se puede saltar. El cliente de Prisma
> se genera dentro de `node_modules`, que no se sube al repositorio.
> Si se omite, el servidor falla al arrancar con un error que no deja
> claro que falta este comando.

**8. Arrancar**

```bash
npm run dev
```

El servidor queda escuchando en `http://localhost:3000`.

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/db_prueba"
```

El formato es `postgresql://usuario:contraseña@host:puerto/basededatos`.

El archivo `.env` está en `.gitignore` y no debe subirse al repositorio.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Arranca con recarga automática al guardar |
| `npm start` | Arranca sin recarga (producción) |

## Endpoints

Base: `http://localhost:3000`

| Método | Ruta | Qué hace | Éxito | Error |
|---|---|---|---|---|
| GET | `/personas` | Lista todas las personas | 200 | — |
| GET | `/personas/:id` | Trae una persona | 200 | 404 |
| POST | `/personas` | Crea una persona | 201 | — |
| PUT | `/personas/:id` | Actualiza una persona | 200 | 404 |
| DELETE | `/personas/:id` | Elimina una persona | 200 | 404 |

### Body de POST y PUT

```json
{
  "nombre": "Camilo",
  "apellido": "Martinez",
  "fechanac": "2014-03-25",
  "colectivoid": 1
}
```

`colectivoid` debe corresponder a un colectivo existente
(1 = niño, 2 = adolescente, 3 = adulto). Si no existe, la petición falla.

### Respuesta

```json
{
  "fld_id": 3,
  "fld_nombre": "Camilo",
  "fld_apellido": "Martinez",
  "fld_fechanac": "2014-03-25T00:00:00.000Z",
  "fld_colectivoid": 1,
  "created_at": "2026-09-24T17:18:01.876Z",
  "updated_at": "2026-10-02T03:37:17.419Z"
}
```

## Modelo de datos

```
tbl_colectivos
  fld_id       INTEGER       PK
  fld_nombre   VARCHAR(50)   NOT NULL

tbl_personas
  fld_id           SERIAL        PK
  fld_nombre       VARCHAR(50)   NOT NULL
  fld_apellido     VARCHAR(50)   NOT NULL
  fld_fechanac     DATE          NOT NULL
  fld_colectivoid  INTEGER       NOT NULL  → tbl_colectivos(fld_id)
  created_at       TIMESTAMPTZ   DEFAULT now()
  updated_at       TIMESTAMPTZ   DEFAULT now()
```

`updated_at` se actualiza automáticamente mediante el atributo
`@updatedAt` del modelo de Prisma. Esto solo funciona cuando el
cambio pasa por Prisma: una edición hecha directamente en la base
de datos no actualiza la columna. Para garantizarlo en todos los
casos haría falta un trigger en PostgreSQL.

## Estructura del proyecto

```
src/
  index.js                          servidor, middlewares y rutas
  prisma.js                         cliente de Prisma
  routes/
    personas.routes.js              definición de rutas
  controllers/
    personas.controllers.js         lógica de cada operación
prisma/
  schema.prisma                     modelos generados desde la base
db/
  schema.sql                        creación de tablas
  seed.sql                          colectivos iniciales
```
