import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, Rol, Genre } from '../../shared/user/user';
import { SystemManager } from '../../systemManager';
import { MongoAPIService } from '../../bd/mongoapi.service';
import { BDService } from '../bd.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register-user-manager',
  templateUrl: './register-user-manager.component.html',
  styleUrls: ['./register-user-manager.component.css'],
  providers: [MongoAPIService, BDService]
})


export class RegisterUserManagerComponent extends SystemManager implements OnInit {

	private newUser: User;

  private db;
  constructor(dataBaseService: BDService, private router: Router, private service: MongoAPIService) 
  {
  	super();
    
  	SystemManager.dataBase = dataBaseService.connect;
    this.db=dataBaseService;
    this.newUser = new User();
  }


	ngOnInit() { }


	onSubmit() 
	{
    /*this.service.mongoSelect("User", "{nick:'" + this.newUser.getNick + "'}").subscribe(
      data => {

        if (data[0] === undefined || data[0] === null) {
            this.newUser.setRol = Rol.PLAYER;
            console.log("Creado el nuevo Jugador en la BD");
            this.service.users.push(this.newUser);
            this.service.mongoInsert("User", this.newUser).subscribe();
        }
        else {
          console.log("Ese nick ya existe en la BD");
        }
        
      }
    );*/
    this.db.addUser(this.newUser)
    .subscribe(()=>{
      console.log("Añadido con exito");
    });
  }
}
