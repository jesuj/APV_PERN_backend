import express from 'express'
import veterinarioRoutes from './routes/veterinrio.routes.js'


const app = express();

app.use(express.json())

app.use('/api/veterinario',veterinarioRoutes)

export default app;