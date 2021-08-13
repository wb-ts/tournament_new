import { Component, OnInit } from '@angular/core';
import { BDService } from '../../bd.service';
import { UserLoggedService } from '../../userLogged.service';
import { Game, Category } from '../../../shared/game/game';
import { MongoAPIService } from '../../../bd/mongoapi.service';


@Component({
  selector: 'new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  private name: string;
  private description: string;
  private category: Category;
  private newGame: Game;
  private db: any;

  constructor(private dataBase: BDService, private bdMongo: MongoAPIService) {
    this.db = dataBase.connect;
  }

  ngOnInit() {

  }

  onSubmit() {

    this.newGame = new Game(this.name, this.description, this.category);
    /*

    this.bdMongo.mongoSelect("Game", "{name:'" + this.newGame.getName + "'}").subscribe(
      data => {

        console.log(data[0]);

        if (data[0] === undefined || data[0] === null) {
            console.log("Creado el juego en la BD");
            this.bdMongo.games.push(this.newGame);
            this.bdMongo.mongoInsert("Game", this.newGame).subscribe();
        }
        else {
          console.log("Ese juego ya existe en la BD");
        }
        
      }
    );
    */

    let gameBD = this.db.getGame(this.newGame);

    if (gameBD === null || gameBD === undefined) 
    {
      this.db.add(this.newGame);
      console.log("Juego agregado a la BD");
    } 
    else 
    {
      console.log("Juego ya existe en la BD");
    }
   

  }
}
