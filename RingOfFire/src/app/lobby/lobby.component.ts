import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { Game } from '../models';
import { FirebaseServiceService } from '../firebase-service.service';

import {MatSelectionList} from '@angular/material/list';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.sass']
})
export class LobbyComponent {
  games: MatSelectionList;

  gamesList: Game[] = []
  typesOfGames: string[] = [];

  constructor(private gameService: FirebaseServiceService ,private router: Router){
  }

  setGameID(id){
    console.log(id)
    console.log(this.gameService.myGameId)
    this.gameService.joinGame(id)
  }

  joinGame(){
    this.router.navigateByUrl('/game');
  }

  getGamesList(){
    return this.gameService.games
  }

  backToStart(){
    this.router.navigateByUrl('/');
  }
}
