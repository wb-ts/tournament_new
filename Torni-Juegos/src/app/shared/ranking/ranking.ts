import { Team } from './../team/team';
import { Observer } from './../../util/observer/observer';
import { Iterator } from './../../util/iterator/iterator';
import { IndexIterator } from './../../util/iterator/indexIterator';
import { Aggregator } from './../../util/iterator/aggregator';


export class Ranking implements Observer, Aggregator {

	private scoreTeams: Array<ScoreTeam> = new Array<ScoreTeam>();

	constructor(teams: Array<Team>) {

		for(let i: number = 0 ; i < teams.length ; ++i) {
			this.addTeam(teams[i]);
		}
	}

	private addTeam(team: Team)
	{
		this.scoreTeams.push(new ScoreTeam(team));
	}

	get getScoreTeams() : Array<ScoreTeam> {
		return this.scoreTeams;
	}

	update(localTeam: Team, visitorTeam: Team, localScore: number, visitorScore: number) {

		let iterator = this.iterator();

		let LocalFound: boolean = false;
		let VisitorFound: boolean = false;
		while(iterator.hasNext() && (!LocalFound || !VisitorFound))
		{
			if(iterator.current().getTeam === localTeam) {
				LocalFound = true;
				iterator.current().setNumScore = iterator.current().getNumScore + localScore;

				if(localScore > visitorScore)
				{
					iterator.current().setWinner = iterator.current().getWinner + 1;
				}
				else
				{
					iterator.current().setLoser = iterator.current().getLoser + 1;	
				}
			}

			if(iterator.current().getTeam === visitorTeam) {
				VisitorFound = true;
				iterator.current().setNumScore = iterator.current().getNumScore + visitorScore;

				if(localScore < visitorScore)
				{
					iterator.current().setWinner = iterator.current().getWinner + 1;
				}
				else
				{
					iterator.current().setLoser = iterator.current().getLoser + 1;	
				}
			}

			iterator.next();
		}
	}

	iterator(): Iterator {

		return new IndexIterator(this.scoreTeams);
	}

}

export class ScoreTeam {

	private team: Team;
	private numScore: number;
	private numWinner: number;
	private numLoser: number;

	constructor(team: Team) {

		this.team = team;
		this.numScore = 0;
		this.numWinner = 0;
		this.numLoser = 0;
	}

	//Getters
	get getTeam(): Team {
		return this.team;
	}

	get getNumScore(): number {
		return this.numScore;
	}

	get getNumWinner(): number {
		return this.numWinner;
	}

	get getNumLoser(): number {
		return this.numLoser;
	}

	//Setters

	set setNumScore(numScore: number) {
		this.numScore = numScore;
	}

	set setNumWinner(numWinner: number) {
		this.numWinner = numWinner;
	}

	set setNumLoser(numLoser: number) {
		this.numLoser = numLoser;
	}
}