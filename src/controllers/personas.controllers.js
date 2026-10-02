import { pool } from "../conexion.js";

export const getPersonas = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM tbl_personas");
  res.json(rows);
};

export const getPersona = async (req, res) => {
  const { id } = req.params;
  const {rows} = await pool.query("SELECT * FROM tbl_personas WHERE fld_id = $1", [id]);
  if (rows.length === 0){
    return res.status(404).json({message: "Persona no encontrada"});
  }
  res.json(rows[0]);
}

export const postPersona = async (req, res) => {
  const data = req.body;
  const {rows} = await pool.query("INSERT INTO tbl_personas (fld_nombre, fld_apellido, fld_fechanac, fld_colectivoid) VALUES ($1, $2, $3, $4) RETURNING *", [data.nombre, data.apellido, data.fechanac, data.colectivoid]);

  return res.status(201).json(rows[0]);
}

export const deletePersona = async (req, res) => {
  const { id } = req.params;
  const{rowCount}=await pool.query("DELETE FROM tbl_personas WHERE fld_id = $1 RETURNING *", [id]);
  if (rowCount === 0){
    return res.status(404).json({message: "Persona no encontrada"});
  }
  return res.sendStatus(204);
}

export const putPersona = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const {rows} = await pool.query("UPDATE tbl_personas SET fld_nombre = $1, fld_apellido = $2, fld_fechanac = $3, fld_colectivoid =$4 WHERE fld_id = $5 RETURNING *", [data.nombre, data.apellido, data.fechanac, data.colectivoid, id]);
  if (rows.length === 0){
    return res.status(404).json({message: "Persona no encontrada"});
  }
  return res.json(rows[0]);
}