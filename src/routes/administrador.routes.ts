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
});


router.post('/login', (req, res) => { // La definición de la ruta sigue sin 'async'
    const { Nombre, Contrasena } = req.body;

    // --- LOGS DE DEPURACIÓN EN EL ROUTER ---
    console.log("DEBUG BACKEND (Router Login): Petición POST /login recibida.");
    console.log("DEBUG BACKEND (Router Login): Nombre recibido:", Nombre);
    console.log("DEBUG BACKEND (Router Login): Contraseña recibida:", Contrasena);
    // -------------------------------------

    if (!Nombre || !Contrasena) {
        console.log("DEBUG BACKEND (Router Login): Error 400 - Nombre de usuario o contraseña faltantes.");
        return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos.' });
    }

    // --- ¡¡AQUÍ ESTÁ LA CORRECCIÓN!! ---
    // Llamamos a la función del controlador por su nombre completo: administradorController.IniciarSesion
    // y manejamos la Promesa que esta función devuelve con .then() y .catch().
    // La función IniciarSesion del controlador DEBE ser 'async' para que esto funcione correctamente,
    // ya que ella misma usará 'await' para esperar el resultado del DAO.
    administradorController.IniciarSesion(Nombre, Contrasena)
        .then((administrador) => {
            if (administrador) {
                console.log("DEBUG BACKEND (Router Login): Inicio de sesión exitoso para:", administrador.Nombre);
                res.json(administrador);
            } else {
                console.log("DEBUG BACKEND (Router Login): Fallo en el inicio de sesión - Credenciales incorrectas.");
                res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos.' });
            }
        }).catch((e) => {
            console.error("ERROR BACKEND (Router Login - BLOQUE CATCH):", e);
            res.status(500).json({
                message: 'Error interno del servidor al iniciar sesión.',
                error: e.message || 'Error desconocido'
            });
        });
});


export default router;