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

router.delete('/:id', (req, res) => {
    imagenvehiculoController.EliminarImagenvehiculo(req.params.id)
        .then((f) => {
            if (f)
                res.status(202).send();
            else
                res.status(500).send();
        }).catch((e) => {
            console.log(e);
            res.status(500).send();
        })
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