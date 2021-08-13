import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, Rol, Genre } from '../../../shared/user/user';
import { SystemManager } from '../../../systemManager';
import { BDService } from '../../bd.service';
import { UserLoggedService } from '../../userLogged.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Game, Category } from '../../../shared/game/game';
import { Tournament } from '../../../shared/tournament/tournament';
import { Match } from '../../../shared/match/match';
import { Team } from '../../../shared/team/team';
import { IndexIterator } from '../../../util/iterator/indexIterator';
import { Iterator } from '../../../util/iterator/iterator';
import { Ranking, ScoreTeam } from '../../../shared/ranking/ranking';
import { Observer } from '../../../util/observer/observer';

@Component({
  selector: 'app-view-ranking',
  templateUrl: './view-ranking.component.html',
  styleUrls: ['./view-ranking.component.css'],
  providers: [BDService, UserLoggedService]
})


export class ViewRankingComponent extends SystemManager implements OnInit 
{
  private userLogged: User;
  private ranking: Ranking;
  private teams: Array<ScoreTeam>;

  private totalUsers: Array<User>;
  private totalTeam: Array<Team>;
  private teamSelected: Team;


  constructor(private dataBaseService: BDService, private userLoggedServ: UserLoggedService, 
      private router: Router) 
  {
  	super();
    this.totalUsers = new Array<User>();
    this.totalTeam = new Array<Team>();
    this.userLogged = userLoggedServ.getUserLogged().getUser();
    SystemManager.dataBase = dataBaseService.connect;

    this.ranking = userLoggedServ.getUserLogged().getTournament().getRanking;
    /*this.teams = new Array<ScoreTeam>();

    for(let iterator: Iterator = this.ranking.iterator() ; iterator.hasNext() ; iterator.next()) {
      this.teams.push(iterator.current());
    }*/
    this.teams = this.ranking.getScoreTeams;

    for (let i = 0; i < this.teams.length; i++)
    {
      let t: Team = this.teams[i].getTeam;
      this.totalTeam.push(this.teams[i].getTeam);

      for (let j = 0; j < t.getUsers.length; j++)
      {
        this.totalUsers.push (t.getUsers[j]);
      }
    }
    console.log(this.totalUsers);


  }

	ngOnInit() { }

  activeTeam() {
    console.log(this.teamSelected);
  }
}