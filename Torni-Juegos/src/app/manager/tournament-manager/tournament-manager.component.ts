import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, Rol, Genre } from '../../shared/user/user';
import { SystemManager } from '../../systemManager';
import { BDService } from '../bd.service';
import { UserLoggedService } from '../userLogged.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Game, Category } from '../../shared/game/game';
import { Tournament } from '../../shared/tournament/tournament';
import { Iterator } from '../../util/iterator/iterator';
import { MongoAPIService } from '../../bd/mongoapi.service';

@Component({
  selector: 'app-tournament-manager',
  templateUrl: './tournament-manager.component.html',
  styleUrls: ['./tournament-manager.component.css'],
  providers: [BDService, UserLoggedService]
})


export class TournamentManagerComponent extends SystemManager implements OnInit 
{
  private userLogged: User;
  private gameSelected: Game;
  private tournaments: Array<Tournament>;
  private activeTournament: Tournament;


  constructor(private dataBaseService: BDService, private userLoggedServ: UserLoggedService, 
      private router: Router, private service: MongoAPIService) 
  {
  	super();

    this.userLogged = userLoggedServ.getUserLogged().getUser();
    SystemManager.dataBase = dataBaseService.connect;

    this.gameSelected = userLoggedServ.getUserLogged().getGame();


/*
    this.tournaments = new Array<Tournament>();
    for (let i = 0; i < service.games.length; i++){
      let u: Tournament = new Game(service.games[i].name, 
                  service.games[i].description,
                  service.games[i].getCategory);

      u.setTournament = service.games[i].tournaments;

      this.games.push(u);
    }
    */
    
    this.tournaments = this.gameSelected.getTournaments;
    /*this.tournaments = new Array<Tournament>();

    for(let i: Iterator = this.gameSelected.iterator() ; i.hasNext() ; i.next()) {
      this.tournaments.push(i.current());
    }*/

  }

	ngOnInit() { }

  selectTournament(tour: Tournament) {
    this.activeTournament = tour;
  }

  deleteTournament(event) {
    console.log("Torneo borrado.");

  }

  viewMatchs(event) {
    console.log("Viendo partidas...");
    this.userLoggedServ.getUserLogged().setTournament(this.activeTournament);
    this.router.navigate(['/matchmanager']);
  }

  viewRanking(event) {
    console.log("Viendo ranking...");
    this.userLoggedServ.getUserLogged().setTournament(this.activeTournament);
    this.router.navigate(['/viewranking']);
  }
}
