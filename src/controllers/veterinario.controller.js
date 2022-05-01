import generarWT from "../helpers/generarJWT.js"
import { Veterinario } from "../models/Veterinario.js"
import generarId from "../helpers/generarId.js"
export const registrar = async (req,res) =>{
    // console.log(req.body)
    const {email} = req.body
    // Prevenir Usuario Duplicado
    const existeUsuario = await Veterinario.findOne({
        where: {email}
    })
    if (existeUsuario) {
        const error = new Error('Usuario ya Registrado')
        return res.status(400).json({msg:error.message});
    }
    try {
        const veterinario = await Veterinario.create(req.body);
        res.json(veterinario);
    } catch (error) {
        console.log(error)
    }
}

export const perfil = (req,res) => {
    const {veterinario} = req;
    res.json({ perfil: veterinario})
}

export const confirmar = async (req, res) => {
    const {token} = req.params;
    const usuarioConfirmar = await Veterinario.findOne({where: {token}})
    if (!usuarioConfirmar) {
        const error = new Error('Token no valido');
        return res.status(404).json({msg:error.message})
    }
    try {
        usuarioConfirmar.token=null;
        usuarioConfirmar.confirmado=true;
        await usuarioConfirmar.save();
        res.json({msg: "Usuario Confirmado Correo"})
    } catch (error) {
        console.log(error)
    }
}

export const autenticar= async (req, res) => {
    const {email,password} = req.body
    const usuario = await Veterinario.findOne({where: {email}})
    if (!usuario) {
        const error = new Error('El Usuario no existe')
        return res.status(403).json({msg: error.message})
    }
    if (!usuario.confirmado) {
        const error = new Error('Tu Cuenta no ha sido confirmado');
        return res.status(403).json({msg: error.message})
    }
    if (await usuario.comprobarPassword(password)) {       
        res.json({token: generarWT(usuario.id)})
    }else{
        const error = new Error('El password incorrect');
        return res.status(403).json({msg: error.message})
    }
}

export const olvidePassword= async (req,res) => {
    const {email} = req.body;
    const existeVeterinario = await Veterinario.findOne({where: { email}})
    if (!existeVeterinario) {
        const error = new Error('El Usuario no existe');
        return res.status(400).json({error: error.message});
    }
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        res.json({msg: 'Hemos enviado un email con las instrucciones'})
    } catch (error) {
        console.log(error)
    }
}
export const comprobarToken= async (req,res) => {
    const {token} = req.params;
    const tokenValido = await Veterinario.findOne({where: {token}});
    if (tokenValido) {
        res.json({msg:'Token valido y el usuario existe'})
    }else{
        const error = new Error('Token no valido')
        return res.status(400).json({msg: error.message})
    }
}
export const nuevoPassword=async(req,res) => {
    const {token} = req.params
    const {password} = req.body
    const veterinario = await Veterinario.findOne({where: {token}})
    if (!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }

    try {
        veterinario.token = null
        veterinario.password = password
        await veterinario.save();
        res.json({msg: 'Password modificado correctamente'})
    } catch (error) {
        console.log(error)
    } 
}