import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRouting } from './app.routing';

import { AppComponent } from './app.component';
import { UserManagerComponent } from './manager/user-manager/user-manager.component';
import { LoginManagerComponent } from './manager/login-manager/login-manager.component';
import { BDService } from './manager/bd.service';
import { UserLoggedService } from './manager/userLogged.service';

import { RegisterUserManagerComponent } from './manager/register-user-manager/register-user-manager.component';
import { NewAdminComponent } from './manager/user-manager/new-admin/new-admin.component';
import { DeleteAdminComponent } from './manager/user-manager/delete-admin/delete-admin.component';
import { NewSponsorComponent } from './manager/user-manager/new-sponsor/new-sponsor.component';
import { DeleteSponsorComponent } from './manager/user-manager/delete-sponsor/delete-sponsor.component';
import { EditProfileComponent } from './manager/user-manager/edit-profile/edit-profile.component';
import { NewGameComponent } from './manager/user-manager/new-game/new-game.component';
import { DeleteGameComponent } from './manager/user-manager/delete-game/delete-game.component';

import { GameManagerComponent } from './manager/game-manager/game-manager.component';
import { GamePanelComponent } from './manager/game-manager/game-panel.component';
import { TournamentManagerComponent } from './manager/tournament-manager/tournament-manager.component';
import { TournamentPanelComponent } from './manager/tournament-manager/tournament-panel.component';
import { NewTournamentComponent } from './manager/tournament-manager/new-tournament/new-tournament.component';
import { MatchManagerComponent } from './manager/match-manager/match-manager.component';
import { MatchPanelComponent } from './manager/match-manager/match-panel.component';
import { ViewRankingComponent } from './manager/tournament-manager/view-ranking/view-ranking.component';

import { MongoAPIService } from './bd/mongoapi.service';

@NgModule({
  declarations: [
    AppComponent,
    UserManagerComponent,
    LoginManagerComponent,
    RegisterUserManagerComponent,
    NewAdminComponent,
    DeleteAdminComponent,
    NewSponsorComponent,
    DeleteSponsorComponent,
    EditProfileComponent,
    GameManagerComponent,
    NewGameComponent,
    DeleteGameComponent,
    GamePanelComponent,
    TournamentManagerComponent,
    TournamentPanelComponent,
    NewTournamentComponent,
    MatchManagerComponent,
    MatchPanelComponent,
    ViewRankingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [BDService, UserLoggedService, MongoAPIService],
  bootstrap: [AppComponent]
})

export class AppModule { }
