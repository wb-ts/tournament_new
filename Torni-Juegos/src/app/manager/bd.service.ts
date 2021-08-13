import { Injectable, OnInit } from '@angular/core';
import { Memory } from '../bd/memory';
import { BD } from '../bd/bd';
import { User, Rol, Genre } from '../shared/user/user';
import { Game, Category } from '../shared/game/game';
import { Tournament } from '../shared/tournament/tournament';
import { Team } from '../shared/team/team';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { Mongo } from '../bd/mongo';

import 'rxjs/add/operator/map'
import 'rxjs/Rx';


@Injectable()
export class BDService implements OnInit {

    mongodb: Mongo;
    http:Http;
    static isCreate: boolean = false;

    ngOnInit() {
    }

  get connect(): BD {  	
  	return Mongo.getInstance;
  }

  constructor(http:Http) {

    this.http=http;
    if (!BDService.isCreate) 
    {
        Mongo.getInstance.setHTTP = http;
        BDService.isCreate = true;

        console.log("Memory: Constructor");

        let g: Game;
        g = new Game("FIFA 17", "El fútbol ha cambiado. FIFA 17 redefine la forma de jugar, competir y vivir el fútbol.", Category.SPORT);

        let teams = new Array<Team>();
        for (let i = 0; i < 4; i++) 
             teams.push(new Team(i, 2));

        g.addTournament(new Tournament("FIFA World Cup 2017", 
            new Date(2016, 8, 5, 0, 0, 0, 0),
            new Date(2016, 8, 6, 0, 0, 0, 0),
            new Date(2016, 8, 7, 0, 0, 0, 0),
            new Date(2016, 8, 8, 0, 0, 0, 0),
            teams));

        
        let g2: Game;
        g2 = new Game("Parchis", "El apasionado y popular juego.", Category.BOARD_GAME);
        
        Mongo.getInstance.add(g);
        Mongo.getInstance.add(g2);
    }

  }


//    -- Parte de api rest --
	private api="http://localhost:3000";

	addUser(item: User){
		console.log("Agregando");
		return this.http.post(this.api+'/User',item)
				.map(res=>res.json());
	}

	updateUser(item: User){
		return this.http.put(this.api+'/User/'+item,item)
				.map(res=>res.json());
	}

	removeUser(item: User) {
		return this.http.delete(this.api+'/User/'+item)
            	.map(res => res.json());
	}

	getUser(item: User){
		return this.http.get(this.api+'/User/'+item)
				.map(res=>res.json());
	}
	/*removeGame(item: Game) {
			return this.http.delete('/Game/',{item})
            		.map(res => res.json());
    }
	

	/*getGame(item: Game){
		return this.http.get('/Game'+item)
				.map(res=>res.json());
	}

	getUsers(){
		return this.http.get('/User')
				.map(res=>res.json());
	}

	getGames(){
		return this.http.get('/Game')
				.map(res=>res.json());
	}

	

	updateGame(item: Game){
		var headers = new Headers();
        headers.append('Content-Type', 'application/json');
		return this.http.post('/api/Game',JSON.stringify(item),{headers:headers})
				.map(res=>res.json());
	}*/
}