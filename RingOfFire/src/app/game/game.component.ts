import { Component, OnInit } from '@angular/core';
import { Game } from '../models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent {

  pickCardAnimation = false
  currentCard = '';
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
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()
      this.pickCardAnimation = true
    
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard)
        this.pickCardAnimation = false
      }, 1250);
    }
  }
}
