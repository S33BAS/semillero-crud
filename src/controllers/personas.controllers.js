import { prisma } from "../prisma.js";

export const getPersonas = async (req, res) => {
  const personas = await prisma.tbl_personas.findMany();
  res.json(personas);
};

export const getPersona = async (req, res) => {
  const { id } = req.params;
  const persona = await prisma.tbl_personas.findUnique({
    where: { fld_id: Number(id) },
  });
  if (!persona) {
    return res.status(404).json({ message: "Persona no encontrada" });
  }
  res.json(persona);
};

export const postPersona = async (req, res) => {
  const data = req.body;
  const persona = await prisma.tbl_personas.create({
    data: {
      fld_nombre: data.nombre,
      fld_apellido: data.apellido,
      fld_fechanac: new Date(data.fechanac),
      fld_colectivoid: data.colectivoid,
    },
  });

  return res.status(201).json(persona);
};

export const deletePersona = async (req, res) => {
  const { id } = req.params;

  try {
    const persona = await prisma.tbl_personas.delete({
      where: { fld_id: Number(id) },
    });
    return res.json({ message: "Persona eliminada correctamente" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Persona no encontrada" });
    }
    throw error;
  }
};

export const putPersona = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
      const persona = await prisma.tbl_personas.update({
    where: { fld_id: Number(id) },
    data: {
      fld_nombre: data.nombre,
      fld_apellido: data.apellido,
      fld_fechanac: new Date(data.fechanac),
      fld_colectivoid: data.colectivoid,
    },
  });
  res.json(persona);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Persona no encontrada" });
    }
    throw error;
  }
};
