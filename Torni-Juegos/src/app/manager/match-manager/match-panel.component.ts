import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User, Rol, Genre } from '../../shared/user/user';
import { BDService } from '../bd.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Game, Category } from '../../shared/game/game';
import { Tournament } from '../../shared/tournament/tournament';
import { Match } from '../../shared/match/match';

@Component({
  selector: 'app-match-panel',
  templateUrl: './match-panel.component.html',
  styleUrls: ['./match-panel.component.css'],
  providers: [BDService]
})


export class MatchPanelComponent
{

  @Output() eventDelete = new EventEmitter();
  @Output() eventMatch = new EventEmitter();

  @Input() match: Match;
  @Input() userLogged: User;

  deleteMatch() {
    this.eventDelete.emit();
  }

  increaseLocalScore() {
    this.match.setScoreLocal(1 + this.match.getScoreLocal);
  }  

  increaseVisitorScore() {
    this.match.setScoreVisitor(1 + this.match.getScoreVisitor);
  }

  finishMatch() {
    this.match.endMatch();
  }
}
