import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.sass']
})
export class GameInfoComponent implements OnChanges {
  cardAction = [
    { title: '.title2', description: '.description2' },
    { title: '.title3', description: '.description3' },
    { title: '.title4', description: '.description4' },
    { title: '.title5', description: '.description5' },
    { title: '.title6', description: '.description6' },
    { title: '.title7', description: '.description7' },
    { title: '.title8', description: '.description8' },
    { title: '.title9', description: '.description9' },
    { title: '.title10', description: '.description10' },
    { title: '.title11', description: '.description11' },
    { title: '.title12', description: '.description12' },
    { title: '.title13', description: '.description13' },
    { title: '.title14', description: '.description14' },
  ];

  title = '';
  description = '';
  @Input() card: string;

  ngOnChanges(): void {
    if(this.card){
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
      
    }
  }
}