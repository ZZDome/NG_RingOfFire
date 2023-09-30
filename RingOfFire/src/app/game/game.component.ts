import { Component, OnInit } from '@angular/core';
import { Game } from '../models';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
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

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    for (let i = 1; i < 14; i++) {
      this.game.stack.push('ace_' + i );
      this.game.stack.push('clubs_' + i);
      this.game.stack.push('hearts_' + i);
      this.game.stack.push('diamonds_' + i);
  }

  this.shuffle(this.game.stack)
  
  }

  shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  takeCard() {
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
      if (name && name.length > 0 && name.length < 16) {
        this.game.players.push(name);
      }
    });
  }
}
