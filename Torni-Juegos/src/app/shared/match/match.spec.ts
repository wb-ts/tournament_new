import { TestBed, async } from '@angular/core/testing';
import { Match } from './match';
import { Team } from './../team/team';
import { Tournament } from './../tournament/tournament';
import { Ranking } from './../ranking/ranking';
import { Observer } from './../../util/observer/observer';

let tournament: Tournament;

let inidate: Date;
let findate: Date;
let iniTdate: Date;
let finTdate: Date;

let team1: Team;
let team2: Team;
let team3: Team;
let team4: Team;

let ranking: Ranking;

describe('Match', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                Match
            ],
        });

        inidate = new Date(2016, 9, 5, 0, 0, 0, 0);
        findate = new Date(2016, 10, 5, 0, 0, 0, 0);
        iniTdate = new Date(2016, 11, 5, 0, 0, 0, 0);
        finTdate = new Date(2016, 12, 5, 0, 0, 0, 0);

        let teams: Array<Team> = new Array<Team>();

        teams.push(team1 = new Team(0, 5));
        teams.push(team2 = new Team(1, 5));
        teams.push(team3 = new Team(2, 5));
        teams.push(team4 = new Team(3, 5));

        tournament = new Tournament(inidate, findate, iniTdate, finTdate, teams);
    });

    it('se construye llamando al constructor', async(() => {

        let date = new Date();
        date.setFullYear(2016, 12, 5);
        let teamlocal = new Team(0, 5);
        let teamvisitor = new Team(1, 5);

        let match = new Match(tournament, date, teamlocal, teamvisitor);

        expect(match).toBeDefined();
    }));

    it('se construye llamando al constructor', async(() => {

        let date = new Date();
        date.setFullYear(2016, 12, 5);
        let teamlocal = new Team(0, 5);
        let teamvisitor = new Team(1, 5);

        let match = new Match(tournament, date, teamlocal, teamvisitor);
    }));

    it('se construye un partido con puntuación 0-0', async(() => {

        let date = new Date();
        date.setFullYear(2016, 12, 5);
        let teamlocal = new Team(0, 5);
        let teamvisitor = new Team(1, 5);

        let match = new Match(tournament, date, teamlocal, teamvisitor);

        expect(match.getScoreLocal).toEqual(0);
        expect(match.getScoreLocal).toEqual(0);
    }));

    it('Están bien definido sus equipos y la fecha', async(() => {

        let date = new Date();
        date.setFullYear(2016, 12, 5);
        let teamlocal = new Team(0, 5);
        let teamvisitor = new Team(1, 5);

        let match = new Match(tournament, date, teamlocal, teamvisitor);

        expect(match.getLocalTeam).toEqual(teamlocal);
        expect(match.getVisitorTeam).toEqual(teamvisitor);
        expect(match.getStartDate).toEqual(date);
    }));

    it('Se asigna correctamente la puntuación de cada equipo y el ganador', async(() => {

        let scoreLocal = 30;
        let scoreVisitor = 29;

        let date = new Date();
        date.setFullYear(2016, 12, 5);
        let teamlocal = new Team(0, 5);
        let teamvisitor = new Team(1, 5);

        let match = new Match(tournament, date, teamlocal, teamvisitor);
        ranking = new Ranking();

        match.setScoreLocal = scoreLocal;
        match.setScoreVisitor = scoreVisitor;

        expect(match.getScoreLocal).toEqual(scoreLocal);
        expect(match.getScoreVisitor).toEqual(scoreVisitor);
        expect(match.getWinner).toEqual(teamlocal);
    }));

    it('No se puede modificar la puntuación una vez finalizado el partido', async(() => {

        let scoreLocal = 30;
        let scoreLocalFalse = 10;
        let scoreVisitor = 29;
        let scoreVisitorFalse = 11;

        let date = new Date();
        date.setFullYear(2016, 12, 5);
        let teamlocal = new Team(0, 5);
        let teamvisitor = new Team(1, 5);

        let match = new Match(tournament, date, teamlocal, teamvisitor);

        match.setScoreLocal = scoreLocal;
        match.setScoreVisitor = scoreVisitor;

        match.endMatch();

        match.setScoreLocal = scoreLocalFalse;
        match.setScoreVisitor = scoreVisitorFalse;

        expect(match.getScoreLocal).toEqual(scoreLocal);
        expect(match.getScoreVisitor).toEqual(scoreVisitor);
    }));
});