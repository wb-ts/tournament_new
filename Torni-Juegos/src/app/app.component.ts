import { Component } from '@angular/core';
import { User, Rol, Genre } from './shared/user/user';
import { Router } from '@angular/router';
import { UserLoggedService } from './manager/userLogged.service';
import { MongoAPIService } from './bd/mongoapi.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserLoggedService, MongoAPIService]
})
export class AppComponent
{
  title = 'Torni-Juegos';
  private userLogged: User = new User();
  private loginTerminated: boolean;
  name: string;


  constructor(private router: Router, private userLog: UserLoggedService, private service: MongoAPIService) {
    this.loginTerminated = false;
  }

  onUserLogged(user) {
    this.loginTerminated = true;
    this.userLogged = user;
    this.userLog.getUserLogged().setUser = user;
    this.name = this.userLog.getUserLogged().getUser().getNick;
    this.router.navigate(['/usermanager']);
  }

  onLogout() {
    this.loginTerminated = false;
  }

  botonMongo() {

      this.service.mongoSelect("User", "{nick:'" + "rootDB" + "'}").subscribe(
      data => {
        let u: User = new User();

        u.setName = data[0].name;
        u.setNick = data[0].nick;
        u.setPassword = data[0].password;
        u.setRol = data[0].rol;
        u.setGenre = data[0].genre;
        u.setBirthDate = data[0].birthdate;
        u.setDni = data[0].dni;

         this.userLogged = u;
         this.loginTerminated = true;
         this.userLog.getUserLogged().setUser(u);
         this.name = this.userLog.getUserLogged().getUser().getNick;

         setTimeout(() => {
            this.router.navigate(['/gamemanager']);
          }, 1000);
      });

/*
      let u: User = new User("MazingerZeta5");
      this.service.users.push(u)
      this.service.mongoInsert("User", u).subscribe();
      */
  }
}
