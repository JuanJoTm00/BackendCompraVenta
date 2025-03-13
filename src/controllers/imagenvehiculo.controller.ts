import { Imagenvehiculo } from "../models/imagenvehiculo";
import * as imagenvehiculoDAo from "../dao/imagenvehiculo.dao"

export const listarImagenvehiculos = async (): Promise<Imagenvehiculo[]> => {
    try {
        let u: Imagenvehiculo[] = await imagenvehiculoDAo.Listar();
        //BUSSINESS
        return u;
    } catch (error) {
        throw error;
    }
}

export const CrearImagenvehiculo = async (vehiculo: Imagenvehiculo): Promise<boolean> => {
    try {
        return await imagenvehiculoDAo.Agregar(vehiculo);
    } catch (error) {
        throw error;
    }
}

export const EliminarImagenvehiculo = async (id: string): Promise<boolean> => {
    try {
        let obj = parseInt(id);
        return imagenvehiculoDAo.Eliminar(obj);
    } catch (error) {
        throw error;
    }
}

export const ActualizarImagenvehiculo = async (usr: Imagenvehiculo, id: string): Promise<boolean> => {
    try {
        return await imagenvehiculoDAo.Editar(usr, parseInt(id));
    } catch (error) {
        throw error;
    }
}