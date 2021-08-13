import { TestBed, async } from '@angular/core/testing';
import { Team } from './team';
import { User } from './../user/user'; 

describe('Team', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                Team
            ],
        });
    });

    it('se construye llamando al constructor', async(() => {

        let team = new Team(0, 1);

        expect(team).toBeDefined();
    }));

    it('se construye un equipo vacio', async(() => {

        let team = new Team(0, 1)

        expect(team.getId).toEqual(0);
        expect(team.getMaxPlayers).toEqual(1);
        expect(team.getNumPlayers).toEqual(0);

    }));

    it('recibe un maximo de jugadores', async(() => {
        
        let maxPlayers = 5;
        let team = new Team(0, maxPlayers);

        expect(team.getMaxPlayers).toEqual(maxPlayers);
    }));

    it('equipo está o no lleno y se encuentra el usuario dentro del equipo', async(() => {
        
        let maxPlayers = 3;
        let team = new Team(0, maxPlayers);

        //Testing isFull when false
        expect(team.isFull).toEqual(false);
        let user1: User = new User();
        let user2: User = new User();
        let user3: User = new User();
        let user4: User = new User();

        expect(team.searchPlayerIntoTeam(user1)).toEqual(false);

        team.addPlayerIntoTeam(user1);
        team.addPlayerIntoTeam(user2);
        team.addPlayerIntoTeam(user3);

        //Testing isFull when true
        expect(team.searchPlayerIntoTeam(user1)).toEqual(true);
        expect(team.isFull).toEqual(true);
    }));

    it('equipo no admite mas jugadores', async(() => {
        
        let maxPlayers = 2;
        let team = new Team(0, maxPlayers);

        //Testing isFull when false
        expect(team.isFull).toEqual(false);
        let user1: User = new User();
        let user2: User = new User();
        team.addPlayerIntoTeam(user1);
        team.addPlayerIntoTeam(user2);
        
        expect(team.getNumPlayers).toEqual(2);

        let user3: User = new User();
        team.addPlayerIntoTeam(user3);

        expect(team.getNumPlayers).toEqual(2);
    }));

    it('prueba de iteradores', async(() => {
        
        let maxPlayers = 4;
        let teamFour: Team = new Team(0, maxPlayers);

        let user1: User = new User('usuario1');
        let user2: User = new User('usuario2');
        let user3: User = new User('usuario3');
        let user4: User = new User('usuario4');

        teamFour.addPlayerIntoTeam(user1);
        teamFour.addPlayerIntoTeam(user2);
        teamFour.addPlayerIntoTeam(user3);
        teamFour.addPlayerIntoTeam(user4);


        let iterador = teamFour.iterator();

        //Testing begin
        expect(iterador.begin().getNick).toEqual('usuario1'); 
        //Testing end
        expect(iterador.end().getNick).toEqual('usuario4'); 
        //Testing hasNext when true
        expect(iterador.hasNext()).toEqual(true); 

        //Testing next and current
        expect(iterador.current().getNick).toEqual('usuario1'); 
        iterador.next();
        expect(iterador.current().getNick).toEqual('usuario2');
        iterador.next();
        expect(iterador.current().getNick).toEqual('usuario3');
        iterador.next();
        expect(iterador.current().getNick).toEqual('usuario4');

        //Testing hasNext when false 
        expect(iterador.hasNext()).toEqual(true); 
        
        iterador.next();

        expect(iterador.hasNext()).toEqual(false);         

        

        let iterador2 = teamFour.iterator();
        
        //Testing for iterator
        for(; iterador2.current() !== iterador2.end() ; iterador2.next());

        expect(iterador2.current().getNick).toEqual('usuario4');

        
    }));

});