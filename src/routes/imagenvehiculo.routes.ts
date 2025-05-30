import express from 'express'
import * as imagenvehiculoController from '../controllers/imagenvehiculo.controller';
import { Imagenvehiculo } from '../models/imagenvehiculo';

const router = express.Router();

router.get('/', (req, res) => {
    imagenvehiculoController.listarImagenvehiculos()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send();
        })
});

router.post('/add', (req, res) => {
    imagenvehiculoController.CrearImagenvehiculo(req.body as Imagenvehiculo)
        .then((f) => {
            if (f)
                res.status(201).send();
            else
                res.status(500).send();
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send();
        })
});

router.delete('/:id', (req, res) => { // QUITAMOS 'async' AQUÍ
    // --- LOG DE DEPURACIÓN EN EL ROUTER ---
    console.log("DEBUG BACKEND (Router DELETE): Petición DELETE recibida.");
    console.log("DEBUG BACKEND (Router DELETE): ID de la URL (req.params.id):", req.params.id);
    // -------------------------------------

    // Llamamos a la función del controlador y manejamos la Promesa con .then() y .catch()
    imagenvehiculoController.EliminarImagenvehiculo(req.params.id)
        .then((success) => {
            if (success) {
                // --- LOG DE DEPURACIÓN EN EL ROUTER ---
                console.log("DEBUG BACKEND (Router DELETE): Imagen eliminada con éxito.");
                // -------------------------------------
                res.status(202).send(); // Código de estado 202 Accepted para indicar que la solicitud ha sido aceptada para su procesamiento.
            } else {
                // --- LOG DE DEPURACIÓN EN EL ROUTER ---
                console.log("DEBUG BACKEND (Router DELETE): La eliminación de la imagen devolvió 'false'.");
                // -------------------------------------
                res.status(500).send(); // Indica que no se pudo eliminar por una razón desconocida (el DAO devolvió false)
            }
        }).catch((e) => {
            // --- LOG DE ERROR EN EL ROUTER ---
            console.error("ERROR BACKEND (Router DELETE - BLOQUE CATCH):", e); // Registra el error completo
            // --------------------------------
            res.status(500).json({ // Envía un mensaje de error más descriptivo
                message: 'Error interno del servidor al eliminar la imagen.',
                error: e.message || 'Error desconocido',
                detallesErrorSQL: e.originalError?.info?.message // Si hay detalles de SQL, envíalos
            });
        });
});

router.put('/:id', (req, res) => {
    if (req.params.id != (req.body as Imagenvehiculo).IdImagen.toString()) {
        res.status(400).send();
    } else {
        imagenvehiculoController.ActualizarImagenvehiculo(req.body as Imagenvehiculo, req.params.id)
            .then((f) => {
                if (f)
                    res.status(202).send();
                else
                    res.status(500).send();
            }).catch((e) => {
                console.log(e);
                res.status(500).send();
            });
    }
})

router.get('/vehiculo/:idVehiculo', (req, res) => {
    imagenvehiculoController.listarImagenesPorVehiculo(req.params.idVehiculo)
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send();
        });
});

export default router;