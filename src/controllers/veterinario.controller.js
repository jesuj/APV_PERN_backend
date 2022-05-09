import generarWT from "../helpers/generarJWT.js"
import { Veterinario } from "../models/Veterinario.js"
import generarId from "../helpers/generarId.js"
import emailRegistro from "../helpers/emailRegistro.js"
import emailOlvidePassword from "../helpers/emailOlvidePassword.js"

export const registrar = async (req, res) => {
    // console.log(req.body)
    const { email, name } = req.body
    // Prevenir Usuario Duplicado
    const existeUsuario = await Veterinario.findOne({
        where: { email }
    })
    if (existeUsuario) {
        const error = new Error('Usuario ya Registrado')
        return res.status(400).json({ msg: error.message });
    }
    try {
        const veterinario = await Veterinario.create(req.body);
        emailRegistro({ email, name, token: veterinario.token })
        res.json(veterinario);
    } catch (error) {
        console.log(error)
    }
}

export const perfil = (req, res) => {
    const { veterinario } = req;
    res.json(veterinario)
}

export const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({ where: { token } })
    if (!usuarioConfirmar) {
        const error = new Error('Token no valido');
        return res.status(404).json({ msg: error.message })
    }
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        console.log('Guardado')
        res.json({ msg: "Usuario Confirmado Correo" })
    } catch (error) {
        console.log(error)
    }
}

export const autenticar = async (req, res) => {
    const { email, password } = req.body
    const usuario = await Veterinario.findOne({ where: { email } })
    if (!usuario) {
        const error = new Error('El Usuario no existe')
        return res.status(403).json({ msg: error.message })
    }
    if (!usuario.confirmado) {
        const error = new Error('Tu Cuenta no ha sido confirmado');
        return res.status(403).json({ msg: error.message })
    }
    if (await usuario.comprobarPassword(password)) {
        res.json({
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token: generarWT(usuario.id)
        })
    } else {
        const error = new Error('El password incorrect');
        return res.status(403).json({ msg: error.message })
    }
}

export const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const existeVeterinario = await Veterinario.findOne({ where: { email } })
    if (!existeVeterinario) {
        const error = new Error('El Usuario no existe');
        return res.status(400).json({ msg: error.message });
    }
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        //Enviar email con instrucciones
        emailOlvidePassword({ email, nombre: existeVeterinario.nombre, token: existeVeterinario.token })
        res.json({ msg: 'Hemos enviado un email con las instrucciones' })
    } catch (error) {
        console.log(error)
    }
}
export const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ where: { token } });
    if (tokenValido) {
        res.json({ msg: 'Token valido y el usuario existe' })
    } else {
        const error = new Error('Token no valido')
        return res.status(400).json({ msg: error.message })
    }
}
export const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    const veterinario = await Veterinario.findOne({ where: { token } })
    if (!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    }

    try {
        veterinario.token = null
        veterinario.password = password
        await veterinario.save();
        res.json({ msg: 'Password modificado correctamente' })
    } catch (error) {
        console.log(error)
    }
}

export const actualizarPerfil = async (req, res) => {
    const veterinario = await Veterinario.findByPk(req.params.id);
    if (!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    }
    const { email } = req.body;
    if (veterinario.email !== email) {
        const existeEmail = await Veterinario.findOne({ where: { email } })
        if (!existeEmail) {
            const error = new Error('Ese email ya existe');
            return res.status(400).json({ msg: error.message });
        }
    }
    try {
        veterinario.name = req.body.name;
        veterinario.email = req.body.email;
        veterinario.telefono = req.body.telefono;
        veterinario.web = req.body.web;
        await veterinario.save();
        res.json(veterinario);
    } catch (error) {
        console.log(error)
    }
}