import { Component, OnInit } from '@angular/core';
import { Game } from '../models';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent {

  pickCardAnimation = false
  currentCard = '';
  game: Game;

  constructor(public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.game = new Game;
    console.log(this.game)
  }

  openLobby(){

  }

  takeCard(){
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()
      this.pickCardAnimation = true
    
      setTimeout(() => {
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1250);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0 && name.length < 16){
        this.game.players.push(name);
      }
    });
  }
}
