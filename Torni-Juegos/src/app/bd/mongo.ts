import {BD} from './bd';

import { User } from '../shared/user/user';
import { Game } from '../shared/game/game';
import { Match } from '../shared/match/match';
import { Tournament } from '../shared/tournament/tournament';

import { Aggregator } from '../util/iterator/aggregator';
import { IndexIterator } from '../util/iterator/indexIterator';
import { Iterator } from '../util/iterator/iterator';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map'
import 'rxjs/Rx';


export class Mongo implements BD
{
	private static instance: Mongo;

	private mapUser: Map<string, User>;
	private mapGame: Map<string, Game>;

	http: Http;

	private constructor() {}

	static get getInstance() {

    	if (this.instance === null || this.instance === undefined) {

            this.instance = new Mongo();
            this.instance.mapUser = new Map<string, User>();
			this.instance.mapGame = new Map<string, Game>();
        }
            return this.instance;
    }

    set setHTTP(http_: Http) {
    	this.http = http_;
    }

	add(item: User | Game) {

		if (item instanceof User) {
			this.mapUser.set(item.getNick, item);
		}

		if (item instanceof Game) {
			this.mapGame.set(item.getName, item);
		}

		//	Mongo
		/*
		var headers = new Headers();
        headers.append('Content-Type', 'application/json');

		if (item instanceof User) {
			return this.http.post('/api/User',JSON.stringify(item),{headers:headers})
					.map(res=>res.json());
		}

		if (item instanceof Game) {
			return this.http.post('/api/Game',JSON.stringify(item),{headers:headers})
					.map(res=>res.json());
		}
		*/
	}


	remove(item: User | Game) {


		if (item instanceof User) {
			this.mapUser.delete(item.getNick);
		}

		if (item instanceof Game) {
			this.mapGame.delete(item.getName);
		}

		//	Mongo
		/*
		if (item instanceof User) {
			return this.http.delete('/api/User/'+item)
            		.map(res => res.json());
		}

		if (item instanceof Game) {
			return this.http.delete('/api/Game/'+item)
            		.map(res => res.json());
		}
		*/
	}

	getUser(item: User): User {
		return this.mapUser.get(item.getNick);
	}

	//	Mongo
	getUserMongo(item: User) {

		return this.http.get('/databases').map(res=>res.json());
	}

	getGame(item: Game): Game {
		return this.mapGame.get(item.getName);
	}

	getGameMongo(item: Game) {
		return this.http.get('/api/Game'+item)
				.map(res=>res.json());
	}


	updateUser(item: User) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/json');
		return this.http.post('/api/User',JSON.stringify(item),{headers:headers})
				.map(res=>res.json());
	}

	updateGame(item: Game){
		var headers = new Headers();
        headers.append('Content-Type', 'application/json');
		return this.http.post('/api/Game',JSON.stringify(item),{headers:headers})
				.map(res=>res.json());
	}

	getArrayGames(): Array<Game> {

		let array: Array<Game>;
		array = new Array<Game>();

		this.mapGame.forEach( (value: Game, key: string) => {
			array.push(value);
		});

		return array;
	}
	
}
