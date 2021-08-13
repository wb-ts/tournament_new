import { NgModule }       from '@angular/core';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { LoginManagerComponent } from './manager/login-manager/login-manager.component';
import { UserManagerComponent } from './manager/user-manager/user-manager.component';
import { GameManagerComponent } from './manager/game-manager/game-manager.component';
import { RegisterUserManagerComponent } from './manager/register-user-manager/register-user-manager.component';
import { NewAdminComponent } from './manager/user-manager/new-admin/new-admin.component';
import { DeleteAdminComponent } from './manager/user-manager/delete-admin/delete-admin.component';
import { NewSponsorComponent } from './manager/user-manager/new-sponsor/new-sponsor.component';
import { DeleteSponsorComponent } from './manager/user-manager/delete-sponsor/delete-sponsor.component';
import { EditProfileComponent } from './manager/user-manager/edit-profile/edit-profile.component';
import { NewGameComponent } from './manager/user-manager/new-game/new-game.component';
import { DeleteGameComponent } from './manager/user-manager/delete-game/delete-game.component';

import { TournamentManagerComponent } from './manager/tournament-manager/tournament-manager.component';
import { NewTournamentComponent } from './manager/tournament-manager/new-tournament/new-tournament.component';
import { MatchManagerComponent } from './manager/match-manager/match-manager.component';
import { ViewRankingComponent } from './manager/tournament-manager/view-ranking/view-ranking.component';

// Route Configuration
export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: ''},
  {path: 'login', component: LoginManagerComponent },
  {path: 'usermanager', component: UserManagerComponent },
  {path: 'usermanager/newadmin', component: NewAdminComponent },
  {path: 'usermanager/deleteadmin', component: DeleteAdminComponent },
  {path: 'usermanager/newsponsor', component: NewSponsorComponent },
  {path: 'usermanager/deletesponsor', component: DeleteSponsorComponent },
  {path: 'usermanager/editprofile', component: EditProfileComponent },
  {path: 'registeruser', component: RegisterUserManagerComponent },
  {path: 'usermanager/newgame', component: NewGameComponent },
  {path: 'usermanager/deletegame', component: DeleteGameComponent },

  {path: 'gamemanager', component: GameManagerComponent },
  {path: 'tournamentmanager', component: TournamentManagerComponent },
  {path: 'tournamentmanager/newtournament', component: NewTournamentComponent },
  {path: 'matchmanager', component: MatchManagerComponent},
  {path: 'viewranking', component: ViewRankingComponent }


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRouting {}