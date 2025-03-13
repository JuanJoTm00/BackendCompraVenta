import { Administrador } from "../models/administrador";
import * as AdministradorDao from "../dao/administrador.dao";

export const listarAdministradores = async (): Promise<Administrador[]> => {
    try {
        let u: Administrador[] = await AdministradorDao.Listar();
        //BUSSINESS
        return u;
    } catch (error) {
        throw error;
    }
}

export const CrearAdministrador = async (Administrador: Administrador): Promise<boolean> => {
    try {
        return await AdministradorDao.Agregar(Administrador);
    } catch (error) {
        throw error;
    }
}

export const EliminarAdministrador = async (id: string): Promise<boolean> => {
    try {
        let obj = parseInt(id);
        return AdministradorDao.Eliminar(obj);
    } catch (error) {
        throw error;
    }
}

export const ActualizarAdministrador = async (usr: Administrador, id: string): Promise<boolean> => {
    try {
        return await AdministradorDao.Editar(usr, parseInt(id));
    } catch (error) {
        throw error;
    }
}