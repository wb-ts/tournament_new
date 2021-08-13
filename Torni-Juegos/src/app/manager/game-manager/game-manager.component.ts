import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, Rol, Genre } from '../../shared/user/user';
import { SystemManager } from '../../systemManager';
import { BDService } from '../bd.service';
import { UserLoggedService } from '../userLogged.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Game, Category } from '../../shared/game/game';
import { MongoAPIService } from '../../bd/mongoapi.service';

@Component({
  selector: 'app-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.css'],
  providers: [BDService, UserLoggedService]
})


export class GameManagerComponent extends SystemManager implements OnInit 
{
  private userLogged: User;
  private games: Array<Game>;
  private activeGame: Game;


  constructor(dataBaseService: BDService, private userLoggedServ: UserLoggedService, 
      private router: Router, private service: MongoAPIService) 
  {
  	super();


    this.userLogged = userLoggedServ.getUserLogged().getUser();
    SystemManager.dataBase = dataBaseService.connect;
  
    this.games = SystemManager.dataBase.getArrayGames();

    /*
    this.games = new Array<Game>();
    for (let i = 0; i < service.games.length; i++){
      let u: Game = new Game(service.games[i].name, 
                  service.games[i].description,
                  service.games[i].getCategory);

      u.setTournament = service.games[i].tournaments;

      this.games.push(u);
    }
    */
  }

	ngOnInit() { }

  selectGame(game: Game) {
    this.activeGame = game;
  }

  deleteGame(event) {
    console.log("Juego borrado.");
    SystemManager.dataBase.remove(this.activeGame);
  }

  viewTournaments(event) {
    console.log("Viendo torneo.");
    this.userLoggedServ.getUserLogged().setGame( this.activeGame);

    this.router.navigate(['/tournamentmanager']);
  }


}
