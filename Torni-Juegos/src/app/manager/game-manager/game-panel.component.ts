import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User, Rol, Genre } from '../../shared/user/user';
import { BDService } from '../bd.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Game, Category } from '../../shared/game/game';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css'],
  providers: [BDService]
})


export class GamePanelComponent
{
  @Output() eventDelete = new EventEmitter();
  @Output() eventTournament = new EventEmitter();

  @Input() game: Game;
  @Input() userLogged: User;

  deleteGame() {
    this.eventDelete.emit();
  }

  viewTournaments() {
    this.eventTournament.emit();
  }
}
