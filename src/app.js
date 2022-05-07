import express from 'express'
import veterinarioRoutes from './routes/veterinrio.routes.js'
import pacienteRoutes from './routes/paciente.routes.js';
import cors from 'cors';

const app = express();

app.use(express.json())

const dominiosPermitidos = [process.env.FONTEND_URL];

const corsOptions = {
    origin: function (origin, callback){
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null,true);
        }else {
            callback(new Error('no permitido por cors'))
        }
    }
}

app.use(cors(corsOptions));

app.use('/api/veterinarios',veterinarioRoutes)
app.use('/api/pacientes',pacienteRoutes)

export default app;