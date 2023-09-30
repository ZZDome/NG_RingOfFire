import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, deleteDoc, where, limit, orderBy } from '@angular/fire/firestore';
import { Game } from './models';


@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  games: Game[] = [];
  myGameId: string;
  myGameName: string;
  currentGame;

  firestore: Firestore = inject(Firestore);

  unsubGames;
  unsubGame;

  constructor() { 

    this.unsubGames = this.subGamesList();
  }

  ngonDestroy(){
    this.unsubGames();
    this.unsubGame();
  }

  joinGame(id){
    if(id){
      this.myGameId = id
      this.games.forEach(element => {
        if(element.id == this.myGameId){
          this.currentGame = element
        }
      });
    }else{

    }

  }

  async updateGame(game: Game){
    if(game.id){
      let docRef = this.getSingleDocRef('games', game.id);
      await updateDoc(docRef, this.getCleanGame(game)).catch(
        (err) => {console.error(err)}
      ).then();
    }
  }

  getCleanGame(game: Game):{} {
    return {
      name: game.name,
      players: game.players,
      stack: game.stack,
      playedCards: game.playedCards,
      currentPlayer: game.currentPlayer
    }
  }

  async addGame(item: Game, colId: 'games'){
    if(colId == 'games'){
      const newGame = await addDoc(this.getGamesRef(), item).catch(
        (err) => {console.error(err)}
      ).then()
      console.log('add a new game with id:' + this.games)
    }
  }

  subGame(docId){
    return onSnapshot(this.getSingleDocRef('games', docId), (element) => {
      this.games.push(this.setGameObject(element.data(), element.id));
      console.log(element.data())
    });
  }

  subGamesList(){
    return onSnapshot(this.getGamesRef(), (list) => {
      this.games= []
      list.forEach(element => {
        this.games.push(this.setGameObject(element.data(), element.id));
        console.log(element.data(), element.id)
      });
    })
  }

  setGameObject(obj, id): Game {
    return {
      id: id,
      name: obj.name || "Game",
      players: obj.players || [""],
      stack: obj.stack || [""],
      playedCards: obj.playedCards || [""],
      currentPlayer: obj.currentPlayer || 0,
    }
  }

  getGamesRef(){
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId, docId){
    return doc(collection(this.firestore, colId), docId);
  }
}
