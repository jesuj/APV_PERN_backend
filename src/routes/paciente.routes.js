import { Router } from "express";
import { obtenerPacientes, agregarPaciente, obtenerPaciente, actualizarPaciente, eliminarPaciente } from "../controllers/paciente.controller.js";
import checkAuth from '../middleware/auth.middleware.js'
const router = Router();

router.route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes)

router.route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router;