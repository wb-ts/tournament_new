import { Component, OnInit } from '@angular/core';
import { User, Rol, Genre } from '../../../shared/user/user';
import { BDService } from '../../bd.service';
import { UserLoggedService } from '../../userLogged.service';
import { MongoAPIService } from '../../../bd/mongoapi.service';


@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [UserLoggedService, BDService]
})
export class EditProfileComponent implements OnInit 
{

  private userLogged: User;
  private bd: any;

  constructor(private bdService: BDService, private userLog: UserLoggedService, private service: MongoAPIService) {
      this.bd = bdService.connect;

      let user = this.userLog.getUserLogged().getUser();
      this.userLogged = this.userLog.getUserLogged().getUser();

      console.log(this.userLogged.getNick);

  }

  ngOnInit()
  {}

  onSubmit() 
  {
    /*this.service.mongoSelect("User", "{nick:'" + this.userLogged.getNick + "'}").subscribe(
      data => {

        console.log(data[0]);

        let u: User = new User();
        u.setId = data[0].id_;
        u.setName = this.userLogged.getName;
        u.setNick = data[0].nick;
        u.setPassword = this.userLogged.getPassword;
        u.setRol = data[0].rol;
        u.setGenre = data[0].genre;
        u.setBirthDate = data[0].birthdate;
        u.setDni = this.userLogged.getDni;

        this.userLogged = u;

        this.userLog.getUserLogged().sUser = this.userLogged;
        let i: number = this.service.users.indexOf(data[0]);
        this.service.users.splice(i);

        this.service.mongoDelete("User", data[0]._id.$oid).subscribe();
        this.service.mongoInsert("User", u).subscribe();
        this.service.users.push(u);

        console.log("Datos Actualizados en la BD");
      }
    );
    */
    this.bdService.updateUser(this.userLogged).subscribe(()=>{
        console.log("Usuario actualizado");
    });
  }
}