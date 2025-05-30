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
        // ***** CONSOLE.LOGS AÑADIDOS EN EL BACKEND - DAO *****
        console.log("DEBUG BACKEND (DAO): Objeto Imagenvehiculo recibido:", Imagenvehiculo);
        console.log("DEBUG BACKEND (DAO): Tipo de Imagenvehiculo.IdVehiculo:", typeof Imagenvehiculo.IdVehiculo);
        console.log("DEBUG BACKEND (DAO): Valor de Imagenvehiculo.IdVehiculo:", Imagenvehiculo.IdVehiculo);
        // ****************************************************

        let tsql = `INSERT INTO Imagenvehiculo(IdVehiculo,UrlImagen) VALUES(${Imagenvehiculo.IdVehiculo},'${Imagenvehiculo.UrlImagen}')`;

        // ***** CONSOLE.LOG AÑADIDO EN EL BACKEND - DAO *****
        console.log("DEBUG BACKEND (DAO): SQL a ejecutar:", tsql);
        // **************************************************

        const pool = await GetConnection();
        let rs = await pool.query(tsql);
        if (rs != undefined) {
            return rs.rowsAffected.length == 1;
        }
        return false;
    } catch (error) {
        // ***** CONSOLE.ERROR AÑADIDO EN EL BACKEND - DAO *****
        console.error("ERROR BACKEND (DAO): Error al agregar Imagenvehiculo:", error);
        // ****************************************************
        throw error;
    }
}

export const Eliminar = async (IdImagen: number): Promise<boolean> => {
    try {
        let tsql = `DELETE FROM Imagenvehiculo WHERE IdImagen=${IdImagen}`;
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

export const Editar = async (img: Imagenvehiculo, id: number): Promise<boolean> => { // Cambiado 'usr' a 'img' para mayor claridad
    try {
        let tsql = `UPDATE Imagenvehiculo SET IdVehiculo=${img.IdVehiculo}, UrlImagen='${img.UrlImagen}' WHERE IdImagen=${id}`; // Corregido 'magenvehiculo' y comillas
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
