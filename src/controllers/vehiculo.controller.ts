import { vehiculo } from "../models/vehiculo";
import * as vehiculoDao from "../dao/vehiculo.dao"

export const listarVehiculos = async (): Promise<vehiculo[]> => {
    try {
        let u: vehiculo[] = await vehiculoDao.Listar();
        //BUSSINESS
        return u;
    } catch (error) {
        throw error;
    }
}

export const CrearVehiculo = async (vehiculo: vehiculo): Promise<boolean> => {
    try {
        return await vehiculoDao.Agregar(vehiculo);
    } catch (error) {
        throw error;
    }
}

export const EliminarVehiculo = async (id: string): Promise<boolean> => {
    try {
        let obj = parseInt(id);
        return vehiculoDao.Eliminar(obj);
    } catch (error) {
        throw error;
    }
}

export const ActualizarVehiculo = async (usr: vehiculo, id: string): Promise<boolean> => {
    try {
        return await vehiculoDao.Editar(usr, parseInt(id));
    } catch (error) {
        throw error;
    }
}