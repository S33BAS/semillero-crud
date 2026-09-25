const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'db_prueba',
  user: 'postgres',
  password: 'admi'
})

async function verPersonas() {
  await client.connect()
  const res = await client.query('SELECT * FROM tbl_personas')
  console.log(res.rows)
  await client.end()
}

async function crearPersona(nombre, apellido,fecha_nacimiento,colectivo,) {
    await client.connect()
    const res = await client.query('INSERT INTO tbl_personas(fld_nombre, fld_apellido,fld_fechanac,fld_colectivoid) VALUES($1,$2,$3,$4) RETURNING *', [nombre, apellido, fecha_nacimiento,colectivo])
    console.log(res.rows[0]) 
    await client.end()
}


async function actualizarPersona(id, nombre, apellido, fecha_nacimiento, colectivo) {
    await client.connect()
    const res = await client.query('UPDATE tbl_personas SET fld_nombre=$1, fld_apellido=$2, fld_fechanac=$3, fld_colectivoid=$4, updated_at = now() WHERE fld_id=$5 RETURNING *', [nombre, apellido, fecha_nacimiento, colectivo, id])
    console.log(res.rows[0]) 
    await client.end()
}

async function eliminarPersona(id) {
    await client.connect()
    const res = await client.query('DELETE FROM tbl_personas WHERE fld_id=$1 RETURNING *', [id])
    console.log(res.rows[0]) 
    await client.end()
}


