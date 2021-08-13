/**
 * Created by nahum on 26/11/16.
*/

export enum Rol {
    NULL,
    SUPERADMIN,
    ADMINISTRATOR,
    SPONSOR,
    PLAYER
}

export enum Genre {
    MALE,
    FEMALE
}

export class User {
    private _id: number;
    private nick: string;
    private name: string;
    private dni: string;
    private birthDate: Date;
    private rol: Rol;
    private genre: Genre;
    private password: string;

    constructor(nick?: string) {
        
        if(nick != null)
            this.nick = nick;
        else
            this.nick = 'null';
        this.rol = Rol.NULL;
        this.genre = Genre.MALE;
    }

    set setId(id: number) {
        this._id = id;
    }

    set setNick(nick: string) {
        this.nick = nick;
    }

    set setName(name: string) {
        this.name = name;
    }

    set setPassword(password: string) {
        this.password = password;
    }

    set setDni(dni: string) {
        this.dni = dni;
    }

    set setRol(rol: Rol) {
        this.rol = rol;
    }

    set setBirthDate(birthdate: Date) {
        this.birthDate = birthdate;
    }

    set setGenre(genre: Genre) {
        this.genre = genre;
    }

    get getNick(): string {
        return this.nick;
    }

    get getName(): string {
        return this.name;
    }

    get getDni(): string {
        return this.dni;
    }

    get getBirthDate(): Date {
        return this.birthDate;
    }

    get getPassword(): string {
        return this.password;
    }

    get getRol(): Rol {
        return this.rol;
    }

    get getGenre(): Genre {
        return this.genre;
    }

    get isEmpty(): boolean {
        return this.getNick === 'null';
    }

    isEqual(user: User): boolean {
        if (user.nick === this.nick &&
            user.getDni === this.dni &&
            user.getGenre === this.genre &&
            user.getRol === this.rol &&
            user.getBirthDate === this.birthDate &&
            user.getName === this.name) {

            return true;
        } else {
            return false;
        }
    }
}
