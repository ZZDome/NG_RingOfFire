export class Game {
    public id?: string;
    public name: string = 'Game';
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation: boolean = false
    public currentCard: string = '';

}