export interface DTOUsuario {

    idUsuario: number;
    nombreDeUsuario: string;
    contrasenia: string;
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
    bajaLogica: boolean;
    tipoUsuario: number;
}
export interface DTOUsuarioLogin {
    nombreDeUsuario: string;
    contrasenia: string;

}