import { Component, OnInit } from '@angular/core';
import { BDService } from '../../bd.service';
import { Game, Category } from '../../../shared/game/game';
import { MongoAPIService } from '../../../bd/mongoapi.service';


@Component({
  selector: 'delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.css']
})
export class DeleteGameComponent implements OnInit {

  private name: string;
  private deleteGame: Game;
  private db: any;

  constructor(private dataBase: BDService, private service: MongoAPIService) {
    this.db = dataBase.connect;
  }

  ngOnInit() {

  }

  onSubmit() {

    this.service.mongoSelect("Game", "{name:'" + this.deleteGame.getName + "'}").subscribe(
      data => {

        console.log(data[0]);

        if (data[0] === undefined || data[0] === null) {
          console.log("Juego no existe en la BD");
        }
        else {

          console.log("Juego borrado de la BD");
          this.service.mongoDelete("Game", data[0]._id.$oid);
        }
      });

  }
}
