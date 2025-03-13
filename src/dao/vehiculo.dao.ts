import GetConnection from "../config/connection";
import { vehiculo } from "../models/vehiculo";

export const Listar = async (): Promise<vehiculo[]> => {
    try {
        let tsql = "SELECT * FROM vehiculo";
        const pool = await GetConnection();
        let rs = await pool.query<vehiculo>(tsql);
        if (rs != undefined) {
            return rs.recordset;
        }
        return [];
    } catch (error) {
        throw error;
    }
}

export const Agregar = async (vehiculo: vehiculo): Promise<boolean> => {
    try {
        let tsql = `INSERT INTO vehiculo(Marca,Modelo,Ano,Kilometraje,Tipo,Descripcion,ImagenPrincipal) VALUES('${vehiculo.Marca}','${vehiculo.Modelo}','${vehiculo.Ano}','${vehiculo.Kilometraje}','${vehiculo.Tipo}','${vehiculo.Descripcion}','${vehiculo.ImagenPrincipal}')`;
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
        let tsql = `DELETE FROM Vehiculo WHERE id=${id}`;
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

export const Editar = async (usr: vehiculo, id: number): Promise<boolean> => {
    try {
        let tsql = `UPDATE vehiculo SET Marca='${usr.Marca}', Modelo=${usr.Modelo}',Ano=${usr.Ano}',Kilometraje=${usr.Kilometraje}',Tipo=${usr.Tipo}',Descripcion=${usr.Descripcion}',ImagenPrincipal=${usr.ImagenPrincipal}' WHERE id=${id}`;
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

