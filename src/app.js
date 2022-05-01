import express from 'express'
import veterinarioRoutes from './routes/veterinrio.routes.js'
import pacienteRoutes from './routes/paciente.routes.js';

const app = express();

app.use(express.json())

app.use('/api/veterinarios',veterinarioRoutes)
app.use('/api/pacientes',pacienteRoutes)

export default app;