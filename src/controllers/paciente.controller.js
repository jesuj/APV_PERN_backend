import { Paciente } from '../models/Paciente.js'

export const agregarPaciente = async (req, res) => {
    try {
        const { id: veterinarioId } = req.veterinario;
        console.log("este es el id = ", veterinarioId)
        const paciente = await Paciente.create({ ...req.body, veterinarioId })
        res.json(paciente);
    } catch (error) {
        console.log(error)
    }
}
export const obtenerPacientes = async (req, res) => {
    try {
        const { id: veterinarioId } = req.veterinario;
        const pacientes = await Paciente.findAll({
            where: {
                veterinarioId
            }
        })
        res.json(pacientes)
    } catch (error) {
        console.log(error)
    }
}

export const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findByPk(id);
        if (!paciente) {
            return res.json({ msg: 'Paciente no encontrado' })
        }
        if (paciente.veterinarioId != req.veterinario.id) {
            return res.json({ msg: 'Accion no valida' })
        }
        res.json(paciente)
    } catch (error) {
        console.log(error)
    }
}
export const actualizarPaciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
        return res.json({ msg: 'Paciente no encontrado' })
    }
    if (paciente.veterinarioId != req.veterinario.id) {
        return res.json({ msg: 'Accion no valida' })
    }
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;
    try {
        const pacienteActualizado = await paciente.save()
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error)
    }
}
export const eliminarPaciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
        return res.json({ msg: 'Paciente no encontrado' })
    }
    if (paciente.veterinarioId != req.veterinario.id) {
        return res.json({ msg: 'Accion no valida' })
    }

    try {
        await paciente.destroy({
            where: { id}
        })
        res.json({msg: "Paciente Eliminado"})
    } catch (error) {
        console.log(error)
    }

}