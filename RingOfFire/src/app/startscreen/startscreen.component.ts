import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.sass']
})
export class StartscreenComponent {

  constructor(private router: Router){

  }

  openLobby(){
    //join Lobby
    this.router.navigateByUrl('/lobby');
  }
}
