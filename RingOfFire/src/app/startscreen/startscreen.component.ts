import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.sass']
})
export class StartscreenComponent {
  selected: number

  constructor(private translate: TranslateService, private router: Router){
    translate.setDefaultLang('de');
    this.selected = 1
  }

  openLobby(){
    //join Lobby
    this.router.navigateByUrl('/lobby');
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
