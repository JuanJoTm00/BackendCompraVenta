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

export const CrearImagenvehiculo = async (Imagenvehiculo: Imagenvehiculo): Promise<boolean> => {
    try {
        return await imagenvehiculoDAo.Agregar(Imagenvehiculo);
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

export const listarImagenesPorVehiculo = async (idVehiculo: string): Promise<Imagenvehiculo[]> => {
    try {
        let id = parseInt(idVehiculo);
        return await imagenvehiculoDAo.ListarPorVehiculo(id);
    } catch (error) {
        throw error;
    }
};
