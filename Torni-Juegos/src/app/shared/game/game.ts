import { Tournament } from '../tournament/tournament';
import { Iterator } from './../../util/iterator/iterator';
import { IndexIterator} from './../../util/iterator/indexIterator';
import { Aggregator } from './../../util/iterator/aggregator';

export enum Category {
	ACTION,
	SPORT,
	BOARD_GAME
}


export class Game implements Aggregator {

	private name: string;
	private description: string;
	private category: Category;
	private tournaments: Array<Tournament>;

	constructor(name: string, description: string, category: Category) {
		
		if (name == null) {
			this.name = 'null';
		} else {
			this.name = name;
		}

		this.description = description;
		this.category = category;
		this.tournaments = new Array<Tournament>();
	}

	set setTournament(array: Array<Tournament>) {
		this.tournaments = array;
	}

	get getName(): string {
		return this.name;
	}

	get getDescription(): string {
		return this.description;
	}

	get getCategory(): Category {
		return this.category;
	}

	get lengthTournament(): number {
		return this.tournaments.length;
	}

	set addTour(tour: Tournament) {
		let item = this.tournaments.indexOf(tour);

		if (item === -1) {
			this.tournaments.push(tour);
		}
	}
	
	addTournament(tournament: Tournament) {

		let item = this.tournaments.indexOf(tournament);

		if (item === -1) {
			this.tournaments.push(tournament);
		}
	}

	get getTournaments(): Array<Tournament> {
		return this.tournaments;
	}

	// iterator
    iterator(): Iterator {
        return new IndexIterator(this.tournaments);
    }
}

