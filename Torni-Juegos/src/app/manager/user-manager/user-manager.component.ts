import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, Rol, Genre } from '../../shared/user/user';
import { SystemManager } from '../../systemManager';
import { BDService } from '../bd.service';
import { UserLoggedService } from '../userLogged.service';


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
  providers: [BDService, UserLoggedService]
})
export class UserManagerComponent extends SystemManager implements OnInit {


  private userLogged: any;

  constructor(dataBaseService: BDService, userLog: UserLoggedService) {
  	super();

    SystemManager.dataBase = dataBaseService.connect;
    this.userLogged = userLog.getUserLogged().getUser();
    console.log(this.userLogged);
  }

  ngOnInit() {

  }
}
