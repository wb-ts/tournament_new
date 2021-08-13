import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User, Rol, Genre } from '../../shared/user/user';
import { BDService } from '../bd.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Game, Category } from '../../shared/game/game';
import { Tournament } from '../../shared/tournament/tournament';
import { Ranking } from '../../shared/ranking/ranking';

@Component({
  selector: 'app-tournament-panel',
  templateUrl: './tournament-panel.component.html',
  styleUrls: ['./tournament-panel.component.css'],
  providers: [BDService]
})


export class TournamentPanelComponent
{
  @Output() eventDelete = new EventEmitter();
  @Output() eventTournament = new EventEmitter();
  @Output() eventRanking = new EventEmitter();

  @Input() tournament: Tournament;
  @Input() userLogged: User;

  deleteTournament() {
    this.eventDelete.emit();
  }

  viewMatchs() {
    this.eventTournament.emit();
  }

  viewRanking() {
    this.eventRanking.emit();
    console.log("Ranking");
    console.log(this.tournament.getRanking);
  }

  addPlayer() {
    this.tournament.addUserTournament(this.userLogged);
  }
}
