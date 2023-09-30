import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { Game } from '../models';
import { FirebaseServiceService } from '../firebase-service.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.sass']
})
export class LobbyComponent {

  gamesList: Game[] = []

  typesOfGames: string[] = ['Game 1', 'Game 2', 'Game 3', 'New Game'];

  constructor(private gameService: FirebaseServiceService ,private router: Router){
    /* this.getGamesList() */
  }

  getGamesList(){
    console.log(this.gameService.games)
    return this.gameService.games
  }

  backToStart(){
    this.router.navigateByUrl('/');
  }
}
