/**
 * Created by nahum on 26/11/16.
 */ 

import { TestBed, async } from '@angular/core/testing';
import { Game } from './game';
import { Tournament } from '../tournament/tournament';
import { Team } from '../team/team';
import { Category } from './game';
import { Iterator } from './../../util/iterator/iterator';

let game: Game;

describe('Game', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                Game
            ],
        });

    });

    it('se construye llamando al constructor', async(() => {

        let name = 'SuperMario';
        let description = "Juego de Acción para matar setas y tortugas";
        let category = Category.ACTION;
        game = new Game(name, description, category);

        expect(game).toBeDefined();
    }));

    it('funcionan los get', async(() => {

        let name = 'SuperMario';
        let description = "Juego de Acción para matar setas y tortugas";
        let category = Category.ACTION;
        
        let game = new Game(name, description, category);

        expect(game).toBeDefined();
        expect(game.getName).toEqual(name);
        expect(game.getDescription).toEqual(description);
        expect(game.getCategory).toEqual(category);
    }));

    it('se obtiene el largo de torneos para un juego', async(() => {


        let inidate = new Date(2016, 8, 5, 0, 0, 0, 0);
        let findate = new Date(2016, 9, 5, 0, 0, 0, 0);
        let iniTdate = new Date(2016, 10, 5, 0, 0, 0, 0);
        let finTdate = new Date(2016, 11, 5, 0, 0, 0, 0);
        let name = 'SuperMario';
        let description = "Juego de Acción para matar setas y tortugas";
        let category = Category.ACTION;

        let teams: Array<Team> = new Array<Team>();

        teams.push(new Team(0, 5));
        teams.push(new Team(1, 5));
        teams.push(new Team(2, 5));
        teams.push(new Team(3, 5));

        let tournament1 = new Tournament(name, inidate, findate, iniTdate, finTdate, teams);
        let tournament2 = new Tournament(name, inidate, findate, iniTdate, finTdate, teams);
        let tournament3 = new Tournament(name, inidate, findate, iniTdate, finTdate, teams);

        let game = new Game(name, description, category);

        game.addTournament(tournament1);
        game.addTournament(tournament2);
        game.addTournament(tournament3);

        expect(game.lengthTournament).toEqual(3);
    }));

    it('iteradores', async(() => {

        let name = 'SuperMario';
        let description = "Juego de Acción para matar setas y tortugas";
        let category = Category.ACTION;
        game = new Game(name, description, category);

        let inidate = new Date(2016, 9, 5, 0, 0, 0, 0);
        let findate = new Date(2016, 10, 5, 0, 0, 0, 0);
        let iniTdate = new Date(2016, 11, 5, 0, 0, 0, 0);
        let finTdate = new Date(2016, 12, 5, 0, 0, 0, 0);

        let teams: Array<Team> =  new Array<Team>();

        teams.push(new Team(0, 5));
        teams.push(new Team(1, 5));
        teams.push(new Team(2, 5));
        teams.push(new Team(3, 5));

 
        let t1 = new Tournament(name, inidate, findate, iniTdate, finTdate, teams); 
        let t2 = new Tournament(name, inidate, findate, iniTdate, finTdate, teams); 

        game.addTournament(t1);
        game.addTournament(t1);
        game.addTournament(t2);
        game.addTournament(t2);

        let iterador = game.iterator();
        
        expect(game.lengthTournament).toEqual(2);

        expect(iterador.current()).toEqual(t1);
        iterador.next();
        expect(iterador.current()).toEqual(t2);

    }));



});
