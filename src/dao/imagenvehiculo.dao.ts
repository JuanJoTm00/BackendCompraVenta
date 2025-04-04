import GetConnection from "../config/connection";
import { Imagenvehiculo } from "../models/imagenvehiculo";

export const Listar = async (): Promise<Imagenvehiculo[]> => {
    try {
        let tsql = "SELECT * FROM Imagenvehiculo";
        const pool = await GetConnection();
        let rs = await pool.query<Imagenvehiculo>(tsql);
        if (rs != undefined) {
            return rs.recordset;
        }
        return [];
    } catch (error) {
        throw error;
    }
}

export const Agregar = async (Imagenvehiculo: Imagenvehiculo): Promise<boolean> => {
    try {
        let tsql = `INSERT INTO Imagenvehiculo(IdVehiculo,UrlImagen) VALUES('${Imagenvehiculo.IdVehiculo}','${Imagenvehiculo.UrlImagen}')`;
        const pool = await GetConnection();
        let rs = await pool.query(tsql);
        if (rs != undefined) {
            return rs.rowsAffected.length == 1;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

export const Eliminar = async (id: number): Promise<boolean> => {
    try {
        let tsql = `DELETE FROM Imagenvehiculo WHERE id=${id}`;
        const pool = await GetConnection();
        let rs = await pool.query(tsql);
        if (rs != undefined) {
            return rs.rowsAffected.length == 1;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

export const Editar = async (usr: Imagenvehiculo, id: number): Promise<boolean> => {
    try {
        let tsql = `UPDATE magenvehiculo SET IdVehiculo='${usr.IdVehiculo}', UrlImagen=${usr.UrlImagen}' WHERE id=${id}`;
        const pool = await GetConnection();
        let rs = await pool.query(tsql);
        if (rs != undefined) {
            return rs.rowsAffected.length == 1;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

export const ListarPorVehiculo = async (idVehiculo: number): Promise<Imagenvehiculo[]> => {
    try {
        let tsql = `SELECT * FROM Imagenvehiculo WHERE IdVehiculo = ${idVehiculo}`;
        const pool = await GetConnection();
        let rs = await pool.query<Imagenvehiculo>(tsql);
        return rs ? rs.recordset : [];
    } catch (error) {
        throw error;
    }
};
