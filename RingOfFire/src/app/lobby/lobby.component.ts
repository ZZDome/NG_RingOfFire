import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.sass']
})
export class LobbyComponent {

  typesOfGames: string[] = ['Game 1', 'Game 2', 'Game 3', 'New Game'];

  constructor(private router: Router){
    
  }



  backToStart(){
    this.router.navigateByUrl('/');
  }
}
