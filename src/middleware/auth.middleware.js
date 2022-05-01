import jwt from "jsonwebtoken";
import {Veterinario} from '../models/Veterinario.js'

const checkAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.veterinario = await Veterinario.findAll({
                where:{id:decoded.id}, attributes: { exclude: ['password','token','confirmado'] }
            });
            return next();
        } catch (e) {
            const error = new Error('Token no Valido');
            return res.status(403).json({ msg: error.message })
        }
    }
    const error = new Error('Token no Valido o inexistente');
    res.status(403).json({ msg: error.message })
    next();
}

export default checkAuth;