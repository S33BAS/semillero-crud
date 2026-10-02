import { Router } from "express";
import { pool } from "../conexion.js";
import { getPersonas, getPersona, postPersona, putPersona, deletePersona } from "../controllers/personas.controllers.js";

const router = Router();

router.get("/personas",getPersonas);

router.get("/personas/:id",getPersona);

router.post("/personas", postPersona);

router.delete("/personas/:id", deletePersona);

router.put("/personas/:id",putPersona);

export default router