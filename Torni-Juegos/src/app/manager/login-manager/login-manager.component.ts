import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, Rol, Genre } from '../../shared/user/user';
import { SystemManager } from '../../systemManager';
import { BDService } from '../bd.service';
import { MongoAPIService } from '../../bd/mongoapi.service';
import { UserLoggedService } from '../userLogged.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrls: ['./login-manager.component.css'],
  providers: [BDService, UserLoggedService]
})
export class LoginManagerComponent extends SystemManager implements OnInit {

  private loginUser: User;
  private userBD: User;
  private isUserLogged: boolean;
  @Output() userLogged = new EventEmitter();

  constructor(private dataBaseService: BDService, private userLog: UserLoggedService, private router: Router,
    private service: MongoAPIService) 
  {
  	super();
  	SystemManager.dataBase = dataBaseService.connect;
    this.isUserLogged = false;
    this.loginUser = new User();
  }

  ngOnInit() { }

  //  Login con Mongo
  onSubmit() {
    
    this.service.mongoSelect("User", "{nick:'" + this.loginUser.getNick + "'}").subscribe(
      data => {
        let u: User = new User();

        if (data[0] === undefined || data[0] === null) {
          console.log("Usuario no existe en la BD");
        }
        else {

          //  data[0] devuelve un Object. lo convertimos a User
          u.setName = data[0].name;
          u.setNick = data[0].nick;
          u.setPassword = data[0].password;
          u.setRol = data[0].rol;
          u.setGenre = data[0].genre;
          u.setBirthDate = data[0].birthdate;
          u.setDni = data[0].dni;

          if (this.loginUser.getNick == u.getNick && this.loginUser.getPassword == u.getPassword) {
            console.log("Usuario Logeado");
            this.userLog.getUserLogged().setUser(u);
            this.isUserLogged = true;
            this.userLogged.emit( {user: u});
          }
        }
      });
  }

  //  Login con Memory
  onSubmit2() 
  {
    this.userBD = SystemManager.dataBase.getUser(this.loginUser);

    if (this.userBD === null || this.userBD === undefined) 
    {
      console.log("Usuario No existe en la BD");
    } 
    else if (this.loginUser.getNick == this.userBD.getNick && this.loginUser.getPassword == this.userBD.getPassword) 
    {
      console.log("Usuario Logeado");

      this.userLog.getUserLogged().setUser(this.userBD);

      this.isUserLogged = true;
      this.userLogged.emit( {user: this.userBD});
    }
  }
}
