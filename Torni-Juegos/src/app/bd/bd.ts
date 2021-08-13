import { User } from '../shared/user/user';
import { Game } from '../shared/game/game';

export interface BD {

	add(item: User | Game);
	remove(item: User | Game);
	getUser(item: User) : User;
	getGame(item: Game) : Game;
	getArrayGames(): Array<Game>;
}
