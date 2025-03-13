import express from 'express'
import * as administradorController from '../controllers/administrador.controller';
import { Administrador } from '../models/administrador';

const router = express.Router();

router.get('/', (req, res) => {
    administradorController.listarAdministradores()
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send();
        })
});

router.post('/add', (req, res) => {
    administradorController.CrearAdministrador(req.body as Administrador)
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
    administradorController.EliminarAdministrador(req.params.id)
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
    if (req.params.id != (req.body as Administrador).Idadminstrador.toString()) {
        res.status(400).send();
    } else {
        administradorController.ActualizarAdministrador(req.body as Administrador, req.params.id)
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

export default router;