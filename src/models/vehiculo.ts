import { Imagenvehiculo } from "./imagenvehiculo";

export interface vehiculo{
    Idvehiculo: number;
    Marca: string;
    Modelo: string;
    Ano: number;
    Kilometraje: number;
    Tipo: "Moto"|"Carro";
    Descripcion:string;
    ImagenPrincipal:string;
    Imagenes?: Imagenvehiculo; // ¡Agregar esta línea!
}
