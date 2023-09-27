import { Component, OnInit } from '@angular/core';
import { Game } from '../models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent {

  pickCardAnimation = false
  game: Game;

  constructor(){

  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.game = new Game;
    console.log(this.game)
  }

  takeCard(){
    this.pickCardAnimation = true
  }
}
