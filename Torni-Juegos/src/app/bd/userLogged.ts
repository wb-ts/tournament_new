import { User } from '../shared/user/user';
import { Game } from '../shared/game/game';
import { Tournament } from '../shared/tournament/tournament';
import { Match } from '../shared/match/match';

export class UserLogged
{
   private static instance: UserLogged;
   private user: User;

   private gameSelected: Game;
   private tournamentSelected: Tournament;
   private matchSelected: Match;

   static get getInstance() {

    	if (this.instance === null || this.instance === undefined) 
    	{
            this.instance = new UserLogged();
            this.instance.user = new User();
        }

        return this.instance;
    }

	private constructor() {}

	getUser(): User {
		return this.user;
	}

	setUser(item: User) {
		this.user = item;
	}

  set sUser(item: User) {
    this.user = item;
  }

	clear() {
		this.user = undefined;
	}

	setGame(game: Game) {
       this.gameSelected = game;
    }

   getGame(): Game {
       return this.gameSelected;
   }

   setTournament(tour: Tournament) {
     this.tournamentSelected = tour;
   }

   getTournament(): Tournament {
     return this.tournamentSelected;
   }

   setMatch(match: Match) {
     this.matchSelected = match;
   }

   getMatch(): Match {
     return this.matchSelected;
   }

}
