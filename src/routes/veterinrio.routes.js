import {Router} from 'express';
import {registrar, perfil,confirmar,autenticar, actualizarPassword, olvidePassword,comprobarToken,nuevoPassword,actualizarPerfil} from '../controllers/veterinario.controller.js'
import checkAuth from '../middleware/auth.middleware.js'

const router = Router();
// Area Publico
router.post('/',registrar)
router.get("/confirmar/:token",confirmar)
router.post("/login",autenticar)
router.post('/olvide-password',olvidePassword);
// router.get('/olvide-pasword/:token',comprobarToken);
// router.post('/olvide-pasword/:token',nuevoPassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

// Area privada
router.get('/perfil',checkAuth,perfil)
router.put('/perfil/:id',checkAuth,actualizarPerfil)
router.put('/actualizar-password',checkAuth,actualizarPassword)

export default router;