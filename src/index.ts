import express from 'express';
import cors from 'cors';
import administradorRouter from './routes/administrador.routes';
import imagenvehiculoRouter from './routes/imagenvehiculo.routes';
import vehiculoRouter from './routes/vehiculo.routes'
import GetConnection from './config/connection';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const PORT = 3000;

app.use('/api/administrador', administradorRouter);
app.use('/api/imagenvehiculo', imagenvehiculoRouter);
app.use('/api/vehiculo', vehiculoRouter);

app.get("/test", async (req, res) => {
    try {
        const conn = await GetConnection();
        const result = await conn.request().query("SELECT 1 AS test");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send("Error al conectar con la base de datos");
    }
});


app.listen(PORT, () => {
    console.log(`Servidor escuchan el puerto ${PORT}`)
})