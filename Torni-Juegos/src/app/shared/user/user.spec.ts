/**
 * Created by nahum on 26/11/16.
 */

import { TestBed, async } from '@angular/core/testing';
import { User, Rol, Genre } from './user';

let user: User;

describe('User', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                User
            ],
        });

        user = new User();

    });

    it('se construye llamando al constructor predeterminado', async(() => {
        expect(user).toBeDefined();
    }));

    it('se construye llamando al constructor con nick', async(() => {

        let nombre: string = 'user';
        let user1 = new User(nombre);

        expect(user1).toBeDefined();
        expect(user1.getNick).toEqual(nombre);

    }));

    it('se construye un usuario vacio', async(() => {
        expect(user.getNick).toEqual('null');
        expect(user.getBirthDate).toBeUndefined();
        expect(user.getDni).toBeUndefined();
    }));

    it('setter/getter Date', async(() => {
        let date = new Date();

        date.setFullYear(2016, 12, 5);
        user.setBirthDate = date;
        expect(user.getBirthDate).toEqual(date);

        date.setFullYear(2016, 15, 89);
        user.setBirthDate = date;
        expect(user.getBirthDate).toEqual(date);

        date.setFullYear(-1, 0, -19);
        user.setBirthDate = date;
        expect(user.getBirthDate).toEqual(date);
    }));

    it('setter/getter Nick', async(() => {
        user.setNick = 'Nahum';
        expect(user.getNick).toEqual('Nahum');
        expect(user.isEmpty).toBe(false);
    }));

    it('setter/getter Dni', async(() => {
        user.setDni = '32999999H';
        expect(user.getDni).toEqual('32999999H');
    }));

    it('setter/getter Rol', async(() => {
        expect(user.getRol).toBeDefined();
        expect(user.getRol).toEqual(Rol.NULL);
        user.setRol = Rol.ADMINISTRATOR;
        expect(user.getRol).toEqual(Rol.ADMINISTRATOR);
        expect(user.getRol).not.toEqual(Rol.NULL);
    }));

    it('setter/getter Genre', async(() => {
        expect(user.getGenre).toBeDefined();
        user.setGenre = Genre.FEMALE;
        expect(user.getGenre).toEqual(Genre.FEMALE);
    }));

    it('es igual a otro User', async(() => {
        let u: User;
        u = new User();

        expect(user.isEqual(u));
    }));
});