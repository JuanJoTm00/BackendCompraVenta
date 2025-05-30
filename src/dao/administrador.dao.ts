import GetConnection from "../config/connection";
import { Administrador } from "../models/administrador";
import sql from 'mssql';

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

export const IniciarSesion = async (nombre: string, contrasena: string): Promise<Administrador | null> => {
    try {
        const pool = await GetConnection(); // Obtén la conexión a la base de datos

        // Construye la consulta SQL o llama al procedimiento almacenado
        // ¡¡ESTO ES CLAVE!! Añadir los parámetros con .input()
        const result = await pool.request()
            .input('Nombre', sql.VarChar, nombre) // Declara @Nombre como VARCHAR
            .input('Contrasena', sql.VarChar, contrasena) // Declara @Contrasena como VARCHAR
            .query(`SELECT
                        Idadminstrador,
                        Nombre,
                        Email,
                        Contrasena
                    FROM
                        Administrador
                    WHERE
                        Nombre = @Nombre AND Contrasena = @Contrasena`); // Usa los parámetros declarados

        // Si tu modelo Administrador tiene más campos, asegúrate de seleccionarlos aquí.
        // Asumiendo que la consulta devuelve un solo resultado si las credenciales son correctas
        if (result.recordset.length > 0) {
            // Mapea el resultado al modelo Administrador
            const adminData = result.recordset[0];
            return {
                Idadminstrador: adminData.Idadminstrador,
                Nombre: adminData.Nombre,
                Email:adminData.Email,
                Contrasena: adminData.Contrasena,
                // Añade otros campos si los tienes en tu modelo y tabla
            };
        } else {
            return null; // No se encontró administrador con esas credenciales
        }

    } catch (error) {
        console.error("ERROR BACKEND (DAO IniciarSesion):", error);
        throw error; // Propaga el error
    }

}