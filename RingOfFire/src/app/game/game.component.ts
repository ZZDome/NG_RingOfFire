import { Component, OnInit, Injectable } from '@angular/core';
import { Game } from '../models';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogAddGameComponent } from '../dialog-add-game/dialog-add-game.component';
import { FirebaseServiceService } from '../firebase-service.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent {
  myGameId;
  myName;
  pickCardAnimation = false
  currentCard = '';
  game;
  gameJson;

  constructor(private gameService: FirebaseServiceService ,public dialog: MatDialog ,private router: Router) {

  }

  ngOnInit(): void {
    this.game = this.gameService.currentGame
    if(this.gameService.myGameId){
      this.myGameId = this.gameService.myGameId
      this.openDialogPlayer()
    }
  }

  newGameDialog(){
    this.openDialogGame()
  }

  newGame(name) {
    this.gameJson = {
      name: name,
      players: [],
      stack: [],
      playedCards: [],
      currentPlayer: 0
    };
    for (let i = 1; i < 14; i++) {
      this.gameJson.stack.push('ace_' + i );
      this.gameJson.stack.push('clubs_' + i);
      this.gameJson.stack.push('hearts_' + i);
      this.gameJson.stack.push('diamonds_' + i);
    }
    this.shuffle(this.gameJson.stack)
    this.gameService.addGame(this.gameJson, 'games')
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
        console.log(this.game)
        this.gameService.updateGame(this.game)
      }, 1250);
    }
  }

  openDialogPlayer(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0 && name.length < 16) {
        this.game.players.push(name);
        this.gameService.myGameName = name;
        this.myName = name;
        this.gameService.updateGame(this.game);
      }
    });
  }

  openDialogGame(): void {
    const dialogRef = this.dialog.open(DialogAddGameComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0 && name.length < 16) {
        this.newGame(name);
        this.router.navigateByUrl('/lobby');
      }
    });
  }

  quitGame(){
    for (let index = 0; index < this.game.players.length; index++) {
      let element = this.game.players[index];
      if (element == this.myName){
        console.log(element)
        this.game.players.splice(index, 1)
      }
    }
    this.checkEmptyGame()
  }

  checkEmptyGame(){
    if(this.game.players.length == 0){
      this.gameService.deleteGame(this.myGameId);
      this.router.navigateByUrl('/');
    }else{
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.gameService.updateGame(this.game);
      this.router.navigateByUrl('/');
    }
  }
}
