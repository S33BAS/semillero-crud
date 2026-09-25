const pool = require('./conexion')

const app = express()
app.use(express.json())

async function verPersonas() {
  
  const res = await pool.query('SELECT * FROM tbl_personas')
  console.log(res.rows)
  
}

async function crearPersona(nombre, apellido,fecha_nacimiento,colectivo,) {
    
    const res = await pool.query('INSERT INTO tbl_personas(fld_nombre, fld_apellido,fld_fechanac,fld_colectivoid) VALUES($1,$2,$3,$4) RETURNING *', [nombre, apellido, fecha_nacimiento,colectivo])
    console.log(res.rows[0]) 
    
}


async function actualizarPersona(id, nombre, apellido, fecha_nacimiento, colectivo) {
    
    const res = await pool.query('UPDATE tbl_personas SET fld_nombre=$1, fld_apellido=$2, fld_fechanac=$3, fld_colectivoid=$4, updated_at = now() WHERE fld_id=$5 RETURNING *', [nombre, apellido, fecha_nacimiento, colectivo, id])
    console.log(res.rows[0]) 
    
}

async function eliminarPersona(id) {
    
    const res = await pool.query('DELETE FROM tbl_personas WHERE fld_id=$1 RETURNING *', [id])
    console.log(res.rows[0]) 
    
}
