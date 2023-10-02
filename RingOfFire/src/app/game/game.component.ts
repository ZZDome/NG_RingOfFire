import { Component, OnInit, Injectable, HostListener } from '@angular/core';
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


export class GameComponent implements OnInit {
  myGameId;
  myName;
  currentPlayerName;
  
  game;
  gameJson;

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    this.quitGame();
      return false;
  }

  constructor(private gameService: FirebaseServiceService ,public dialog: MatDialog ,private router: Router) {
  
  }

  ngOnInit(): void {
    if(this.gameService.myGameId){
      this.myGameId = this.gameService.myGameId
      this.game = this.gameService.getMyGame(this.myGameId)
      this.openDialogPlayer()
    }
  }

  syncGame(){
    setInterval(() => {
      this.game = this.gameService.getMyGame(this.myGameId)
    }, 200);
  }

  async newGame(name) {
    this.gameJson = {
      name: name,
      players: [],
      stack: [],
      playedCards: [],
      currentPlayer: 0,
      pickCardAnimation: false,
      currentCard: ''
    };
    for (let i = 1; i < 14; i++) {
      this.gameJson.stack.push('ace_' + i );
      this.gameJson.stack.push('clubs_' + i);
      this.gameJson.stack.push('hearts_' + i);
      this.gameJson.stack.push('diamonds_' + i);
    }
    this.shuffle(this.gameJson.stack)
    await this.gameService.addGame(this.gameJson, 'games')
    this.router.navigateByUrl('/game');
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
    let game = this.game
    this.checkCurrentPlayer(game)
    if(this.currentPlayerName == this.myName && game.stack.length > 0){
      if (!game.pickCardAnimation) {
        game.currentCard = game.stack.pop()
        game.pickCardAnimation = true
        this.gameService.updateGame(game)
        setTimeout(() => {
          game.currentPlayer++;
          game.currentPlayer = game.currentPlayer % game.players.length;
          game.playedCards.push(game.currentCard);
          game.pickCardAnimation = false;
          this.gameService.updateGame(game)
        }, 1250);
      }
    }
  }

  openDialogPlayer(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0 && name.length < 16) {
        this.game = this.gameService.getMyGame(this.myGameId)
        this.game.players.push(name);
        this.gameService.myGameName = name;
        this.myName = name;
        this.gameService.updateGame(this.game);
        this.syncGame()
      }
    });
  }

  openDialogGame(): void {
    const dialogRef = this.dialog.open(DialogAddGameComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0 && name.length < 16) {
        this.newGame(name);
      }
    });
  }

  quitGame(){
    let game = this.game
    for (let index = 0; index < game.players.length; index++) {
      let element = game.players[index];
      if (element == this.myName){
        console.log(element)
        game.players.splice(index, 1)
      }
    }
    this.checkEmptyGame(game)
  }

  checkEmptyGame(game){
    console.log('my id'+this.myGameId)
    if(game.players.length == 0){
      this.gameService.deleteGame(this.myGameId);
      this.gameService.ngonDestroy();
      this.router.navigateByUrl('/');
    }else{
      game.currentPlayer = game.currentPlayer % game.players.length;
      this.gameService.updateGame(game);
      this.gameService.ngonDestroy();
      this.router.navigateByUrl('/');
    }
  }

  checkCurrentPlayer(g){
    for (let i = 0; i < g.players.length; i++) {
      let element = g.players[i];
      if(i == g.currentPlayer){
        this.currentPlayerName = element;
      }
    }
  }
}
