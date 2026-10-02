import express from "express";
import personasRoutes from "./routes/personas.routes.js";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(personasRoutes);

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
