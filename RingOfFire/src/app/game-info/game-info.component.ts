import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.sass']
})
export class GameInfoComponent implements OnChanges {
  cardAction = [
    { title: "Waterfall", description: 'card.action.description2' },
    { title: "You", description: 'card.action.description3' },
    { title: "Me", description: 'card.action.description4' },
    { title: "Category", description: 'card.action.description5' },
    { title: "Bust a jive", description: 'card.action.description6' },
    { title: "Chicks", description: 'card.action.description7' },
    { title: "Heaven", description: 'card.action.description8' },
    { title: "Mate", description: 'card.action.description9' },
    { title: "Thumbmaster", description: 'card.action.description10' },
    { title: "Men", description: 'card.action.description11' },
    { title: "Questionmaster", description: 'card.action.description12' },
    { title: "Never have i ever...", description: 'card.action.description13' },
    { title: "Rule", description: 'card.action.description14' },
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

/* cardAction = [
  { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
  { title: 'You', description: 'You decide who drinks' },
  { title: 'Me', description: 'Congrats! Drink a shot!' },
  { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
  { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
  { title: 'Chicks', description: 'All girls drink.' },
  { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
  { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
  { title: 'Thumbmaster', description: 'You are the thumb master until the next 4 is picked. Put your thumb on a surface. Everyone must copy you. The last person to do so drinks.' },
  { title: 'Men', description: 'All men drink.' },
  { title: 'Questionmaster', description: 'You are now the question master until the next Queen is picked. If you ask someone a question and they answer, they have to drink.' },
  { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
  { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
]; */
