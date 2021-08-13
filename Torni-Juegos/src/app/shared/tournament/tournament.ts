import { Iterator } from './../../util/iterator/iterator';
import { IndexIterator } from './../../util/iterator/indexIterator';
import { Aggregator } from './../../util/iterator/aggregator';
import { Observer } from './../../util/observer/observer';
import { Subject } from './../../util/observer/subject';
import { BTreeImpl } from './../../util/BTree/BTreeImpl';
import { Match } from './../match/match';
import { Team } from './../team/team';
import { User } from './../user/user';
import { Ranking } from './../ranking/ranking';

export class Tournament implements Aggregator, Observer, Subject {

	private name: string;
	
	private finishedTournament: boolean = false;

	private currentMatchs: number; 		//Partidas actualmente activos
	private noEndMatchs : number;		//Partidas actuales no finalizadas

	private currentDateMatch: Date;
	private difDateMatchs: number;

	private startIns: Date;
	private endIns: Date;

	private startTour: Date;
	private endTour: Date;

	private award: string;
	private Matchs: Array<Match>;

	private observer: Observer;

	private MatchIterator;
	private numMaxUsers: number;
	private numCurrentUsers: number;
	private numTeams: number;

	private hideMatch: Match;

	get getNumMaxUsers(): number {
		return this.numMaxUsers;
	}

	get getCurrentUsers(): number {
		return this.numCurrentUsers;
	}

	get getRanking(): Ranking {
		return <Ranking> this.observer;
	}

	get isFullTournament() {
		return this.numCurrentUsers === this.numMaxUsers;
	}


	constructor(name: string, startIns: Date, endIns: Date, startTour: Date,  endTour: Date, teams: Array<Team>) 
	{


		this.name = name;
		this.startIns = startIns;
		this.endIns = endIns;
		this.startTour = startTour;
		this.currentDateMatch = startTour;
		this.endTour = endTour;
		this.award = 'null';

		this.Matchs = new Array<Match>();
		this.currentMatchs = 0;
		this.noEndMatchs = 0;
		this.numTeams = teams.length;

		this.numCurrentUsers = 0;
		this.numMaxUsers = teams.length * teams[0].getMaxPlayers;

		this.difDateMatchs = (endTour.getTime() - startTour.getTime()) / teams.length-1;

		this.registerObserver(new Ranking(teams));

		this.createMatchs(teams);
	}

	private createMatchs(teams: Array<Team>) {

		let i: number = 0;
		this.currentMatchs = 0;

		while(i < teams.length-1) {

			let newMatch: Match = new Match(this, this.currentDateMatch, teams[i++], i < teams.length ? teams[i++] : null);

			this.currentMatchs++;
			this.noEndMatchs++;

			this.Matchs.push(newMatch);

			this.currentDateMatch.setTime(this.currentDateMatch.getTime() + this.difDateMatchs);
		}
	}

	addUserTournament(user: User): boolean {

		let added: boolean = false;
		if(this.numCurrentUsers < this.numMaxUsers)
		{
			let currentMatch: Iterator = this.iterator();
			while(!added && currentMatch.hasNext()) {

				let currentTeam: Team = currentMatch.current().getLocalTeam;

				for(let j = 0 ; j < 2 ; j++) {

					if(!added && currentTeam.getNumPlayers < currentTeam.getMaxPlayers) {					
						currentTeam.addPlayerIntoTeam(user);
						added = true;
						this.numCurrentUsers++;
					}
					currentTeam = currentMatch.current().getVisitorTeam;
				}
				currentMatch.next();
			}
		}
		return added;
	}

	removeUserTournament(user: User): boolean {

		let removed: boolean = false;

		if(this.numCurrentUsers === 0)
		{
			let currentMatch: Iterator = this.iterator();
			while(!removed && currentMatch.hasNext()) {

				let currentTeam: Team = currentMatch.current().getLocalTeam;

				for(let j = 0 ; j < 2 ; j++) {
									
					if(!removed && currentTeam.searchPlayerIntoTeam(user)) {					
							
						currentTeam.removePlayerIntoTeam(user);
						removed = true;
						this.numCurrentUsers--;
					}
					currentTeam = currentMatch.current().getVisitorTeam;
				}
				currentMatch.next();
			}
		}
		return removed;
	}

	searchUserTournament(user: User): boolean {
		
		let found: boolean = false;
		
		let currentMatch: Iterator = this.iterator();
		while(!found && currentMatch.hasNext()) {

			let currentTeam: Team = currentMatch.current().getLocalTeam;

			for(let j = 0 ; j < 2 ; j++) {
								
				if(!found && currentTeam.searchPlayerIntoTeam(user)) {					
					found = true;
				}
				currentTeam = currentMatch.current().getVisitorTeam;
			}
			currentMatch.next();
		}
		return found;
	} 

	//Getters

	get getFinishedTournament(): boolean {
		return this.finishedTournament;
	}

	get getName(): string {
		return this.name;
	}

	get getWinnerTournament(): Team  {

		if(this.finishedTournament)
			return this.Matchs[this.Matchs.length-1].getWinner;
		else
			return null;
	}

	get getStartInscription(): Date {
		return this.startIns;
	}

	get getEndInscription(): Date {

		return this.endIns;
	}

	get getStartTournament(): Date {

		return this.startTour;
	}

	get getEndTournament(): Date {

		return this.endTour;
	}

	get getAward(): string {

		return this.award;
	}

	get getNumTeams(): number {
		return this.numTeams;
	}

	get getNumMatch(): number {

		return this.Matchs.length;
	}

	//Setters

	set setStartInscription(startIns: Date)
	{
		if(!this.finishedTournament)
			this.startIns = startIns;
	}

	set setEndInscription(endIns: Date)
	{
		if(!this.finishedTournament)
			this.endIns = endIns;
	}

	set setAward(award: string) {
		
		if(!this.finishedTournament)
			this.award = award
	}

	get getMatchs() : Array<Match> {
		return this.Matchs;
	}

	iterator(): Iterator {
		return new IndexIterator(this.Matchs);
	}

	update(match: Match) {

		if(match.isFinished) {
			this.noEndMatchs--;
			this.hideMatch = match;
			this.notify();
		}

		if(this.noEndMatchs === 0)
		{
			let teams: Array<Team> = new Array<Team>();
			
			let currentMatch = 0;
			let iterador = this.Matchs.length-1;

			while(currentMatch < this.currentMatchs) {

				teams.push(this.Matchs[iterador].getWinner);

				currentMatch++;
				iterador--;
			}

			if(teams.length === 1)
			{
				this.finishedTournament = true;
			}
			else
			{
				this.createMatchs(teams);
			}
		}
	}

	registerObserver(observer: Observer) {
		
		this.observer = observer;
	}


	removeObserver(observer: Observer) {
		this.observer = null;
	}

	notify() {
		
		this.observer.update(this.hideMatch.getLocalTeam, this.hideMatch.getVisitorTeam, this.hideMatch.getScoreLocal, this.hideMatch.getScoreVisitor);
	}
}
