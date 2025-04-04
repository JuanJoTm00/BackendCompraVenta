import GetConnection from "../config/connection";
import { Administrador } from "../models/administrador";

export const Listar = async (): Promise<Administrador[]> => {
    try {
        let tsql = "SELECT * FROM Administrador";
        const pool = await GetConnection();
        let rs = await pool.query<Administrador>(tsql);
        if (rs != undefined) {
            return rs.recordset;
        }
        return [];
    } catch (error) {
        throw error;
    }
}

export const Agregar = async (Administrador: Administrador): Promise<boolean> => {
    try {
        let tsql = `INSERT INTO Administrador(Nombre,Email,Contrasena) VALUES('${Administrador.Nombre}','${Administrador.Email}','${Administrador.Contrasena}')`;
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
        let tsql = `DELETE FROM Administrador WHERE idadminstrador=${id}`;
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

export const Editar = async (usr: Administrador, id: number): Promise<boolean> => {
    try {
        let tsql = `UPDATE dbo.Administrador SET Nombre='${usr.Nombre}', Email='${usr.Email}',Contrasena='${usr.Contrasena}' WHERE Idadminstrador=${id}`;
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

export const IniciarSesion = async (Nombre: string, contrasena: string): Promise<Administrador | null> => {
    try {
        const tsql = `
            SELECT * FROM Administrador 
            WHERE Nombre = @Nombre AND Contrasena = @Contrasena`;
        const pool = await GetConnection();
        const request = pool.request();
        
 
        request.input('Usuario', Nombre);
        request.input('Contrasena', contrasena);

        const rs = await request.query(tsql);

        return rs.recordset.length > 0 ? rs.recordset[0] : null;
    } catch (error) {
        throw error; 
    }
}