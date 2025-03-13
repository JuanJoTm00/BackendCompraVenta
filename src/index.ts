import express from 'express';
import cors from 'cors';
import administradorRouter from './routes/administrador.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const PORT = 3000;

app.use('/api/usuario', administradorRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchan el puerto ${PORT}`)
})