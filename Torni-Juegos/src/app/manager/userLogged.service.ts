import { Injectable } from '@angular/core';
import { User, Rol, Genre } from '../shared/user/user';
import { UserLogged } from './../bd/userLogged';

@Injectable()
export class UserLoggedService 
{

    constructor()
    {   

    }

    getUserLogged(): UserLogged
    {
       return UserLogged.getInstance;
    }
}