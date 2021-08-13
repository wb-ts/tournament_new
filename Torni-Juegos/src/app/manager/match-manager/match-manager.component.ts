import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, Rol, Genre } from '../../shared/user/user';
import { SystemManager } from '../../systemManager';
import { BDService } from '../bd.service';
import { UserLoggedService } from '../userLogged.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Game, Category } from '../../shared/game/game';
import { Tournament } from '../../shared/tournament/tournament';
import { Match } from '../../shared/match/match';
import { IndexIterator } from '../../util/iterator/indexIterator';
import { Iterator } from '../../util/iterator/iterator';

@Component({
  selector: 'app-match-manager',
  templateUrl: './match-manager.component.html',
  styleUrls: ['./match-manager.component.css'],
  providers: [BDService, UserLoggedService]
})


export class MatchManagerComponent extends SystemManager implements OnInit 
{
  private userLogged: User;
  private tournamentSelected: Tournament;
  private matchs: Array<Match>;
  private activeMatch: Match;


  constructor(private dataBaseService: BDService, private userLoggedServ: UserLoggedService, 
      private router: Router) 
  {
  	super();

    this.userLogged = userLoggedServ.getUserLogged().getUser();
    SystemManager.dataBase = dataBaseService.connect;

    this.tournamentSelected = userLoggedServ.getUserLogged().getTournament();
    //this.matchs = new Array<Match>();
    this.matchs = this.tournamentSelected.getMatchs;

    /*for(let i: Iterator = this.tournamentSelected.iterator() ; i.hasNext() ; i.next()) {
      this.matchs.push(i.current());
    }*/
  }

	ngOnInit() { }

  selectMatch(match: Match) {
    this.activeMatch = match;
  }
}
