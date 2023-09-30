import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { Game } from '../models';
import { FirebaseServiceService } from '../firebase-service.service';

import {MatSelectionList} from '@angular/material/list';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.sass']
})
export class LobbyComponent {
  games: MatSelectionList;

  id;

  gamesList: Game[] = []
  typesOfGames: string[] = [];

  constructor(private gameComp: GameComponent, private gameService: FirebaseServiceService ,private router: Router){
  }

  setGameID(id){
    this.id = id
    this.gameService.joinGame(id)
  }

  newGame(){
    this.gameComp.newGame('newGame')
  }

  joinGame(){
    if(this.id){
      this.router.navigateByUrl('/game');
    }else{
      alert('Choose a Game or smash New Game')
    }
  }

  getGamesList(){
    return this.gameService.games
  }

  backToStart(){
    this.router.navigateByUrl('/');
  }
}
