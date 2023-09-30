import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, deleteDoc, where, limit, orderBy } from '@angular/fire/firestore';
import { Game } from './models';


@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  games: Game[] = [];

  firestore: Firestore = inject(Firestore);

  unsubGames;

  constructor() { 

    this.unsubGames = this.subGamesList();
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
