import { Team } from './../team/team';
import { Subject } from './../../util/observer/subject';
import { Observer } from './../../util/observer/observer';
import { Tournament } from './../tournament/tournament';

export class Match implements Subject {
	private startDate: Date;
	private scoreL: number;
	private scoreV: number;
	private LocalTeam: Team;
	private VisitorTeam: Team;
	private finishedMatch: boolean = false;
	private tournament: Tournament;

	private observer: Observer;

	constructor(tournament: Tournament, startdate: Date, local?: Team, visitor?: Team) //OK
	{
		this.tournament = tournament;
		this.startDate = startdate;
		this.LocalTeam = local;
		this.VisitorTeam = visitor;

		this.scoreL = 0;
		this.scoreV = 0;

		this.registerObserver(tournament);
	}

	endMatch() { //OK

		this.finishedMatch = true;

		this.notify();
		this.removeObserver(this.observer);
	}

	// Getters
	get getWinner(): Team { //OK
		
		if(this.scoreL > this.scoreV)
			return this.LocalTeam;
		else
			return this.VisitorTeam;
	}

	get getLocalTeam(): Team {		//OK
		
		return this.LocalTeam;
	}

	get getVisitorTeam(): Team {	//OK
		
		return this.VisitorTeam;
	}

	get getScoreLocal(): number {	//OK

		return this.scoreL;
	}

	get getScoreVisitor(): number {	//OK

		return this.scoreV;
	}

	get getStartDate(): Date {		//OK

		return this.startDate;
	}


	// Setters
	setScoreLocal(score: number) {  //OK

		if(!this.finishedMatch)
		{
			this.scoreL = score;
			this.notify();
		}
	}

	setScoreVisitor(score: number) { //OK
		
		if(!this.finishedMatch) {
			this.scoreV = score;
			this.notify();
		}
	}

	get isFinished() {
		return this.finishedMatch;
	}
	
	registerObserver(observer: Observer) {
		
		this.observer = observer;
	}

	removeObserver(observer: Observer) {
		this.observer = null;
	}

	notify() {
		
		this.observer.update(this);
	}
}